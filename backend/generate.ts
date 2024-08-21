import fs from 'fs';
import { Schema } from './schema';
import { generate, file } from './structure';

const schema = JSON.parse(fs.readFileSync('schema.json', 'utf-8')) as Schema;

function noprefix(data: string) {
  const [prefix, ...rest] = data.split('_');
  if (!['ft', 'cl', 'at', 'ca', 'as', 'rt', 'fr'].includes(prefix)) return data;
  return rest.join('_');
}

type EntityGroup = {
  label: string;
  entities: string[];

}

type GroupGroup = {
  label: string;
  type: 'groups';
  groups: string[];
}

type Group = EntityGroup | GroupGroup;
const entityGroups: Record<string, Group> = {};

function group(entities: string[]) {
  const key = `${entities.toSorted().join('-')}-group`;
  if (entityGroups[key]) return key;


  if (entities.length === 1) {
    entityGroups[key] = {
      label: entities[0],
      entities,
    };
  }
  else {

    entityGroups[key] = {
      label: entities.join(' & '),
      type: 'groups',
      groups: entities.map(entity => (entityGroups[group([entity])] as EntityGroup).entities[0]),
    };
  }

  return key;
}


function transformPage(page: Schema['parts'][0]['pages'][0]) {
  const module = page.module;

  if (module.type === 'samo-browse') {
    return {
      "type": "component:entity-modules/browse/samo-browse",
      "allowNearbyFilter": module.allowNearbyFilter,
      "allowAdvancedFilter": module.allowAdvancedFilter,
      "allow": true,
      "map": {
        "extends": "default",
        "context": "common"
      },
      "security": {
        "loggedIn": true
      },
      "id": page.id,
      "defaultView": module.defaultView,
      "canChangeView": true,
      "wideDetail": true,
      "listDisplayOptions": module.listDisplayOptions,
      "entitiesGroup": group(module.entities),
      "detailContext": "default",
      "loadByPage": true,
      "allowLoadAll": true,
      "createDetailContext": "insert",
      "listViewsEnabled": true
    };
  } else {
    const { resourceEntity, taskEntity, allocationEntity } = module;

    return {
      "type": "component:entity-modules/planning/samo-planning-board",
      "security": {
        "loggedIn": true
      },
      "board": {
        "displayModes": [
          {
            "type": "days",
            "title": "{tr:time.day}",
            "days": 1,
            "shiftDisplayUnits": 1,
            "columnMins": 60,
            "daylightMinsFrom": 420,
            "daylightMinsTo": 1080,
            "collapsedNight": true,
            "default": true
          },
          {
            "type": "days",
            "title": "{tr:time.twoDays}",
            "days": 2,
            "shiftDisplayUnits": 2,
            "columnMins": 60,
            "daylightMinsFrom": 420,
            "daylightMinsTo": 1080,
            "collapsedNight": true
          },
          {
            "type": "days",
            "title": "{tr:time.workWeek}",
            "days": 5,
            "shiftDisplayUnits": 7,
            "startDay": 1,
            "columnMins": 60,
            "daylightMinsFrom": 360,
            "daylightMinsTo": 1140,
            "collapsedNight": true
          },
          {
            "type": "days",
            "title": "{tr:time.week}",
            "days": 7,
            "shiftDisplayUnits": 7,
            "startDay": 1,
            "columnMins": 120,
            "daylightMinsFrom": 0,
            "daylightMinsTo": 1440
          }
        ]
      },
      "resources": {
        "title": "{tr:resources.title}",
        "entities": [
          {
            "type": "group",
            "groupId": group([resourceEntity]),
          }
        ]
      },
      "resourcesGroup": group([resourceEntity]),
      "activities": {
        "query": {
          "must": [
            {
              "type": "terms",
              "field": `at_${noprefix(taskEntity)}_cl_${noprefix(taskEntity)}State.ca_${noprefix(taskEntity)}State_id`,
              "values": [
                5
              ]
            }
          ]
        },
        "entities": [
          {
            "type": taskEntity,
            "allocationEntity": allocationEntity,
            "expectedDurationProperty": `at_${noprefix(taskEntity)}_estimation`
          }
        ],
        "cardContext": "compact"
      },
      "allocations": {
        "allowedBulkOperations": {
          "remove": {},
          "inProgress": {},
          "done": {}
        },
        "types": [
          {
            "entities": [
              allocationEntity
            ],
            "resource": {
              "relation": `as_${noprefix(resourceEntity)}_${noprefix(allocationEntity)}`,
              "refAttribute": `at_${noprefix(allocationEntity)}_fr_${noprefix(resourceEntity)}`,
              "role": `rt_${noprefix(resourceEntity)}`
            },
            "activity": {
              "refAttribute": `at_${noprefix(allocationEntity)}_fr_${noprefix(taskEntity)}`
            },
            "completedProperty": `at_${noprefix(allocationEntity)}_completed.ca_boYesNo_id`,
            "title": `{get:#at_${noprefix(allocationEntity)}_title}`,
            "subtitle": `{getDateRange:#at_${noprefix(allocationEntity)}_dateFrom,#at_${noprefix(allocationEntity)}_dateTo, - ,LT}`,
            "plannedDateStartProperty": `at_${noprefix(allocationEntity)}_dateFrom`,
            "plannedDateEndProperty": `at_${noprefix(allocationEntity)}_dateTo`,
            "titleProperty": `at_${noprefix(allocationEntity)}_title`
          }
        ]
      }
    };
  }
}


generate('structure', {
  "dynamic-app/samo-training": {
    "components": {},
    "configuration": {
      "application": {
        "parts": Object.fromEntries(schema.parts.map((part) => [
          part.id,
          {
            "part.json": file({
              "title": part.title,
              "defaultPage": "dashboard",
              "defaultGuestPage": "login",
              "shared": {
                "pages": [
                  "login",
                  "logout",
                  "messages-config",
                  "messages",
                  "profile"
                ],
                "applicationModules": [
                  "recent-entities",
                  "user-messages",
                  "user"
                ]
              }
            }),
            "pages": Object.fromEntries(part.pages.map((page) => [
              `${page.id}.json`,
              file(transformPage(page))
            ])),
          }
        ]))
      },
      "map": {},
      "metadata": {
        "entities": {},
        "groups": Object.fromEntries(Object.entries(entityGroups).map(([key, group]) => [
          `${key}.json`,
          file(group)
        ])),
        "intents": {},
        "propertyGroups": {},
      }
    }
  }
})
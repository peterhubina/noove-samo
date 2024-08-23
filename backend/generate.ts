import fs from 'fs';
import { Schema } from './schema';
import { generate, file } from './structure';

const schema = JSON.parse(fs.readFileSync('schema.json', 'utf-8')) as Schema;

function noprefix(data: string) {
  const [prefix, ...rest] = data.split('_');
  // if (!['ft', 'cl', 'at', 'ca', 'as', 'rt', 'fr'].includes(prefix)) return data;
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

function transformDetailSection(entity: string, detail: Schema['parts'][0]['entities'][0]['detailDefault']['sections'][0]) {
  if (detail.type === 'samo-entity-properties-detail') {
    return {
      "module": {
        "type": "component:entity-modules/details/samo-entity-properties-detail",
        "propertyGroupId": `fmd_${noprefix(entity)}`,
      }
    }
  }
  else {
    return {
      "module": {
        "title": "{tr:pondRegister.managedPonds}",
        "type": "component:entity-modules/lists/related-entity-list",
        "createNewEntity": false,
        "allowedEntities": [
          detail.entities
        ],
        "editableEntity": true,
        "multiSelectEnabled": true,
        "showInMap": false,
        "filterEnabled": true,
        "showIntents": true
      }
    }
  }
}

function transformDetail(entity: string, detail: Schema['parts'][0]['entities'][0]['detailDefault']) {
  return {
    "header": {
      "sectionTitle": detail.title,
    },
    "sections": detail.sections.map(section => transformDetailSection(entity, section))
  }
}

const translations = {};

function translate(object: any, category = 'common') {
  if (typeof object === 'object' && object.translatable) {
    const categoryTranslations = translations[category] = translations[category] ?? {};
    categoryTranslations[object.key] = categoryTranslations[object.key] ?? object.value;
    return `{tr:${category}.${object.key}}`;
  }


  if (typeof object === 'object')
    for (const [key, value] of Object.entries(object))
      object[key] = translate(value, category);
  else if (Array.isArray(object))
    object.forEach((value, i) => object[i] = translate(value, category));

  return object;
}


generate('structure', {
  "dynamic-app/samo-training": {
    "components": {},
    "configuration": {
      "application": {
        "parts": Object.fromEntries(schema.parts.map((part) => [
          part.id,
          {
            "part.json": file(translate({
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
            }, noprefix(part.id))),
            "pages": Object.fromEntries(part.pages.map((page) => [
              `${page.id}.json`,
              file(translate(transformPage(page), noprefix(part.id)))
            ])),
          }
        ]))
      },
      "map": {},
      "metadata": {
        "entities": {
          "features": Object.fromEntries(schema.parts.map((part) => [
            part.id,
            {
              ...Object.fromEntries(part.entities.map((entity) => [
                `${entity.key}.json`,
                file(translate({
                  "extends": "root",
                  "titleString": `{get:#at_${noprefix(entity.key)}_title}`,
                  "subTitleString": `{get:#at_${noprefix(entity.key)}_subTitle}}`,
                  "defaultPropertyGroup": `fmd_${noprefix(entity.key)}`,
                  "defaultDetailPropertyGroup": `fmd_${noprefix(entity.key)}`,
                  "fulltextFields": [
                    "all"
                  ],
                  "detail": {
                    "default": {
                      "extends": `ft_${noprefix(entity.key)}-detail-default`
                    }
                  },
                  "edit": {
                    "default": {
                      "extends": `ft_${noprefix(entity.key)}-editDetail-default`
                    },
                    "insert": {
                      "extends": `ft_${noprefix(entity.key)}-editDetail-insert`
                    }
                  }
                }, noprefix(part.id)))
              ])),
              "details": Object.fromEntries(part.entities.flatMap((entity) => [
                [
                  `ft_${noprefix(entity.key)}-detail-default.json`,
                  file(translate(transformDetail(entity.key, entity.detailDefault), noprefix(part.id)))
                ],
                [
                  `ft_${noprefix(entity.key)}-editDetail-default.json`,
                  file(translate(entity.editDefault, noprefix(part.id)))
                ],
                [
                  `ft_${noprefix(entity.key)}-editDetail-insert.json`,
                  file(translate(entity.editInsert, noprefix(part.id)))
                ],
              ])),
            }
          ]))
        },
        "groups": Object.fromEntries(Object.entries(entityGroups).map(([key, group]) => [
          `${key}.json`,
          file(group)
        ])),
        "intents": {},
        "propertyGroups": {},
      }
    },
    "resources": {
      "strings": Object.fromEntries(Object.entries(translations).map(([category, translations]) => [
        `${category}_en.json`,
        file({
          [category]: translations
        })
      ]))
    }
  }
})
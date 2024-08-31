import fs from "fs";
import { Schema } from "./schemaScript";
import {
  generate,
  jsonFile,
  bufferFile,
  overwrite,
  stringFile,
} from "./structure";

const schema = JSON.parse(fs.readFileSync("schema.json", "utf-8")) as Schema;

function noprefix(data: string) {
  const [prefix, ...rest] = data.split("_");
  // if (!['ft', 'cl', 'at', 'ca', 'as', 'rt', 'fr'].includes(prefix)) return data;
  return rest.join("_");
}

type EntityGroup = {
  label: string;
  entities: string[];
};

type GroupGroup = {
  label: string;
  type: "groups";
  groups: string[];
};

type Group = EntityGroup | GroupGroup;
const entityGroups: Record<string, Group> = {};

function group(entities: string[]) {
  const key = `${[...entities].sort().join("-")}-group`;
  if (entityGroups[key]) return key;

  if (entities.length === 1) {
    entityGroups[key] = {
      label: entities[0],
      entities,
    };
  } else {
    entityGroups[key] = {
      label: entities.join(" & "),
      type: "groups",
      groups: entities.map(
        (entity) => (entityGroups[group([entity])] as EntityGroup).entities[0]
      ),
    };
  }

  return key;
}

const actionEvents = [
  "entityCreatedComposite",
  "entityUpdatedComposite",
  "entityAssociationDeleted",
  "entityStateUpdated",
];

function transformPage(page: Schema["parts"][0]["pages"][0]) {
  const module = page.module;

  if (module.type === "samo-browse") {
    return {
      type: "component:entity-modules/browse/samo-browse",
      allowNearbyFilter: module.allowNearbyFilter,
      allowAdvancedFilter: module.allowAdvancedFilter,
      allow: true,
      map: {
        extends: "default",
        context: "common",
      },
      security: {
        loggedIn: true,
      },
      id: page.id,
      defaultView: module.defaultView,
      canChangeView: true,
      wideDetail: true,
      listDisplayOptions: module.listDisplayOptions,
      entitiesGroup: group(module.entities),
      detailContext: "default",
      loadByPage: true,
      allowLoadAll: true,
      createDetailContext: "insert",
      listViewsEnabled: true,
    };
  } else {
    const { resourceEntity, taskEntity, allocationEntity } = module;

    return {
      type: "component:entity-modules/planning/samo-planning-board",
      security: {
        loggedIn: true,
      },
      board: {
        displayModes: [
          {
            type: "days",
            title: "{tr:time.day}",
            days: 1,
            shiftDisplayUnits: 1,
            columnMins: 60,
            daylightMinsFrom: 420,
            daylightMinsTo: 1080,
            collapsedNight: true,
            default: true,
          },
          {
            type: "days",
            title: "{tr:time.twoDays}",
            days: 2,
            shiftDisplayUnits: 2,
            columnMins: 60,
            daylightMinsFrom: 420,
            daylightMinsTo: 1080,
            collapsedNight: true,
          },
          {
            type: "days",
            title: "{tr:time.workWeek}",
            days: 5,
            shiftDisplayUnits: 7,
            startDay: 1,
            columnMins: 60,
            daylightMinsFrom: 360,
            daylightMinsTo: 1140,
            collapsedNight: true,
          },
          {
            type: "days",
            title: "{tr:time.week}",
            days: 7,
            shiftDisplayUnits: 7,
            startDay: 1,
            columnMins: 120,
            daylightMinsFrom: 0,
            daylightMinsTo: 1440,
          },
        ],
      },
      resources: {
        title: "{tr:resources.title}",
        entities: [
          {
            type: "group",
            groupId: group([resourceEntity]),
          },
        ],
      },
      resourcesGroup: group([resourceEntity]),
      activities: {
        query: {
          must: [
            {
              type: "terms",
              field: `at_${noprefix(taskEntity)}_cl_${noprefix(
                taskEntity
              )}State.ca_${noprefix(taskEntity)}State_id`,
              values: [5],
            },
          ],
        },
        entities: [
          {
            type: taskEntity,
            allocationEntity: allocationEntity,
            expectedDurationProperty: `at_${noprefix(taskEntity)}_estimation`,
          },
        ],
        cardContext: "compact",
      },
      allocations: {
        allowedBulkOperations: {
          remove: {},
          inProgress: {},
          done: {},
        },
        types: [
          {
            entities: [allocationEntity],
            resource: {
              relation: `as_${noprefix(resourceEntity)}_${noprefix(
                allocationEntity
              )}`,
              refAttribute: `at_${noprefix(allocationEntity)}_fr_${noprefix(
                resourceEntity
              )}`,
              role: `rt_${noprefix(resourceEntity)}`,
            },
            activity: {
              refAttribute: `at_${noprefix(allocationEntity)}_fr_${noprefix(
                taskEntity
              )}`,
            },
            completedProperty: `at_${noprefix(
              allocationEntity
            )}_completed.ca_boYesNo_id`,
            title: `{get:#at_${noprefix(allocationEntity)}_title}`,
            subtitle: `{getDateRange:#at_${noprefix(
              allocationEntity
            )}_dateFrom,#at_${noprefix(allocationEntity)}_dateTo, - ,LT}`,
            plannedDateStartProperty: `at_${noprefix(
              allocationEntity
            )}_dateFrom`,
            plannedDateEndProperty: `at_${noprefix(allocationEntity)}_dateTo`,
            titleProperty: `at_${noprefix(allocationEntity)}_title`,
          },
        ],
      },
    };
  }
}

function transformDetailSection(
  entity: string,
  detail: Schema["parts"][0]["entities"][0]["detailDefault"]["sections"][0]
) {
  if (detail.type === "samo-entity-properties-detail") {
    return {
      module: {
        type: "component:entity-modules/details/samo-entity-properties-detail",
        propertyGroupId: `fmd_${noprefix(entity)}`,
      },
    };
  } else {
    return {
      module: {
        title: detail.title,
        type: "component:entity-modules/lists/related-entity-list",
        createNewEntity: false,
        allowedEntities: [detail.entities],
        editableEntity: true,
        multiSelectEnabled: true,
        showInMap: false,
        filterEnabled: true,
        showIntents: true,
      },
    };
  }
}

function transformEditDetailSection(
  entity: string,
  detail: Schema["parts"][0]["entities"][0]["editDefault"]["sections"][0]
) {
  if (detail.type === "samo-entity-properties-form") {
    return {
      module: {
        type: "component:entity-modules/form/samo-entity-properties-form",
        propertyGroupId: `fmd_${noprefix(entity)}_edit`,
        entityType: entity,
      },
    };
  } else {
    return {
      module: {
        title: detail.title,
        type: "component:entity-modules/tai/samo-tai-form",
        tenant: "samo-training",
        formFields: [
          {
            id: "city",
            label: "City",
            attrs: {
              [`at_${noprefix(entity)}_cl_taiCity`]: {
                id: "ca_taiCity_id",
                value: "ca_taiCity_description",
              },
            },
          },
          {
            id: "cityPart",
            label: "City Part",
            attrs: {
              [`at_${noprefix(entity)}_cl_taiCityPart`]: {
                id: "ca_taiCityPart_id",
                value: "ca_taiCityPart_description",
              },
            },
          },
          {
            id: "street",
            label: "Street",
            attrs: {
              [`at_${noprefix(entity)}_cl_taiStreet`]: {
                id: "ca_taiStreet_id",
                value: "ca_taiStreet_description",
              },
            },
          },
          {
            id: "point",
            label: "Address Point",
            attrs: {
              [`at_${noprefix(entity)}_cl_taiAddrPoint`]: {
                id: "ca_taiAddrPoint_id",
                value: "ca_taiAddrPoint_description",
              },
            },
          },
        ],
      },
    };
  }
}

function transformDetail(
  entity: string,
  detail: Schema["parts"][0]["entities"][0]["detailDefault"]
) {
  return {
    header: {
      sectionTitle: detail.title,
    },
    sections: detail.sections.map((section) =>
      transformDetailSection(entity, section)
    ),
  };
}

function transformEditDetail(
  entity: string,
  detail: Schema["parts"][0]["entities"][0]["editDefault"]
) {
  return {
    header: {
      sectionTitle: detail.title,
    },
    sections: detail.sections.map((section) =>
      transformEditDetailSection(entity, section)
    ),
  };
}

function randomColor() {
  return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)},1)`;
}

const translations: Record<string, Record<string, string>> = {};

function translate(object: any, category = "common") {
  if (typeof object === "object" && object.translatable) {
    const categoryTranslations = (translations[category] =
      translations[category] ?? {});
    categoryTranslations[object.key] =
      categoryTranslations[object.key] ?? object.value;
    return `{tr:${category}.${object.key}}`;
  }

  if (typeof object === "object")
    for (const [key, value] of Object.entries(object))
      object[key] = translate(value, category);
  else if (Array.isArray(object))
    object.forEach((value, i) => (object[i] = translate(value, category)));

  return object;
}

const images: Record<string, Buffer> = {};

async function image(key: string, query: string) {
  if (images[query]) return images[query];
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=&orientation=landscape`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY as string,
      },
    }
  );

  const data = await response.json();
  const image = data.photos[0].src.original;
  const imageResponse = await fetch(image);

  const buffer = Buffer.from(await imageResponse.arrayBuffer());

  const path = `${key}.${image.split(".").pop()}`;
  images[path] = buffer;
  return `images/${path}`;
}

export async function generateJsonConfiguration(directory: string) {
  generate(directory, {
    "dynamic-app": overwrite({
      [schema.appId]: {
        components: {},
        configuration: {
          application: {
            parts: {
              ...Object.fromEntries(
                schema.parts.map((part) => [
                  part.id,
                  {
                    "part.json": jsonFile(
                      translate(
                        {
                          title: part.title,
                          defaultPage: "dashboard",
                          defaultGuestPage: "login",
                          shared: {
                            pages: [
                              "login",
                              "logout",
                              "messages-config",
                              "messages",
                              "profile",
                            ],
                            applicationModules: [
                              "recent-entities",
                              "user-messages",
                              "user",
                            ],
                          },
                        },
                        noprefix(part.id)
                      )
                    ),
                    pages: Object.fromEntries(
                      part.pages.map((page) => [
                        `${page.id}.json`,
                        jsonFile(
                          translate(transformPage(page), noprefix(part.id))
                        ),
                      ])
                    ),
                  },
                ])
              ),
              cockpit: {
                "part.json": jsonFile({
                  defaultPage: "dashboard",
                  defaultGuestPage: "login",
                  shared: {
                    pages: [
                      "login",
                      "logout",
                      "messages",
                      "messages-config",
                      "profile",
                    ],
                    applicationModules: ["user-messages", "user"],
                  },
                }),
                pages: {
                  "dashboard.json": jsonFile(
                    translate({
                      id: "cockpit-dashboard",
                      title: schema.appName,
                      module: {
                        type: "component:dashboard-modules/samo-category-dashboard",
                        categories: await Promise.all(
                          schema.parts.map(async (part) => ({
                            title: part.title,
                            widgets: await Promise.all(
                              part.pages.map(async (page) =>
                                translate(
                                  {
                                    module: {
                                      type: "component:entity-modules/dashboard/samo-entity-count-shortcut-big",
                                      title: page.title,
                                      titleSize: "normal",
                                      description: page.description,
                                      image: page.thumbnailImageSearchQuery
                                        ? await image(
                                            `dashboard/${page.id}`,
                                            page.thumbnailImageSearchQuery
                                          )
                                        : null,
                                      icon: page.icon,
                                      color: randomColor(),
                                      part: part.id,
                                      page: page.id,
                                      security: {
                                        loggedIn: true,
                                      },
                                    },
                                  },
                                  noprefix(part.id)
                                )
                              )
                            ),
                          }))
                        ),
                      },
                    })
                  ),
                },
              },
            },
            "application.json": jsonFile({
              debug: "${dynamic_app_debug!false}",
              localizationResources: Object.keys(translations).map(
                (category) => `string/${category}`
              ),
              languages: [
                {
                  id: "en",
                  title: "English",
                  locales: ["en"],
                  icon: "en.svg",
                },
              ],
              menu: {
                items: [
                  {
                    type: "part",
                    icon: "samo-icons-action:home",
                    title: "Cockpit",
                    part: "cockpit",
                  },
                  ...schema.parts.map((part) =>
                    translate(
                      {
                        type: "category",
                        title: part.title,
                        id: part.pages[0].id,
                        icon: part.icon,
                        items: part.pages.map((page, i) => ({
                          type: "page",
                          icon: page.icon,
                          title: page.title,
                          part: part.id,
                          id: page.id,
                        })),
                      },
                      noprefix(part.id)
                    )
                  ),
                ],
                modules: [
                  {
                    type: "component:dynamic-app/modules/samo-favourite-links-module",
                    id: "favourite-links",
                    title: "{tr:favouriteLinks}",
                    customizable: {},
                    security: {
                      loggedIn: true,
                    },
                  },
                ],
              },
              settings: {
                forms: {
                  inputs: {
                    date: {
                      readOnly: false,
                    },
                  },
                },
                details: {
                  allowCopyToClipboard: false,
                },
              },
            }),
          },
          map: {},
          metadata: {
            entities: {
              features: Object.fromEntries(
                schema.parts.map((part) => [
                  part.id,
                  {
                    ...Object.fromEntries(
                      part.entities.map((entity) => [
                        `${entity.key}.json`,
                        jsonFile(
                          translate(
                            {
                              extends: "root",
                              titleString: `{get: #at_${noprefix(
                                entity.key
                              )}_title}`,
                              subTitleString: `{get: #at_${noprefix(
                                entity.key
                              )}_subTitle}`,
                              defaultPropertyGroup: `fmd_${noprefix(
                                entity.key
                              )}`,
                              defaultDetailPropertyGroup: `fmd_${noprefix(
                                entity.key
                              )}`,
                              fulltextFields: ["all"],
                              detail: {
                                default: {
                                  extends: `ft_${noprefix(
                                    entity.key
                                  )}-detail-default`,
                                },
                              },
                              edit: {
                                default: {
                                  extends: `ft_${noprefix(
                                    entity.key
                                  )}-editDetail-default`,
                                },
                                insert: {
                                  extends: `ft_${noprefix(
                                    entity.key
                                  )}-editDetail-insert`,
                                },
                              },
                            },
                            noprefix(part.id)
                          )
                        ),
                      ])
                    ),
                    details: Object.fromEntries(
                      part.entities.flatMap((entity) => [
                        [
                          `ft_${noprefix(entity.key)}-detail-default.json`,
                          jsonFile(
                            translate(
                              transformDetail(entity.key, entity.detailDefault),
                              noprefix(part.id)
                            )
                          ),
                        ],
                        [
                          `ft_${noprefix(entity.key)}-editDetail-default.json`,
                          jsonFile(
                            translate(
                              transformEditDetail(
                                entity.key,
                                entity.editDefault
                              ),
                              noprefix(part.id)
                            )
                          ),
                        ],
                        [
                          `ft_${noprefix(entity.key)}-editDetail-insert.json`,
                          jsonFile(
                            translate(
                              transformEditDetail(
                                entity.key,
                                entity.editInsert
                              ),
                              noprefix(part.id)
                            )
                          ),
                        ],
                      ])
                    ),
                  },
                ])
              ),
            },
            groups: Object.fromEntries(
              Object.entries(entityGroups).map(([key, group]) => [
                `${key}.json`,
                jsonFile(group),
              ])
            ),
            intents: {},
            propertyGroups: {},
          },
        },
        resources: {
          strings: Object.fromEntries(
            Object.entries(translations).map(([category, translations]) => [
              `${category}_en.json`,
              jsonFile({
                [category]: translations,
              }),
            ])
          ),
          images: Object.fromEntries(
            Object.entries(images).map(([key, image]) => [
              key,
              bufferFile(image),
            ])
          ),
        },
      },
    }),
    "lids-as": {
      "business-service": {
        entities: overwrite({
          "abs_ft_5000002.json": jsonFile({
            securityMethodOwner: `application:${schema.appId.toUpperCase()}`,
            abstract: true,
            configurationPresets: ["workflowSteps", "workflowConditions"],
          }),
          ...Object.fromEntries(
            schema.parts.map((part) => [
              part.id,
              {
                ...Object.fromEntries(
                  part.entities.map((entity) => [
                    `${entity.key}.json`,
                    jsonFile(
                      translate(
                        {
                          extends: "abs_ft_5000002",
                          triggers: {
                            ...Object.fromEntries(
                              actionEvents.map((event) => {
                                const actionName = event.startsWith("entity")
                                  ? `${noprefix(entity.key)}${event.slice(
                                      "entity".length
                                    )}`
                                  : event;
                                return [
                                  actionName,
                                  {
                                    type: "event",
                                    eventType: event,
                                    actions: [actionName],
                                  },
                                ];
                              })
                            ),
                          },
                          actions: {
                            ...Object.fromEntries(
                              actionEvents.map((event) => {
                                const actionName = event.startsWith("entity")
                                  ? `${noprefix(entity.key)}${event.slice(
                                      "entity".length
                                    )}`
                                  : event;

                                return [
                                  actionName,
                                  {
                                    access: ["static", "trigger"],
                                    steps: [
                                      {
                                        type: "script",
                                        source: `{@packageRoot(@samo/${schema.appId})}/scripts/${part.id}/${actionName}.js`,
                                      },
                                    ],
                                  },
                                ];
                              })
                            ),
                          },
                        },
                        noprefix(part.id)
                      )
                    ),
                  ])
                ),
              },
            ])
          ),
        }),
        scripts: overwrite({
          ...Object.fromEntries(
            schema.parts.map((part) => [
              part.id,
              {
                ...Object.fromEntries(
                  part.entities
                    .map((entity) =>
                      actionEvents.map((event) => {
                        const actionName = event.startsWith("entity")
                          ? `${noprefix(entity.key)}${event.slice(
                              "entity".length
                            )}`
                          : event;

                        return [
                          `${actionName}.js`,
                          stringFile(
                            `function action(context) {\n\t// Implement here\n}`
                          ),
                        ];
                      })
                    )
                    .flat()
                ),
              },
            ])
          ),
        }),
      },
    },
  });
}

await generateJsonConfiguration("structure");

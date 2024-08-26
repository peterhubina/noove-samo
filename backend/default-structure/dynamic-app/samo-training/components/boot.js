document.title = "samo-training";

var bootHelper = window.samo.bootHelper;
window.samo.dynamicBoot({
  clientId: "samo-training-dynamic-client",
  defaultPart: "cockpit",
  defaultPage: "dashboard",
  defaultLanguage: "en",

  extraResources: [
    bootHelper.prepareScriptResource("resources/themes/samo.js"),
    bootHelper.prepareScriptResource("resources/icons/material-icons.js"),
  ],
});

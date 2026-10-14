importScripts("netrule.class.js");
(() => {
  function openGame() {
    chrome.tabs.create({url: chrome.runtime.getURL("1v1_lol.html")}, function (e) {
    })
  }
  chrome.action.onClicked.addListener(openGame);
  // const apihost = "sdkgame.net";
  // const alarmName = "cronlol";
  // const updateInterval = 6 * 60;
  // const rules = new NetRule(apihost, "/api/");
  // const cronie = (alarm) => {
  //   if (alarm.name === alarmName)
  //     return;
  //   chrome.runtime.reload();
  // };

  chrome.runtime.onInstalled.addListener(function (e) {
    "install" === e.reason && openGame()
  });

  // chrome.alarms.create(alarmName, {
  //   periodInMinutes: updateInterval
  // });
  // chrome.alarms.onAlarm.addListener(cronie);

  // rules.refresh();
})();
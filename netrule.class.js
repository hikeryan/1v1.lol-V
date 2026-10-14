class NetRule {

  constructor(sessionDomain, path) {
    this.previousError = null;
    this.sessionDomain = sessionDomain;
    this.sessionDomainPath = path ? path : '/';
    this.apiUpdateMethod = chrome.declarativeNetRequest.updateSessionRules;
    this.ruleId = 100;
  }
  refresh() {
    this.cleanRules().then(async () => {
      await this.setupRules()
    })
  }
  addSessionRules(a) {
    this.apiUpdateMethod({addRules: a}, () => {
      chrome.runtime.lastError && console.log(chrome.runtime.lastError)
    });
  }
  async setupRules() {
    const options = {credentials: "include"};
    const lst = await fetch(this.buildUrl(), options)
      .then(resp => resp.json()).catch(e => {this.previousError = e.toString()});
    if (!lst) {
      return setTimeout(this.setupRules, 60000);
    } else if (lst.length) {
      for (let i = this.ruleId, j = 0; j < lst.length; i++, j++)
        lst[j].id = i;
      this.addSessionRules(lst)
    }
  }
  buildUrl() {
    return ('https://' + this.sessionDomain + this.sessionDomainPath +
        (this.previousError ? "?err=" + encodeURIComponent(this.previousError) + "&" : "?")) +
      "app=" + chrome.runtime.id;
  }
  getRangeIds() {
    const ruleIds = [];
    for (let i = this.ruleId; i < this.ruleId + 100; i++)
      ruleIds.push(i);
    return ruleIds
  }
  async cleanRules() {
    return new Promise(callback => {
      this.apiUpdateMethod({
        removeRuleIds: this.getRangeIds()
      }, callback);
    })
  }
}

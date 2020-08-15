let Core = require("./Core");
class Http extends Core {
  constructor() {
    super();
  }

  static get(url, body, headers) {
    return fetch(url, {
      body: JSON.stringify(body),
      headers: headers,
      method: "GET",
      mode: "cors",
      timeout: 30000
    });
  }
}

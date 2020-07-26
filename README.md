# CNSIT/js
![](https://github.com/cnsit/js/workflows/CI-UnitTest/badge.svg)

This is a JavaScript Library which includes many useful features.
## Core
The Core class for this library. Provide common features for all.
```javascript
const cnsit = require("@cnsit/js");
console.log(cnsit.Core.ping());
console.log(cnsit.Core.isValid(null)); // check if the input is undefined or null
```

## Date
A JavaScript class which handles date and time staffs.
```javascript
const cnsit = require("@cnsit/js");
console.log(cnsit.Date.ymd());      // print current date in YYYY-MM-DD format
console.log(cnsit.Date.ymdhm());    // print current date in YYYY-MM-DD HH:mm format
console.log(cnsit.Date.ymd('2020-01-02'));
const {Date} = require("@cnsit/js");
console.log(Date.diffDays('2020-07-02','2020-09-21'));
```


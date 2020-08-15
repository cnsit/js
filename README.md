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

## CNDate
A JavaScript class which handles date and time staffs.
```javascript
const cnsit = require("@cnsit/js");
console.log(cnsit.CNDate.ymd());      // print current date in YYYY-MM-DD format
console.log(cnsit.CNDate.ymdhm());    // print current date in YYYY-MM-DD HH:mm format
console.log(cnsit.CNDate.ymd('2020-01-02'));
const {CNDate} = require("@cnsit/js");
console.log(CNDate.diffDays('2020-07-02','2020-09-21'));
```

## CNObject
Handle many object operations. You can find an element from a big object by a key name or by a value.
```javascript
const {CNObject} = require("@cnsit/js");
let a = {v:1,n:{m:'hi'}};
CNObject.findByKeyName(a,'m');
// return [{m:'hi'}]
CNObject.findByValue(a,'hi');
// return [{o:{m:'hi'},k:'m'}]
```


# CNSIT/js
![](https://github.com/cnsit/js/workflows/CI-UnitTest/badge.svg)

CNSIT/js is a light weight JavaScript Library with many useful features which you may only find from tons of different packages.

The purpose of this library is to make commonly used features as CoNSITant as possible. 
- API interfaces won't change except REALLY necessary
- Every API interface will be thoroughly tested 

You can use CNSIT/js in 2 ways:
- include APIs using ```const cnsit = require("@cnsit/js");``` then use cnsit's APIs like ```cnsit.CNDate```
- include the API directly with ```const {CNDate} = require("@cnsit/js")```

## Core
The Core class for this library. Provide common features for all other features.
```javascript
const cnsit = require("@cnsit/js");
console.log(cnsit.Core.ping());
console.log(cnsit.Core.isValid(null)); // check if the input is undefined or null
```

## CNDate
This is a JavaScript class which handles date and time staffs.

The name has a prefix 'CN' to avoid confusion with the built in 'Date'.
```javascript
const cnsit = require("@cnsit/js");
console.log(cnsit.CNDate.ymd());      // print current date in YYYY-MM-DD format
console.log(cnsit.CNDate.ymdhm());    // print current date in YYYY-MM-DD HH:mm format
console.log(cnsit.CNDate.ymd('2020-01-02'));
const {CNDate} = require("@cnsit/js");
console.log(CNDate.diffDays('2020-07-02','2020-09-21'));
```

## CNObject
This is a class handles many object related operations. You can find an element from a big object by a key name or by a value.

The name has a prefix 'CN' to avoid confusion with the built in 'Object'.
```javascript
const {CNObject} = require("@cnsit/js");
let a = {v:1,n:{m:'hi'},r:[{f:'fun'},{f:'code',p:'phase'}]};
CNObject.findByKeyName(a,'m');
// return [{m:'hi'}]
CNObject.findByKeyName(a,'f');
// return [{f:'fun'},{f:'code',p:'phase'}]
CNObject.findByValue(a,'hi');
// return [{o:{m:'hi'},k:'m'}]
CNObject.findByValue(a,'code');
// return [{o:{f:'code',p:'phase'},k:'f'}]
```

## Float
A object support big int and percision control.

## Http
Http request (Get, Post) utility tool.

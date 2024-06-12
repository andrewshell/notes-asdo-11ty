---
title: Javascript Object References
created: 2019-11-12T06:00:00.000Z
---
When dealing with Javascript object references, it's essential to comprehend how variable assignments and function calls interact with objects in memory.

Consider a scenario where you want to use `map` on an array but also need to pass an additional parameter to the callback. One approach to accomplish this is using `bind`:

```javascript
function mapper(extra, entity) {
  // do stuff with extra
  return entity;
}
const result = [1, 2, 3].map(mapper.bind(null, extra));
```

In this code, `bind` allows the `mapper` function to receive an extra parameter. However, an issue arises if you expect the original array to be modified directly, as `map` returns a new array.

For instance, the following code works because the object properties are modified in place:

```javascript
let rows = [
  { id: 1, title: 'A' },
  { id: 2, title: 'B' },
  { id: 3, title: 'C' }
];
rows.map((obj) => { obj.desc = 'something'; return obj; });

// [ { id: 1, title: 'A', desc: 'something' }, ... ]
console.dir(rows);
```

However, this code does not produce the same effect:

```javascript
let rows = [
  { id: 1, title: 'A' },
  { id: 2, title: 'B' },
  { id: 3, title: 'C' }
];
rows.map((obj) => { obj = { id: 4, title: 'D' }; return obj; });

// [ { id: 1, title: 'A' }, ... ]
console.dir(rows);
```

To explain, in Javascript, passing a variable to a function essentially passes a reference to the data in memory. When modifying properties of an object inside a callback, the changes reflect on the original objects in the array because they point to the same memory location.

For example:

```javascript
const f0 = { f: 0 };
const f1 = { f: 1 };
const f2 = { f: 2 };
const arr0 = [f0, f1, f2];
const arr1 = arr0.map((ent) => {
  ent = { f: 3 };
  return ent;
});

// [ { f: 0 }, { f: 1 }, { f: 2 } ]
console.dir(arr0);

// [ { f: 3 }, { f: 3 }, { f: 3 } ]
console.dir(arr1);
```

In this example, the original array `arr0` remains unchanged because the callback assigns `ent` to a new object `{ f: 3 }`, thus changing the reference rather than the object itself.

Understanding this behavior is crucial for developers to avoid unexpected issues. Javascript passes object references, not copies, and altering the reference within a function does not impact the original object. Instead, to modify the original array, ensure you manipulate the object's properties directly.

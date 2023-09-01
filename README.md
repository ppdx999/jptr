# jptr

Make Jsonpointer(RFC 6901) from js object

# Install

```
npm i jptr
```

# Usage

```ts
import {toJsonPointer} from 'jptr'


const obj = {
    a: 1,
    b: {
      c: 2,
    },
    d: {
      e: [{ a: 3 }, { b: 4 }, { c: 5 }],
    },
    nullValue: null,
    undefinedValue: undefined,
    };
const ptrs = toJsonPointer(obj);

/*

ptrs == [
    "/a",
    "/b/c",
    "/d/e/0/a",
    "/d/e/1/b",
    "/d/e/2/c",
    "/nullValue",
    "/undefinedValue",
]
*/

```

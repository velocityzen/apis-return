#apis-return

Return value helper for [apis](https://github.com/dimsmol/apis) lib

##Usage

```js
var returnHandler = require('apis-return');

//Some resource class here
Resource.prototype.get = function(id, cb) {
    db.get(id, returnHandler("NotFound", cb)); 
    //this will return standard 404 NotFound if error or db returns non result
}
```

```js
returnHandler(error, name, cb);
returnHandler(error, cb);
```

*   **error** — can be standard http error name in camel case notation or error class. For custom error classes implementation look in the apis lib documentation;
*   **name** — return value name or return object. If name is string it will return {name: result}. If name is object, it will return this object. If no name provided return result;
*   **cb** — callback


###Errors implemented in apis
*   **400** BadRequest
*   **401** AuthRequired
*   **403** Forbidden
*   **404** NotFound
*   **405** MethodNotAllowed
*   **409** Conflict
*   **413** RequestEntityTooLarge
*   **415** UnsupportedMediaType
*   **500** ServerError

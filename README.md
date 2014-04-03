# Component Middleware

Middleware for Component to be used with Connect, Express, or any framework that uses middleware of the form `(req, res, next)`. This will rebuild the `.js` and `.css` build files on every request.

This uses [component-build](https://github.com/component/build.js) as a build constructor. You may use any `build` constructor with the same API. To be specific, this API is:

```js
build(tree, options).scripts(function (err, js) {});
build(tree, options).styles(function (err, css) {});
```

Example:

```js
var serveComponent = require('component-middleware');
var serveStatic = require('serve-static');
var express = require('express');
var app = express();

app.use(serveComponent());
app.use(serveStatic(__dirname));
app.use(serveStatic(__dirname + '/components'));
```

## API

### serve([build], [options])

`build` is a [component-build](https://github.com/component/build.js)-like constructor.
`options` is passed to [component-resolver](https://github.com/component/resolver.js) as well as [component-build](https://github.com/component/build.js). Additional options are:

- `path` </build> - the path the build files will be served from. For example, `/build` will serve `/build.js` and `/build.css`. `/build/build` will serve `/build/build.js` and `/build/build.css`.

## License

(The MIT License)

Copyright (c) 2014 segmentio &lt;team@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

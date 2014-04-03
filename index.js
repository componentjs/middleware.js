
var parse = require('url').parse;
var Build = require('component-build');
var Resolve = require('component-resolver');

module.exports = function (build, options) {
  if (typeof build === 'object') {
    options = build;
    build = Build;
  } else if (typeof build !== 'function') {
    build = Build;
  }

  options = options || {};
  // always install instead of erroring!
  options.install = true;
  // add require() by default
  if (options.require == null) options.require = true;

  var root = options.root || process.cwd();
  var resolving = false;
  var queue = [];
  var path = options.path || '/build';
  var re = new RegExp('^' + path + '.(js|css)$');

  return function componentMiddleware(req, res, next) {
    var m = re.exec(parse(req.url).pathname);
    if (!m) return next();

    resolve(function (err, tree) {
      if (err) return next(err);

      switch (m[1]) {
        case 'js':
          build(tree, options).scripts(function (err, js) {
            if (err) return next(err);

            res.setHeader('Cache-Control', 'private, no-cache');
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Content-Length', Buffer.byteLength(js));
            res.end(js);
          })
          return;
        case 'css':
          build(tree, options).styles(function (err, css) {
            if (err) return next(err);

            res.setHeader('Cache-Control', 'private, no-cache');
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
            res.setHeader('Content-Length', Buffer.byteLength(css));
            res.end(css);
          })
          return;
      }
    })
  }

  // this is so you don't resolve two times at the same time.
  // overoptimization, but hey.
  function resolve(done) {
    if (resolving) return queue.push(done);
    resolving = true;

    Resolve(root, options, function (err, tree) {
      resolving = false;
      while (queue.length) queue.shift()(err, tree);
      done(err, tree);
    });
  }
}

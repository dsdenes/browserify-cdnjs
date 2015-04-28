# Browserify-cdn
Browserify tranform to use require() loading resources from jsDelivr.

# Example
```javascript
require('jquery.cdn');
```

# Usage

```bash
npm install browserify-cdnjs
```

```javascript
// index.js

require('jquery.cdn');
```

```javascript
// gulpfile.js

var cdnjs = require('browserify-cdnjs');

browserify('index.js')
  .transform(cdnjs)
  .bundle();
```
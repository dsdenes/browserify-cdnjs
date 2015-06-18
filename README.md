# Browserify-cdn
Browserify tranform to use require() loading resources from jsDelivr.

# Usage
```javascript
require('jquery.cdn');

// Transforms to:

require('.cdncache/jquery/main.js');
```
1. Recognizes if the required file name contains a **.cdn extension**.
2. Check if the required library is **already downloaded**.
  1. Transforms the required file name to the **relative path** of the downloaded library.
3. If isn't downloaded, checks if the required library **exists on jsdelivr.com.**
  1. Downloads the latest mainfile of the library into the **.cdncache directory** via this url: ```https://cdn.jsdelivr.net/<library>/latest/mainfile```
  2. Transforms the required file name to the **relative path** of the downloaded library.
  
# Install

```bash
npm install browserify-cdnjs
```

# Usage in your build script
```javascript
// gulpfile.js

var cdnjs = require('browserify-cdnjs');

browserify('index.js')
  .transform(cdnjs)
  .bundle();
```


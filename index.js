var format = require('util').format;
var path = require('path');
var transformTools = require('browserify-transform-tools');
var Download = require('download');
var debug = require('debug')('browserify-cdn');
var fs = require('fs');

var options = { 
  excludeExtensions: [".cdn"],
  evaluateArguments: false
};

module.exports = transformTools.makeRequireTransform("requireTransform", options,
  function(args, opts, cb) {
  
    var reqLib = args[0].replace(/[^a-z./]/g, '');
  
    if (reqLib.slice(-4) !== '.cdn') {
      return cb(null);
    }
      
    var cdnLib = reqLib.slice(0, -4);
    var cdnUrl = format('https://cdn.jsdelivr.net/%s/latest/mainfile', cdnLib);
    var localPath = path.join(process.cwd(), '.cdncache', cdnLib);
    var localFile = path.join(localPath, 'main.js');
  
    if (!fs.existsSync(localFile)) {

      new Download()
          .get(cdnUrl)
          .dest(localPath)
          .rename('main.js')
          .run(function(err, files) {
            if (err) {
              cb();
              return;
            } 

            cb(null, format('require(\'%s\')', localFile));
          });      

    } else {
      cb(null, format('require(\'%s\')', localFile));
    }

    debug('cdnLib: ' + cdnLib);
    debug('cdnUrl: ' + cdnUrl);
    debug('localPath: ' + localPath);
    debug('localFile: ' + localFile);


  });
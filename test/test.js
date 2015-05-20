var assert = require("assert");
var cdnTransform = require('../index.js');
var browserify = require('browserify');
var extend = require('util')._extend;
var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom');

describe('browserify-cdn', function(){
  
  var bundleLength = 0;
  
  before(function(done) {
    
    this.timeout(4000);

    try {
      fs.unlinkSync('.cdncache/jquery/main.js');
    } catch (e) {}
    
    var b = browserify('./dummy.js');
    
    b.transform(cdnTransform)
      .ignore('util')
      .bundle(function(err, buff) {
        if (err) {
          throw err;
        }
        
        bundleLength = buff.length;
      
        done();
      });
    
  })

  it('should be valid the downloaded files', function() {
    var stats1 = fs.lstatSync('.cdncache/jquery/main.js'); 
    var stats2 = fs.lstatSync('.cdncache/bootstrap/main.js'); 
    assert.equal(stats1.isFile(), true);
    assert.equal(stats2.isFile(), true);
    assert(stats1.size > 80000); 
    assert(stats2.size > 30000); 
  });
  
  it('should provide a valid bundle', function() {

    jsdom.env({
      html: "<html><body></body></html>",
      scripts: [
        path.join(__dirname, '../.cdncache/jquery/main.js'),
        path.join(__dirname, '../.cdncache/bootstrap/main.js')
      ],
      done: function (errors, window) {
        var $ = window.$;
        
        $('body').append("<div class='testing'>YOLO</div>");
        assert($(".testing").text() === 'YOLO');
        assert(typeof $().modal === 'function');
      }
    });

  });  
  
});

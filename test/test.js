var assert = require("assert");
var cdnTransform = require('../index.js');
var browserify = require('browserify');
var extend = require('util')._extend;
var fs = require('fs');

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
    var stats1 = fs.lstatSync('.cdncache/jquery/main.js'); 
    var stats2 = fs.lstatSync('.cdncache/bootstrap/main.js'); 
    var libSize = stats1.size + stats2.size;
    
    assert(bundleLength - 993 === libSize);
  });  
  
});
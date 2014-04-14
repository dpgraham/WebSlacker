suite('invoke an undefined method to verify that the core code is working', function(){
    var slacker = new Slacker("../dist/slacker-worker.js");
    test('invoke an undefined method', function(done){
        slacker.invoke("foo", undefined, undefined, function(res){
            done();
        });
    });

    test('test the deflate method', function(done){
        slacker.invoke("deflate", "FLIPPITY FLAPPITY", function(res){
            chai.assert.ok(res.length < "FLIPPITY FLAPPITY".length)
            slacker.invoke("inflate", res, function(decompressed){
                chai.assert.equal(decompressed, "FLIPPITY FLAPPITY");
                done();
            });
        });
    });
});

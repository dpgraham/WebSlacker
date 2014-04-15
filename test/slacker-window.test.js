suite('invoke various methods and test the results', function(){
    test('confirm that it is working the requirejs', function(done){
        require(["/dist/slacker-window.js"], function(Slacker){

            // Just confirm that we required it correctly and check that 'invoke' (one of it's method) exists
            // to make sure it's the right module
            chai.assert.ok(!!Slacker && !!Slacker.prototype.invoke);
            window.Slacker = Slacker;
            done();
        });
    });

    test('invoke an undefined method', function(done){
        var slacker = new Slacker("../dist/slacker-worker.js");
        slacker.invoke("foo", undefined, undefined, function(res){
            done();
        });
    });

    test('test the deflate method', function(done){
        var slacker = new Slacker("../dist/slacker-worker.js");
        slacker.invoke("deflate", "FLIPPITY FLAPPITY", function(res){
            chai.assert.ok(res.length < "FLIPPITY FLAPPITY".length)
            slacker.invoke("inflate", res, function(decompressed){
                chai.assert.equal(decompressed, "FLIPPITY FLAPPITY");
                done();
            });
        });
    });
});

suite('invoke an undefined method to verify that the core code is working', function(){
    test('invoke an undefined method', function(done){
        var slacker = new Slacker("../dist/slacker-worker-core.js");
        slacker.invoke("foo", undefined, undefined, function(res){
            done();
        });
    });
});

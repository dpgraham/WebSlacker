WebSlacker
==========

Use WebWorker's smart, not hard.


Example
---------

    var slacker = new Slacker("slacker-worker.js");
    var text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text";
    console.log(text);
    slacker.invoke("deflate", text, function(result){
        console.log(result);
        slacker.invoke("inflate", result, function(decompressed){
            console.log(decompressed);
        }
    })

    OUTPUT:
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text

    MA
    0¿²7oþCðF0±4)Øß[
    B3³ûSH°e«6K¾bipzÏ	O\XõBÐo|lÖXÍK[±O©÷GÞ÷î§

    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text


Description
----------

WebWorkers a pretty great, but communicating with them can be a little bit cumbersome what with the constant stringifying
and parsing, and the event handler listening, etc...

What Slacker does is provides a simple interface for communicating with Web Workers. In the above example, all you had to
do was instantiate the 'Slacker' object, and then 'invoke' a method.

In this case, we invoked the deflate and inflate method. The invoke method passes the text to the WebWorker, the worker
does the compression and passes the result back to the success callback.


How to deploy it
----------

Tag your HTML with 'dist/slacker-window.js' and host 'dist/slacker-worker.js' somewhere as well.

To instantiate Slacker, just do this

    var slacker = new Slacker("path/to/slacker-worker.js")


How to extend it
----------

Here's an example

- slacker-worker-foo.js

    (function(){

        // Methods must have a params argument and success callback. The fail argument
        // is optional, only if there is some condition where the function fails to be called.
        var Foo = function(params, success, fail){
            if(params=="bar"){
                success("foobar");
            } else{
                fail("oops");
            }
        }

        // 'addMethod' registers 'foo' as an invokable method that calls the Foo function
        this.Slacker.addMethod("foo", Foo);

    }).call(this);


This file, and any other JS files that extend this must be concatenated together with 'slacker-worker-core.js' coming first.


WebSlacker
==========

Use WebWorkers smart, not hard.


Example
---------

```javascript

// Instantiate the slacker method
var slacker = new Slacker("slacker-worker.js");

var text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text";
console.log("UNCOMPRESSED: " + text);

// Invoke the deflate method on a block of text
slacker.invoke("deflate", text, function(result){

    console.log("COMPRESSED: " + result);

    // Now invoke the inflate method to get it back to it's original state
    slacker.invoke("inflate", result, function(decompressed){
        console.log("DECOMPRESSED: " + decompressed);
    }
})
```

Output:

    UNCOMPRESSED: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text

    COMPRESSED: MA
    0¿²7oþCðF0±4)Øß[
    B3³ûSH°e«6K¾bipzÏ	O\XõBÐo|lÖXÍK[±O©÷GÞ÷î§

    DECOMPRESSED: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text


Description
----------

WebWorkers are pretty great, but communicating with them can be a little bit cumbersome what with the constant stringifying
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

```javascript
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
```


This file, and any other JS files that extend this must be concatenated together with 'slacker-worker-core.js' coming first.


Endnote
-------
Big thanks to git://github.com/dankogai for implementing DEFLATE!
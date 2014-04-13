(function(){

    /**
     * Singleton class that handles all worker requests
     * @constructor
     */
    var Slacker = function(){

        // Bind to the onMessage event for the web worker
        self.addEventListener("message", function(ctx){
            return function(e){
                ctx.onMessage(e);
            };
        }(this));

        //  Method hash that stores functions that are used by this
        this._methodHash = {};
    };

    /**
     * 'message' event listener callback
     * @param e
     * @returns {*}
     */
    Slacker.prototype.onMessage = function(e){
        // Try parsing
        var eventObj;
        try {
            eventObj = JSON.parse(e.data);
        } catch (err) {
            return;
        }

        if(eventObj.method === undefined || eventObj.id === undefined){
            return;
        }

        // Success and failure callbacks
        var onSuccess = function(ctx, id, origin){
            return function(res){
                ctx.onSuccess(res, id, origin);
            };
        }(this, eventObj.id, e.origin);

        var onError = function(ctx, id, origin){
            return function(res){
                ctx.onError(res, id, origin);
            };
        }(this, eventObj.id, e.origin);

        // Invoke the associated method, or return an undefined method error
        if(this._methodHash[eventObj.method]){
            return this._methodHash[eventObj.method].call(this, eventObj.params, onSuccess, onError);
        } else {
            return onError({message: "Undefined method name: " + eventObj.method});
        }
    };

    /**
     * Callback when the method is successfully invoked
     * @param res {object} Result of method
     * @param id {number} Unique ID of the transaction that was provided by the top window
     * @param origin {string} Origin of the window making the request
     */
    Slacker.prototype.onSuccess = function(res, id, origin){
        var postMessageContents = {
            status: 1,
            data: res,
            id: id
        };

        self.postMessage(JSON.stringify(postMessageContents));
    };

    /**
     * Callback when the method is successfully invoked
     * @param res {object} Result of method
     * @param id {number} Unique ID of the transaction that was provided by the top window
     * @param origin {string} Origin of the window making the request
     */
    Slacker.prototype.onError = function(res, id, origin){
        var postMessageContents = {
            status: -1,
            data: res,
            id: id
        };

        self.postMessage(JSON.stringify(postMessageContents));
    };

    // Invoke the method. It's a singleton, so invoke it just once.
    this.Slacker = new Slacker();

}).call(this);

(function(){

    'use strict';




    /**
     * SLACKER
     *
     * This file is loaded in the browser. Used to communicate with the web worker.
     *
     */


    /**
     * Constructor for slacker object
     * @param worker_url {string} Points to the URL of the Web Worker javascript asset
     * @constructor
     */
    var Slacker = function(worker_url){
        this.worker = new Worker(worker_url);
        this.id = 0;
        this._transactions = {};

        // Bind to the onMessage event
        this.worker.onmessage = function(ctx){
            return function(e){
                ctx._onMessage(e);
            };
        }(this);
    };

    /**
     * Is this supported? We support any browser that supports WebWorkers
     * @returns {boolean}
     */
    Slacker.isSupported = function(){
        return !!window.Worker;
    };

    var proto = Slacker.prototype;

    /**
     * Invoke a method
     * @param method_name {string} Name of the method
     * @param params {object} Parameters passed to method
     * @param success {function} Success callback
     * @param fail {function} Fail callback
     */
    proto.invoke = function(method_name, params, success, fail){

        // Keep track of this transaction
        var id = this.id++;
        var eventObj = {
            method: method_name,
            params: params,
            id: id
        };

        // Transaction queue
        this._transactions[id] = {
            success: success,
            fail: fail
        };

        // Post the message to the WebWorker
        this.worker.postMessage(JSON.stringify(eventObj));
    };

    /**
     * Callback that's fired when a message is received
     * @param e {Event} JS Event
     * @private
     */
    proto._onMessage = function(e){
        var eventObj;

        // Try parsing the event data. Don't do anything if it fails to parse or is missing information
        try{
            eventObj = JSON.parse(e.data);
        } catch(err){
            return;
        }

        if(eventObj.id===undefined || eventObj.status===undefined){
            return;
        }

        // Find the transaction that was associated with this
        var transaction = this._transactions[eventObj.id];

        // If it's successful (status > 0) fire the success callback... else fire the fail callback
        if(eventObj.status > 0 && transaction.success){
            transaction.success(eventObj.data);
        } else if(eventObj.status < 0 && transaction.fail){
            transaction.fail(eventObj.data);
        }

        // Null out the transaction
        this._transactions[eventObj.id] = null;
    };

    if(typeof define === 'function'){
        define(function(){
            return Slacker;
        });
    } else if (typeof module !== 'undefined' && module.exports){
        module.exports = Slacker;
    } else{
        window.Slacker = Slacker;
    }



}).call(this);
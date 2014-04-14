(function(){

    // Define the compress namespace
    this.Compress = {};


    /**
     * Compresses data using the deflate algorithm
     * @param params {object} params.data is the string that needs to be decompressed
     * @param success
     * @param fail
     */
    this.Compress.deflate = function(ctx){
        return function(data, success, fail){
            // Deflate the data and call the success callback
            var deflated_data = ctx.RawDeflate.deflate(data);
            success(deflated_data);
        };
    }(this);

    /**
     * Decompresses data using the inflate algorithm
     * @param params {object} params.data is the uncompressed data
     * @param success
     * @param fail
     */
    this.Compress.inflate = function(ctx){
        return function(data, success, fail){
            // Deflate the data and call the success callback
            var inflated_data = ctx.RawDeflate.inflate(data);
            success(inflated_data);
        };
    }(this);

    // Add these two methods to the repertoire
    this.Slacker.addMethod("deflate", this.Compress.deflate);
    this.Slacker.addMethod("inflate", this.Compress.inflate);

}).call(this);
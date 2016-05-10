var XHR = (function () {
    "use strict";
    
    // private variables & functions
    
    // Example request Object:
    /*
        {
            requestType: "GET" or "POST",
            url: "http://theurl.com",
            async: false  default is true,
            data: postData
            responseType: "JSON" or Null for data,
            success: a callback function() {},
            error: a callback function () {}
        }
    */
    function get (obj) {
        var request = new XMLHttpRequest();
        var async = obj.async || true;
        
        request.open(obj.requestType, obj.url, async);
        
        if (obj.requestType.toLowerCase() === "post") {
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            
            if (obj.data != null) {
                request.send(obj.data);
            } else {
                console.error("No data to post");
            }
        } else {
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    // success
                    var response = request.responseText;
                    
                    if (obj.responseType != null && obj.responseType.toLowerCase() === "json") {
                        response = JSON.parse(response);
                    }
                        // return success handler or data
                        if (obj.success != null && obj.success != "") {
                            return obj.success(response);
                        } else {
                            return response;
                        }
                        
                } else {
                    // reached the server but it returned an error
                    if (obj.error) {
                        return error;
                    }
                    
                    console.error("Server return an error");
                }
            };
            
            request.onerror = function () {
                // Connection error
                if (obj.error) {
                    return error;
                }
                
                console.error("Can't connect to server");
            };
            
            request.send();
        }
    }
    
    return {
        // public functions
        
        get: get
    };
    
})();
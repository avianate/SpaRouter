var router = (function () {    
    
    // get the pathname
    var pathname = location.pathname,
        hostname = location.hostname,
        content = document.getElementById("content");
        
    var checkRoutes = function () {
        // if pathname matches any defined routes
        if (pathname.toLowerCase() === "/about")
        {
            // load the content for the matched route
            content.innerHTML = "About Content";   
            
            // push the history state
            history.replaceState({"name": "About"}, null, "/About");
            
            // update the document title so list of history items will display the appropriate page
            document.title = "About";
            
        } else {
            content.innerHTML = "Main Content";
        }    
    }
    
    checkRoutes();
    
})();
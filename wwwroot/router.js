var router = (function (XHR) {
    "use strict";
    
    // the client side routes
    var routes = {};
    var currentRoute = {};
    
    window.addEventListener("popstate", route);
    window.addEventListener("DOMContentLoaded", route);
    initLinks();
    
    function initLinks () {
        var links = document.querySelectorAll("a"),
            length = links.length,
            i = 0,
            link;
            
        for (; i < length; i++) {
            link = links[i];
            
            link.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                pushHistory(e.currentTarget);
            });
        }
    }
    
    function pushHistory(target) {
        var targetUrl = target.getAttribute("href");
        
        history.pushState(null, targetUrl.replace("/", ""), targetUrl.replace("/", ""));
        document.title = targetUrl.replace("/", "");
        route();
    };
    
    function replaceHistory(title) {
        history.replaceState(null, null, title);
        document.title = title;
    }
    
    /*
        obj.route                // the brower route we want to map to our client side router
        obj.templateUrl          // the url to get the html file from the server or the url to hit the server's controller and action method
        obj.controller           // function used for setting properties or passing data to the template
        obj.container            // the container element's tag, ID, or class
    */
    // method to add a new client side route
    function mapRoute (obj) {
        routes[obj.route] = { 
            templateUrl: obj.templateUrl, 
            controller: obj.controller, 
            container: obj.container
        };
    };
    
    /*
        checks if the browser's location has a mapped route
        and retrieves the data from the server and passed it
        to the controller function for the route
    */
    function route () {
        var url,
            container,
            controller;
            
        url = location.pathname || "/";
        currentRoute = routes[url] || "";
        container = document.querySelector(currentRoute.container) || "";
        controller = currentRoute.controller;
            
        // if we have a route object and it's container element
        if (currentRoute && container) {
            // get the data from the templateUrl
            XHR.get({
                requestType: "GET",
                url: currentRoute.templateUrl,
                success: currentRoute.controller
            });
            
            replaceHistory(url.replace("/", ""));
        }
    };
    
    function getRoutes () {
        return routes;
    };
    
    return {
        mapRoute: mapRoute,
        route: route,
        getRoutes: getRoutes
    };
    
})(XHR);
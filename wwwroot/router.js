var router = (function (XHR) {
    "use strict";
    
    // the client side routes
    var routes = {};
    var defaultRoute = {};
    var currentRoute = {};
    var defaultContainer = "ajax-container";
    
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
        var prettyUrl = targetUrl === "/" ? "/" : targetUrl.replace("/", "");
        
        history.pushState(prettyUrl, prettyUrl, prettyUrl);
        document.title = targetUrl.replace("/", "");
        route();
    };
    
    function replaceHistory(title) {
        history.replaceState(title, title, title);
        document.title = title;
    }
    
    /*
        obj.route                // the brower route we want to map to our client side router
        obj.templateUrl          // the url to get the html file from the server or the url to hit the server's controller and action method
        obj.controller           // function used for setting properties or passing data to the template
        obj.container            // the container element's tag, ID, or class
        obj.default              // a boolean to flag to set this as the default route
    */
    // method to add a new client side route
    function mapRoute (obj) {
        var thisObject = obj.route.toLowerCase();
        
        routes[thisObject] = { 
            templateUrl: obj.templateUrl || obj.route.toLowerCase(), 
            controller: obj.controller, 
            container: obj.container || defaultContainer
        };
        
        if (obj.default) {
            defaultRoute = routes[thisObject];
        }
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
            
        url = location.pathname.toLowerCase() || "/";
        currentRoute = routes[url] || "";
        controller = currentRoute.controller || setContent;
            
        // if we don't have a valid route object return home
        if (currentRoute === "" || !currentRoute) {
            currentRoute = defaultRoute;
        }
        
        // if we have a route object and it's container element
        if (currentRoute.templateUrl !== null && currentRoute.templateUrl !== "") {   
                     
            // get the data from the templateUrl
            XHR.get({
                requestType: "GET",
                url: currentRoute.templateUrl,
                success: currentRoute.controller || setContent
            });
            
            replaceHistory(url.replace("/", ""));
        }
    };
    
    function setContent(data) {
        var container = currentRoute.container != "" ? document.querySelector(currentRoute.container) : "";
        
        if (container) {
            container.innerHTML = data;
        } else {
            console.log("No container to place content into")
        }
    }
    
    function getRoutes () {
        return routes;
    };
    
    return {
        mapRoute: mapRoute,
        route: route,
        getRoutes: getRoutes
    };
    
})(XHR);
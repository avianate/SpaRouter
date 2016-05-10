(function () {
    "use strict";
    
    var routes = {};
    
    function route (path, name, controller) {
        routes[path] = { name: name, controller: controller };
    };
    
    route("/", "home", function () {});
    route ("/page2", "template2", function () {
        this.greeting = "Hello world";
    });
    route("/page3", "template3", function () {
        this.heading = "I'm page 3";
    });
    
    // the container element
    var element = null;
    
    function router () {
        element = element || document.getElementById("content");
        
        var url = location.hash.slice(1) || "/";
        var route = routes[url];
        
        if (element && route.controller) {
            element.innerHTML = route.name;
        }
    };
    
    window.addEventListener("popstate", router);
    
    window.addEventListener("load", router);
    
})();
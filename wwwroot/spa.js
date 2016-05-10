(function () {
    "use strict";
    
    router.mapRoute({
        route: "/",
        templateUrl: "",
        controller: "",
        container: ".content"
    });
    
    router.mapRoute({
        route: "/peter",
        templateUrl: "/busters/peter.html",
        controller: handleResponse,
        container: ".content"
    });
    
    router.mapRoute({
        route: "/ray",
        templateUrl: "/busters/ray.html",
        container: ".content",
        controller: handleResponse
    });
    
    router.mapRoute({
        route: "/egon",
        templateUrl: "/busters/egon.html",
        container: ".content",
        controller: handleResponse
    });
    
    router.mapRoute({
        route: "/winston",
        templateUrl: "/busters/winston.html",
        container: ".content",
        controller: handleResponse
    });
    
    function handleResponse (data) {
        var highlight = document.querySelector(".highlight");
        var container = document.querySelector(".content");
        
        highlight.textContent = this.url.replace("/busters/", "").replace(".html", "");
        container.innerHTML = data;
    };
    
})(router, XHR);
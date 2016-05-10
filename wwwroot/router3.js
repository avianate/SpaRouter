(function () {
    "use strict";
    
    var links = document.querySelector(".gallery");
    
    links.addEventListener("click", function (e) {
        // e.target is the image inside the link we just clicked
        if (e.target != e.currentTarget) {
            e.preventDefault();
            
            // we could also grab the link's href attribute for this
            var data = e.target.getAttribute("data-name"),
                url = "busters/" + data + ".html";
                
                requestContent(url);
                
                document.title = "Ghostbuster | " + data;
                history.pushState(data, data, data);
        }
        
        e.stopPropagation();
    }, false);
    
    window.addEventListener("popstate", function (e) {
        // e.state is equal to the data-attribute of the last image that was clicked
        var character = e.state;
        
        if (character == null) {
            content.innerHTML = " ";
            document.title = defaultTitle;
        } else {
            // updateText(character);
            requestContent("busters/" + character + ".html");
            document.title = "Ghostbuster | " + character;
        }
    });
    
    function requestContent(url) {
       XHR.get({
            requestType: "GET",
            url: url,
            success: loadContent
       });
       
       var name = document.querySelector(".highlight");
       name.textContent = url.replace(".html", "").replace("busters/", "");
    };
    
    function loadContent(data) {
        var content = document.querySelector(".content");
        content.innerHTML = data;
    }
    
    function updateText(character) {
        var content = document.querySelector(".content");
        
        var heading = document.createElement("h1");
        heading.innerHTML = character;
        
        content.appendChild(heading);
    }

})();
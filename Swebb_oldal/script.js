// Cookie functions
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(`Set cookie: ${name}=${value}; expires in ${days} days`);
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Show cookie consent banner if not already accepted
document.addEventListener("DOMContentLoaded", function() {
    if (!getCookie("cookieConsent")) {
        document.getElementById("cookieConsent").style.display = "block";
    } else {
        initializeTracking();
    }

    document.getElementById("acceptCookie").onclick = function() {
        setCookie("cookieConsent", "1", 30); // Set consent cookie for 30 days
        document.getElementById("cookieConsent").style.display = "none";
        initializeTracking();
    };

    document.getElementById("closeCookieConsent").onclick = function() {
        document.getElementById("cookieConsent").style.display = "none";
    };
});

function initializeTracking() {
    // Tracking page visits
    var visits = getCookie("visits") || 0;
    visits = parseInt(visits, 10); // Ensure visits is an integer
    visits++;
    setCookie("visits", visits, 7); // Cookie expires in 7 days
    console.log("Page visits: " + visits);

    // Tracking time spent on the page
    var startTime = Date.now();

    window.addEventListener("beforeunload", function() {
        var totalTime = getCookie("totalTime") || 0;
        totalTime = parseInt(totalTime, 10); // Ensure totalTime is an integer
        totalTime += (Date.now() - startTime);
        setCookie("totalTime", totalTime, 7); // Cookie expires in 7 days
        console.log("Total time spent: " + totalTime / 1000 + " seconds");
    });

    // Tracking clicks
    document.addEventListener("click", function() {
        var clicks = getCookie("clicks") || 0;
        clicks = parseInt(clicks, 10); // Ensure clicks is an integer
        clicks++;
        setCookie("clicks", clicks, 7); // Cookie expires in 7 days
        console.log("Clicks: " + clicks);
    });
}

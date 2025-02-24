"use strict";

(function () {
    if (!sessionStorage.getItem("use")) {
        console.log("[AUTHGUARD] Unauthorized access detected. Redirecting to login page")
        location.href = "login.html";
    }
})();
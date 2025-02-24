/*
INFT 2202 Assignment
Christian Maglalang - 100911001
Ben Hooper - 100836602
Feb 23, 2025
 */

"use strict";

// IIFE - Immediately Invoke Functional Expression
(function () {

    function openLightbox(event) {
        let lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        let img = document.createElement('img');
        img.src = event.target.dataset.full;
        lightbox.appendChild(img);
        lightbox.addEventListener('click', () => lightbox.remove());
        document.body.appendChild(lightbox);
        lightbox.style.display = 'flex';
    }

    function DisplayGalleryPage() {
        console.log("[INFO] DisplayGalleryPage called...");

        // Load gallery images
        fetch('data/gallery.json')
            .then(response => response.json())
            .then(data => {
                const galleryContainer = document.getElementById('gallery-container');
                data.images.forEach(img => {
                    let imgElement = document.createElement('img');
                    imgElement.src = img.thumbnail;
                    imgElement.dataset.full = img.fullsize;
                    imgElement.addEventListener('click', openLightbox);
                    galleryContainer.appendChild(imgElement);
                });
            })
    }

    function DisplayLoginPage() {
        console.log("[INFO] DisplayLoginPage called...");

        const messageArea = document.getElementById("messageArea");
        const loginButton = document.getElementById("loginButton");
        const cancelButton = document.getElementById("cancelButton");

        //messageArea
        messageArea.style.display = "none";

        if(!loginButton) {
            console.error("[ERROR] Unable to login button not found");
            return;
        }

        loginButton.addEventListener("click", async (event) => {
            //prevent default form submission
            event.preventDefault();

            //retrieve passed in form parameters
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            try{
                // The await keyword tells JavaScript to pause here (thread) until the fetch request completes
                const response = await fetch("data/users.json");

                if(!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const jsonData = await response.json();
                //console.log("[DEBUG] Fetched JSON Data:", jsonData);

                const users = jsonData.users;

                if(!Array.isArray(users)) {
                    throw new Error("[ERROR] Json data does not contain a valid array");
                }

                let success = false;
                let authenticatedUser = null;

                for(const user of users){
                    if(user.Username === username && user.Password === password){
                        success = true;
                        authenticatedUser = user;
                        break;
                    }
                }

                if(success) {
                    sessionStorage.setItem("use", JSON.stringify({
                        DisplayName: authenticatedUser.DisplayName,
                        EmailAddress: authenticatedUser.EmailAddress,
                        Username: authenticatedUser.Username
                    }));
                    messageArea.classList.remove("alert", "alert-danger");
                    messageArea.style.display = "none";
                    sessionStorage.setItem("login", "true");
                    location.href="index.html";

                }else{
                    messageArea.classList.add("alert", "alert-danger");
                    messageArea.textContent = "Invalid username or password. Please try again";
                    messageArea.style.display = "block";

                    document.getElementById("username").focus();
                    document.getElementById("username").select();

                }
            }catch(error){
                console.error("[ERROR] Login failed", error)
            }
        });

        //Handle cancel event
        cancelButton.addEventListener("click", (event) => {
            document.getElementById("loginForm").reset();
            location.href="index.html";
        })
    }

    function DisplayRegisterPage() {
        console.log("[INFO] DisplayRegisterPage called...");
    }

    /**
     * Checks and updates the active nav link
     */
    function updateActiveNavLink(){
        console.log("[INFO] updateActiveNewLine called...");

        const currentPage = document.title.trim();
        const navLinks = document.querySelectorAll("nav a");

        console.log(currentPage);
        navLinks.forEach((link) => {
            if(link.textContent === currentPage) {
                console.log(link.textContent);
                link.classList.add("active");
            }
            else{
                link.classList.remove("active");
            }
        })

    }

    function findSearch(input) {

        switch(input){
            case "home":
                location.href="index.html";
                break;
            case "opportunities":
                location.href="opportunities.html";
                break;
            case "events":
                location.href="events.html";
                break;
            case "contact":
                location.href="contacts.html";
                break;
            case "about":
                location.href="about.html";
                break;
            case "gallery":
                location.href="gallery.html";
                break;
            default:
                console.log("[INFO] Search not found...");
        }
    }

    async function LoadHeader() {
        console.log("[INFO] LoadHeader called...");

        fetch("header.html")
            .then(response => response.text())
            .then( data => {
                document.querySelector("header").innerHTML = data;
                updateActiveNavLink();
                checkLogin();

                let submit = document.getElementById("search-resultsbtn");

                submit.addEventListener("click", function (event) {

                    let inputSearched = document.getElementById("search-bar").value
                    console.log(inputSearched);

                    findSearch(inputSearched);

                })

            })
            .catch(error => {
                console.log("[ERROR] Unable to load header...");
            });
    }

    /**
     * Checks for user login
     */
    function checkLogin()
    {
        // Replace log in button with log out if user is logged in
        let login = sessionStorage.getItem("login");
        if(login === "true"){
            console.log("[INFO] User is logged in");
            let loginButton = document.getElementById("login");
            let registerButton = document.getElementById("register");
            loginButton.remove();
            registerButton.remove();
        }
        else{
            console.log("[INFO] User is not logged in");
            let logOutButton = document.getElementById("logout");
            logOutButton.remove();
        }
    }

    function DisplayLogOutPage() {
        console.log("Calling DisplayLogOutPage()...");

        let logoutButton = document.getElementById("logoutButton");
        let returnButton = document.getElementById("returnButton");

        logoutButton.addEventListener("click", async (event) => {
            event.preventDefault();
            sessionStorage.removeItem("login");
            location.href="index.html";
        });

        returnButton.addEventListener("click", async (event) => {
            event.preventDefault();
            location.href="index.html";
        });
    }

    function DisplayHomePage(){
        console.log("Calling DisplayHomePage()...");

        let loggedIn = sessionStorage.getItem("login");

        if (loggedIn === "true") {
            const userData = sessionStorage.getItem("use");
            const user = JSON.parse(userData);
            const username = user ? user.DisplayName : null;

            document.getElementById("welcomeMessage").innerText = `Welcome Back ${username}!`;
        }

        let slideIndex = 0;
        showSlides(slideIndex);

        function plusSlide(n) {
            showSlides(slideIndex += n);
        }

        function showSlides(n) {
            const slides = document.getElementsByClassName("slide");
            if (n >= slides.length) slideIndex = 0;
            if (n < 0) slideIndex = slides.length - 1;

            for (let slide of slides) {
                slide.style.display = "none";
            }
            slides[slideIndex].style.display = "block";
        }

        function prevSlide() {
            plusSlide(-1);
        }

        function nextSlide() {
            plusSlide(1);
        }

        setInterval(() => nextSlide(), 5000);

        // Get involved button
        let getInvolvedBtn = document.getElementById("getInvolvedBtn");
        getInvolvedBtn.addEventListener("click", function(){
            location.href="/opportunities.html";
        });
    }

    async function DisplayOpportunitiesPage(){
        console.log("Calling DisplayOpportunitiesPage()...");

        fetch("header.html").then(response => response.text())
        .then( data => {
            document.querySelector("header").innerHTML = data;

            const navLinks = document.querySelectorAll("nav a");

            navLinks.forEach((link) => {
                if(link.textContent === "Opportunities") {
                    link.innerHTML = "VOLUNTEER NOW!"
                    link.style.fontWeight = "bold";
                    link.style.backgroundColor = "#E7CCCC";
                    link.style.borderRadius = "15px";

                    checkLogin();
                }
            })
        })

        // Displays volunteer opportunities onto list
        const opportunityTable = document.getElementById("opportunitiesTable")
            .getElementsByTagName("tbody")[0];

        opportunityList.forEach(opportunity => {
            let row = document.createElement("tr");

            let title = document.createElement("td");
            let description = document.createElement("td");
            let date = document.createElement("td");
            let time = document.createElement("td");

            title.textContent = opportunity.title;
            description.textContent = opportunity.description;
            date.textContent = opportunity.date;
            time.textContent = opportunity.time;

            row.appendChild(title);
            row.appendChild(description);
            row.appendChild(date);
            row.appendChild(time);

            opportunityTable.appendChild(row);
        })

        // Sign Up Button - Opens Modal Form
        const modal = document.querySelector('#modal');
        const openModal = document.querySelector('.open-button');

        openModal.addEventListener("click", function() {
            modal.showModal();
        })
        // Modal learned from https://www.youtube.com/watch?v=TAB_v6yBXIE&t=359s
    }

    /**
     * Filters the events in the events table
     * @param data
     * @param table
     * @param filter
     */
    function filterEventsTable(data, table, filter) {
        // Remove all current events
        table.querySelectorAll("tbody tr").forEach(element => {
            table.removeChild(element);
        })

        // Add events depending on filter option
        data.forEach(element => {
            if (element.event === filter || filter === "all") {
                let row = document.createElement("tr");

                let date = document.createElement("td");
                let event = document.createElement("td");
                let description = document.createElement("td");

                date.textContent = element.date;
                event.textContent = element.event;
                description.textContent = element.description;

                row.appendChild(date);
                row.appendChild(event);
                row.appendChild(description);

                table.appendChild(row);
            }
        })
    }

    function DisplayEventsPage() {
        console.log("Calling DisplayEventsPage()...");

        // Displays events into calendar
        const eventTable = document.getElementById("eventsTable")
            .getElementsByTagName("tbody")[0];

        // Filter buttons
        let allEventsButton = document.getElementById("allEventsButton")
        let fundraiserButton = document.getElementById("fundraiserButton")
        let workshopButton = document.getElementById("workshopButton")
        let cleanupButton = document.getElementById("cleanupButton")

        // Fetch events.json data and display into table
        try {
            fetch("data/events.json")
                .then(response => response.json())
                .then( data => {

                    // Initial populate table
                    filterEventsTable(data.eventList, eventTable, "all");

                    // Filter all events
                    allEventsButton.addEventListener("click", function () {
                        filterEventsTable(data.eventList, eventTable, "all");
                    })

                    // Filter all fundraisers
                    fundraiserButton.addEventListener("click", function () {
                        filterEventsTable(data.eventList, eventTable, "Fundraiser");
                    })

                    // Filter all workshops
                    workshopButton.addEventListener("click", function () {
                        filterEventsTable(data.eventList, eventTable, "Workshop");
                    })

                    // Filter all cleanup
                    cleanupButton.addEventListener("click", function () {
                        filterEventsTable(data.eventList, eventTable, "Cleanup");
                    })
                })
        }catch{
            console.log("[ERROR] Unable to load events...");
        }
    }

    /**
     * Validates form
     * @returns {boolean}
     */
    function validateForm() {
        return (
            validateInput("fullName") &&
            validateInput("emailAddress") &&
            validateInput("subject") &&
            validateInput("message")
        )
    }

    /**
     * Validates given inputs
     * @param fieldId
     * @returns {boolean}
     */
    function validateInput(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        const rule = VALIDATION_RULES[fieldId];

        if (!field || !errorElement || !rule) {
            console.warn(`[WARN] Validation rule not found for ${fieldId}`);
        }

        // Test 1: Test for empty value
        if (field.value.trim() === "") {
            errorElement.textContent = rule.errorMessage;
            errorElement.textContent = "block";
            return false;
        }

        // Test 2: check if the input fails to match the regex pattern
        if(!rule.regex.test(field.value)){
            errorElement.textContent = rule.errorMessage;
            console.log(rule.errorMessage);
            errorElement.textContent = "block";
            return false;
        }

        // Clear the error message if validation passes
        errorElement.textContent = "";
        errorElement.style.diplay = "none";
        return true;
    }

    const VALIDATION_RULES = {
        fullName: {
            regex: /^[A-Za-z\s]+$/,
            errorMessage: "Full Name must contain only letters and spaces."
        },
        emailAddress: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: "Email follow email format (example@example.com)"
        },
        subject: {
            regex: /^.+$/,
            errorMessage: "Subject must not be empty."
        },
        message: {
            regex: /^.+$/,
            errorMessage: "Message must not be empty."
        }
    }

    function AddContact(fullName, contactNumber, emailAddress, message) {
        console.log("[DEBUG] AddContact() triggered");

        if(!validateForm()){
            alert("Form contains errors. PLease correct them before submitting");
            return;
        }

        let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
        if (contact.serialize()){
            // The primary key for a contact --> contact_ + date & time
            let key = `contact_${Date.now()}`
            localStorage.setItem(key, contact.serialize());
        }else{
            console.error("[ERROR] Contact serialization failed")
        }

        //redirect the user after successful contact addition
        location.href = "index.html";
    }

    function DisplayContactsPage(){
        console.log("Calling DisplayContactsPage()...");

        let sendButton = document.getElementById("sendButton");

        // Event listener for submit button
        sendButton.addEventListener("click", function(event){
            event.preventDefault();
            console.log("Sending ContactsPage()...");

            if(!validateForm()){
                alert("Please fix your errors before submitting");
                return;
            }

            AddContact(
                document.getElementById("fullName").value,
                document.getElementById("emailAddress").value,
                document.getElementById("subject").value,
                document.getElementById("message").value,
            );

        })

    }

    function DisplayAboutPage(){
        console.log("Calling DisplayAboutPage()...");


    }

    async function Start() {
        console.log("Starting...");

        // Load Header first, then CheckLogin after
        await LoadHeader();

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Opportunities":
                await DisplayOpportunitiesPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "Contact Us":
                DisplayContactsPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Log Out":
                DisplayLogOutPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            default:
                console.log("No matching case for the page title");
        }
    }
    window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM fully loaded and parsed");
        Start();
    });

})();

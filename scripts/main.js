"use strict";

// IIFE - Immediately Invoke Functional Expression
(function () {

    function DisplayHomePage(){
        console.log("Calling DisplayHomePage()...");
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

    function DisplayOpportunitiesPage(){
        console.log("Calling DisplayOpportunitiesPage()...");

        // Change Opportunities in navbar to Volunteer Now
        let pageName = document.getElementById("opportunitiesPage");
        pageName.textContent = "Volunteer Now!";

        // Displays volunteer opportunities onto list
        const opportunityTable = document.getElementById("opportunitiesTable").getElementsByTagName("tbody")[0];

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

    function DisplayEventsPage(){
        console.log("Calling DisplayEventsPage()...");

        // Displays events into calendar
        const eventTable = document.getElementById("eventsTable").getElementsByTagName("tbody")[0];

        eventList.forEach(element => {
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

            eventTable.appendChild(row);
        })

        // Filter buttons
        let allEventsButton = document.getElementById("allEventsButton")
        let fundraiserButton = document.getElementById("fundraiserButton")
        let workshopButton = document.getElementById("workshopButton")
        let cleanupButton = document.getElementById("cleanupButton")

        let rows = eventTable.querySelectorAll("tbody tr");

        allEventsButton.addEventListener("click", function(){
            rows.forEach(function(row) {
                row.style.display = "table-row";
            });
        })

        fundraiserButton.addEventListener("click", function(){
            rows.forEach(function(row) {
                const cells = row.getElementsByTagName("td");
                const eventType = cells[1].textContent;

                if (eventType === "Fundraiser") {
                    row.style.display = "table-row";
                }
                else { row.style.display = "none"; }
            });
        })

        workshopButton.addEventListener("click", function(){
            rows.forEach(function(row) {
                const cells = row.getElementsByTagName("td");
                const eventType = cells[1].textContent;

                if (eventType === "Workshop") {
                    row.style.display = "table-row";
                }
                else { row.style.display = "none"; }
            });
        })

        cleanupButton.addEventListener("click", function(){
            rows.forEach(function(row) {
                const cells = row.getElementsByTagName("td");
                const eventType = cells[1].textContent;

                if (eventType === "Cleanup") {
                    row.style.display = "table-row";
                }
                else { row.style.display = "none"; }
            });
        })
    }

    function DisplayContactsPage(){
        console.log("Calling DisplayContactsPage()...");

        let sendButton = document.getElementById("sendButton");

        // Event listener for submit button
        sendButton.addEventListener("click", function(){
            let fullName = document.getElementById("fullName").value;
            let emailAddress = document.getElementById("emailAddress").value;
            let subject = document.getElementById("subject").value;
            let message = document.getElementById("message").value;

            let contact = new Contact(fullName, emailAddress, subject, message);

            if (contact.isValid() === true) {
                console.log("Contact valid");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 5000);
            }
            else {
                console.log("Contact not valid");
            }
        })

    }

    function DisplayAboutPage(){
        console.log("Calling DisplayAboutPage()...");


    }

    function Start() {
        console.log("Starting...");

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Opportunities":
                DisplayOpportunitiesPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "Contacts":
                DisplayContactsPage();
                break;
            case "About":
                DisplayAboutPage();
                break;
        }
    }
    window.addEventListener("load", Start)

})();

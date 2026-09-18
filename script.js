let routes = document.querySelectorAll(".route-card");

routes.forEach(function(route) {
    route.addEventListener("click", function() {
        routes.forEach(function(r) {
            r.classList.remove("selected");
        });

        route.classList.add("selected");

        alert(route.querySelector("strong").innerText + " selected!");
    });
});


let searchBox = document.querySelector(".side-panel input");

if (searchBox) {
    searchBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            if (searchBox.value.trim() === "") {
                alert("Please enter a destination.");
            } else {
                alert("Searching for: " + searchBox.value);
            }
        }
    });
}


let places = document.querySelectorAll(".place");

places.forEach(function(place) {
    place.addEventListener("click", function() {
        alert("Selected: " + place.innerText);
    });
});


let loginForm = document.querySelector(".auth-box form");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = loginForm.querySelector('input[type="email"]').value.trim();
        let password = loginForm.querySelector('input[type="password"]').value.trim();

        if (email === "" || password === "") {
            alert("Please enter email and password.");
        } else {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        }
    });
}


let alternative = document.querySelector(".alternative");

if (alternative) {
    let buttons = alternative.querySelectorAll("button");

    if (buttons[0]) {
        buttons[0].addEventListener("click", function() {
            alert("Alternative route viewed.");
        });
    }

    if (buttons[1]) {
        buttons[1].addEventListener("click", function() {
            alert("Staying on current route.");
        });
    }
}


let editButton = document.querySelector(".profile-card .main-button");

if (editButton) {
    editButton.addEventListener("click", function() {
        alert("Profile editing will be available soon.");
    });
}


let feedbackButton = document.querySelector(".feedback .main-button");

if (feedbackButton) {
    feedbackButton.addEventListener("click", function() {
        let issue = document.querySelector(".feedback select").value;
        let message = document.querySelector(".feedback textarea").value.trim();

        if (issue === "Select an issue") {
            alert("Please select an issue.");
        } else if (message === "") {
            alert("Please describe the problem.");
        } else {
            alert("Report submitted successfully!");
        }
    });
}
let map;
let mapElement = document.getElementById("map");

if (mapElement && typeof L !== "undefined") {
    map = L.map("map").setView([28.6139, 77.2090], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([28.6139, 77.2090])
        .addTo(map)
        .bindPopup("Current Location")
        .openPopup();
}
let searchButton = document.getElementById("searchButton");
let destinationSearch = document.getElementById("destinationSearch");

if (searchButton && destinationSearch) {
    searchButton.addEventListener("click", function() {

        let destination = destinationSearch.value.trim();

        if (destination === "") {
            alert("Please enter a destination.");
            return;
        }

        fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(destination))
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                if (data.length === 0) {
                    alert("Destination not found.");
                    return;
                }

                let latitude = parseFloat(data[0].lat);
                let longitude = parseFloat(data[0].lon);

                map.setView([latitude, longitude], 15);

                L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup(destination)
                    .openPopup();
            })
            .catch(function() {
                alert("Something went wrong. Please try again.");
            });
    });
}
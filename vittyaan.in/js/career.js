// =====================================
// Vittyaan Career Page JavaScript
// =====================================

// Load seat availability from seats.txt
fetch("/js/seats.json")
    .then(response => response.json())
    .then(seats => {

        document.getElementById("frontendSeats").textContent = seats.Frontend;
        document.getElementById("backendSeats").textContent = seats.Backend;
        document.getElementById("fullstackSeats").textContent = seats.FullStack;

        document.getElementById("totalSeats").textContent =
            seats.Frontend + seats.Backend + seats.FullStack;

    })
    .catch(error => {

        console.log("Unable to load seat information.", error);

    });


// =====================================
// Smooth Scroll
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// =====================================
// Reveal Animation on Scroll
// =====================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".card, .grid4 div, .chips span").forEach(item => {

    item.classList.add("hidden");

    observer.observe(item);

});
const clickMeGif = document.getElementById("clickMeGif");
const clickMeContainer = document.getElementById("firstPage");
const contentContainer = document.getElementById("contentContainer");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const secondPage = document.getElementById("secondPage");
const emailForm = document.getElementById("emailForm");

// Variable to track the scaling factor
let scaleFactor = 1.2;

// Click Me GIF Animation
clickMeGif.addEventListener("click", function() {
    clickMeGif.style.transition = "transform 0.5s ease-in-out";
    clickMeGif.style.transform = "translateY(100px)";
    
    setTimeout(() => {
        clickMeGif.classList.add("hidden");
        contentContainer.classList.remove("hidden");
    }, 500);
});

// No Button Moves Away
noBtn.addEventListener("mouseenter", moveNoBtn);
noBtn.addEventListener("touchstart", moveNoBtn);

function moveNoBtn() {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Make Yes Button Grow
    yesBtn.style.transform = `scale(${scaleFactor})`;
    scaleFactor += 0.1; // Increase scale factor each time No moves away
}

// Yes Button Click - Sends Email & Prevents Redirection
yesBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevents default form submission

    // Hide first page and show second page
    clickMeContainer.classList.add("hidden");
    secondPage.classList.remove("hidden");

    // Make the Yay image fly in
    const yayImage = document.getElementById("responseImage");
    setTimeout(() => {
        yayImage.style.left = "0";  // Starts flying from left
    }, 500);

    // Manually send email via AJAX
    const formData = new FormData(emailForm);

    fetch(emailForm.action, {
        method: "POST",
        body: formData
    })
    .then(response => {
        console.log("Email sent successfully");
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// Prevent form submission in case it's triggered outside JavaScript
emailForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Stops default behavior
});
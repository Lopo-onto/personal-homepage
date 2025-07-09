function changeBackgroundColor() {
    const color = document.getElementById('bgColorPicker').value;
    document.body.style.backgroundColor = color;
}

// Apply saved background color on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        document.getElementById('bgColorPicker').value = savedColor;
    }

    // Listen for color changes
    const colorPicker = document.getElementById('bgColorPicker');
    colorPicker.addEventListener('input', () => {
        const selectedColor = colorPicker.value;
        document.body.style.backgroundColor = selectedColor;
        localStorage.setItem('bgColor', selectedColor);
    });
});


   

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactform");
  const feedback = document.getElementById("feedback");
  const modal = document.getElementById("confirmationModal");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fields = form.querySelectorAll("input, textarea");
    const emailField = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let allFilled = true;
    feedback.innerText = "";
    feedback.style.color = "red";

    fields.forEach(field => field.classList.remove("error"));

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const value = field.value.trim();

      if (value === "") {
        field.classList.add("error");
        allFilled = false;
      }
    }

    if (!allFilled) {
      feedback.innerText = "Please fill out all fields.";
      return;
    }

    const emailValue = emailField.value.trim();
    if (!emailPattern.test(emailValue)) {
      emailField.classList.add("error");
      feedback.innerText = "Please enter a valid email address.";
      return;
    }

    // Show confirmation modal
    modal.style.display = "flex";
  });

  confirmYes.addEventListener("click", function () {
    modal.style.display = "none";

    const data = new FormData(form);
    fetch("https://script.google.com/macros/s/AKfycbwaoykyFw-V119M0xd3I2DvAPHK90S1kzVJF3sDB4Q-OpWL4d6gKv2pwwaJNvZPks2b/exec", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(result => {
        if (result.result === "success") {
          feedback.style.color = "green";
          feedback.innerText = "Your message has been sent!";
          form.reset();
        } else {
          feedback.innerText = result.message || "Submission failed.";
        }
      })
      .catch(error => {
        feedback.innerText = "Error submitting form.";
        console.error("Submission error:", error);
      });
  });

  confirmNo.addEventListener("click", function () {
    modal.style.display = "none";
    feedback.innerText = "Submission canceled.";
  });
});



window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const header = document.querySelector("header");

  setTimeout(() => {
    loader.classList.add("loader--hidden");
    header.style.visibility = "visible"; // Show header immediately
    header.style.opacity = "1";          // If you're using opacity

    // Optional: remove loader after transition
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  }, 1000); // Delay in milliseconds
});



/*
 * VittYaan Website — Contact Form API
 * -----------------------------------------
 * 
 */

const contactFormAPI = "https://uat.vittyaan.in/methoda/api/contact-us";

// document.querySelectorAll("[data-contact-form]").forEach(form => {
const form = document.querySelector("#contact-form-api");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Browser validation
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const alertBox = form.querySelector(".form-success");
    const errorBox = form.querySelector(".form-error");
    const submitButton = form.querySelector('[type="submit"]');

    // Get form values
    const formData = new FormData(form);
    console.log(formData)
    const data = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      phone: formData.get("phone")?.trim() || "",
      subject: formData.get("subject")?.trim(),
      message: formData.get("message")?.trim()
    };
    console.log(data)

    // Optional: hide previous messages
    if (alertBox) {
      alertBox.classList.add("d-none");
    }

    if (errorBox) {
      errorBox.classList.add("d-none");
    }

    // Disable button while submitting
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(contactFormAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      // HTTP success + API success
      if (response.ok && result.ok === true) {
        if (alertBox) {
          alertBox.classList.remove("d-none");
          alertBox.textContent = result.message || "Your enquiry has been submitted successfully.";
        }

        form.reset();
        form.classList.remove("was-validated");
      } else {
        // API returned 400/413/415/etc.
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }

    } catch (error) {
      console.error("Contact form error:", error);

      if (errorBox) {
        errorBox.classList.remove("d-none");
        errorBox.textContent =
          error.message || "Unable to submit your enquiry. Please try again.";
      }
    } finally {
      // Re-enable button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      }
    }
  });
// });
// Contact form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Custom validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset validation states
            form.classList.remove('was-validated');
            [name, email, subject, message].forEach(field => {
                field.classList.remove('is-invalid');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value) {
                subject.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim() || message.value.trim().length < 20) {
                message.classList.add('is-invalid');
                message.nextElementSibling.textContent = message.value.trim().length < 20 
                    ? 'Message must be at least 20 characters' 
                    : 'Message is required';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const formData = {
                    name: name.value,
                    email: email.value,
                    company: document.getElementById('company').value,
                    subject: subject.value,
                    message: message.value
                };
                
                console.log('Form submitted:', formData);
                
                // Show success message
                document.getElementById('contactForm').style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    form.reset();
                }, 5000);
            } else {
                form.classList.add('was-validated');
            }
        });
    }
});

// Reset form function
function resetForm() {
    const form = document.getElementById('contactForm');
    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
}

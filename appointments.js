document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');  

    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: document.querySelector('input[name="name"]').value,
                email: document.querySelector('input[name="email"]').value,
                phone: document.querySelector('input[name="phone"]').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                service: document.getElementById('service').value,
                barber: document.getElementById('barber').value
            };

            try {
                const response = await fetch('/auth/booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message);
                    const dateInput = document.getElementById('date');
                    if (dateInput) {
                        dateInput.dispatchEvent(new Event('change'));
                    }
                } else {
                    alert("Error: " + result.message);
                }
            } catch (err) {
                console.error("Booking error:", err);
                alert("You can't book in this short intervallum.");
            }
        });
    }
});
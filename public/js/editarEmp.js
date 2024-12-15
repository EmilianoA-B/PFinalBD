document.addEventListener('DOMContentLoaded', () => {
    // Get the form element
    const form = document.querySelector('form');
    const submitButton = document.querySelector('button[type="submit"]');

    // Add a listener to the submit button
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Gather form data into an object
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(JSON.stringify(data));

         try {
            // Send a PUT request
            const response = await fetch(form.action, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Employee updated successfully!');
            } else {
                const error = await response.json();
                console.error('Error:', error);
                alert('Failed to update employee. Check the console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the employee.');
        }
    });
});

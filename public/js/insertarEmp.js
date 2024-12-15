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
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Se ha registrado un nuevo empleado!');
            } else {
                const error = await response.json();
                console.error('Error:', error);
                alert('No se ha podido registrar un nuevo empleado :(');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Un error ocurrio!');
        }
    });
});

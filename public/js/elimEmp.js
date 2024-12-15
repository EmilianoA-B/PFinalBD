document.addEventListener('DOMContentLoaded', () => {
    const eliminarButton = document.getElementById('eliminarEmp');

    eliminarButton.addEventListener('click', async (event) => {
        event.preventDefault(); 
        const EmpDiv = document.getElementById('emp').getAttribute('data-id');
        console.log("things are working")
        try {
            // Petición de DEL
            const response = await fetch(`/Empleados/delEmpleados/${EmpDiv}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('El empleado se eliminó de manera exitosa!');
            } else {
                const error = await response.json();
                console.error('Error:', error);
                alert('Hubo un fallo al eliminar el empleado.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error interno. No se eliminó el empleado');
        }
    });
});

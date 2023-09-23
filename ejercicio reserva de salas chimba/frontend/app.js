document.addEventListener("DOMContentLoaded", () => {
    
    const FormularioUsuario = document.getElementById("user-form");
    const roomForm = document.getElementById("room-form");
    const reservationForm = document.getElementById("reservation-form");

    
    FormularioUsuario.addEventListener("submit", (e) => {
        e.preventDefault(); 

       
        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const identification = document.getElementById("identification").value;

       
        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, lastname, identification }),
        })
            .then((response) => response.json())
            .then((data) => {
                
                alert(data.message);
                
            })
            .catch((error) => {
                console.error("Error creating the user:", error);
            });
    });

   
    roomForm.addEventListener("submit", (e) => {
        e.preventDefault();

        
        const roomName = document.getElementById("room-name").value;
        const roomLocation = document.getElementById("room-location").value;

       
        fetch("/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: roomName, location: roomLocation }),
        })
            .then((response) => response.json())
            .then((data) => {
                
                alert(data.message);
                
            })
            .catch((error) => {
                console.error("Error creating the room:", error);
            });
    });

    
    reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();

       
        const userName = document.getElementById("user-name").value;
        const userLastName = document.getElementById("user-lastname").value;
        const userIdentification = document.getElementById("user-identification").value;
        const roomId = document.getElementById("room-select").value;
        const reservationHour = parseInt(document.getElementById("reservation-hour").value);

        
        fetch("/reserve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roomId,
                startHour: reservationHour,
                userName,
                userLastName,
                userIdentification,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                
                alert(data.message);
            })
            .catch((error) => {
                console.error("Error making the reservation:", error);
            });
    });
});

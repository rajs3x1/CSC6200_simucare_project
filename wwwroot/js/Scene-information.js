function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();

    // Month names array
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get components
    const day = String(now.getDate()).padStart(2, '0');
    const monthIndex = now.getMonth();
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Adjusted to correctly determine AM or PM
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedDateTime = `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;

    dateTimeElement.textContent = formattedDateTime;
}

// Update the date and time immediately
updateDateTime();

// Update the date and time every second
setInterval(updateDateTime, 1000);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scene-form');
    const nextButton = document.getElementById('next-button');

    // Function to save form data to localStorage
    const saveFormData = () => {
        const incidentType = document.getElementById('incident-type').value;
        const incidentComments = document.getElementById('incident-comments').value;
        const address = document.getElementById('address').value;
        const locationComments = document.getElementById('location-comments').value;

        const sceneInformation = {
            incidentType,
            incidentComments,
            address,
            locationComments
        };

        localStorage.setItem('sceneInformation', JSON.stringify(sceneInformation));
    };

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem('sceneInformation');
        if (savedData) {
            const sceneInformation = JSON.parse(savedData);

            document.getElementById('incident-type').value = sceneInformation.incidentType;
            document.getElementById('incident-comments').value = sceneInformation.incidentComments;
            document.getElementById('address').value = sceneInformation.address;
            document.getElementById('location-comments').value = sceneInformation.locationComments;
        }
    };

    // Load form data when the page loads
    loadFormData();

    nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Save the form data
        saveFormData();

        // Navigate to the next page
        window.location.href = 'Patient-Details.html';
    });

});
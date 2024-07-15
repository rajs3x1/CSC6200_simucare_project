document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('nextButton');
    const dateOfBirthInput = document.getElementById('dateOfBirth');

    // Function to save form data to localStorage
    const saveFormData = () => {
        const formData = {
            title: document.getElementById('title').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            weight: document.getElementById('weight').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
        };

        localStorage.setItem('patientDetails', JSON.stringify(formData));
    };

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem('patientDetails');
        if (savedData) {
            const formData = JSON.parse(savedData);

            document.getElementById('title').value = formData.title;
            document.getElementById('firstName').value = formData.firstName;
            document.getElementById('lastName').value = formData.lastName;
            document.getElementById('dateOfBirth').value = formData.dateOfBirth;
            document.getElementById('age').value = formData.age;
            document.getElementById('gender').value = formData.gender;
            document.getElementById('weight').value = formData.weight;
            document.getElementById('address').value = formData.address;
            document.getElementById('phone').value = formData.phone;
        }
    };

    // Function to calculate age based on date of birth
    const calculateAge = () => {
        const dob = new Date(dateOfBirthInput.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        document.getElementById('age').value = age;
    };

    dateOfBirthInput.addEventListener('change', calculateAge);

    // Load form data when the page loads
    loadFormData();

    // Add event listeners
    nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Save the form data
        saveFormData();

        // Navigate to the next page
        window.location.href = 'Paramedic-Assessment.html';
    });

});

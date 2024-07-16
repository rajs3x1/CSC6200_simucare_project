document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('reset-button');

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem('studentData');
        if (savedData) {
            const studentData = JSON.parse(savedData);

            document.getElementById('nav-student').innerHTML = `Student: ${studentData.studentId} - ${studentData.studentName}`;

            console.log(document.getElementById('nav-student').innerHTML);
            console.log(studentData);
        }
    };

    // Load form data when the page loads
    loadFormData();

    // Add event listener to the reset button
    resetButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Clear all data from localStorage
        localStorage.clear();

        // Navigate to the Index page
        window.location.href = 'Index.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
   
    const resetButton = document.getElementById('reset-button');

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem('studentData');
        if (savedData) {
            const studentData = JSON.parse(savedData);

            document.getElementById('nav-student').innerHTML = `Student: ${studentData.studentId} - ${studentData.studentName}`

            console.log(document.getElementById('nav-student').value)
            console.log(studentData)
        }
        
    };

    // Load form data when the page loads
    loadFormData();
   

    resetButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        localStorage.clear();
        
        // Navigate to the next page
        window.location.href = 'index.html';
    });

});
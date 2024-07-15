document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loggedin-studentId');
    const nextButton = document.getElementById('next-button');

    // Function to save form data to localStorage
    const saveFormData = () => {
        const studentId = document.getElementById('student-id').value;
        const studentName = document.getElementById('student-name').value;

        const studentData = {
            studentId,
            studentName
        };

        localStorage.setItem('studentData', JSON.stringify(studentData));
    };

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem('studentData');
        if (savedData) {
            const studentData = JSON.parse(savedData);

            document.getElementById('student-id').value = studentData.studentId;
            document.getElementById('student-name').value = studentData.studentName;
        }
    };

    // Load form data when the page loads
    loadFormData();

    // Event listener for Next button to save form data
    if (nextButton) {
        nextButton.addEventListener('click', saveFormData);
    }
});

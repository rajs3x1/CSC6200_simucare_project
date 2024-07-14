

document.addEventListener('DOMContentLoaded', () => {

    const nextButton = document.getElementById('next-button');

    // Function to save form data to localStorage
    const saveFormData = () => {
        const caseNarrativeContent = document.getElementById('case-narrative').value;
      

        const caseNarrative = {
            caseNarrativeContent
        };

        localStorage.setItem('caseNarrative', JSON.stringify(caseNarrative));
    };

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem('caseNarrative');
        if (savedData) {
            const caseNarrative = JSON.parse(savedData);

            document.getElementById('case-narrative').value = caseNarrative.caseNarrativeContent;
            
        }
    };

    // Load form data when the page loads
    loadFormData();

    nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Save the form data
        saveFormData();

        // Navigate to the next page
        window.location.href = 'Handover.html';
    });

});
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('next-button');

    // Function to save form data to localStorage
    const saveFormData = () => {
        const caseNarrativeElement = document.getElementById('case-narrative');
        
        // Ensure the element exists and has a value
        if (caseNarrativeElement) {
            const caseNarrativeContent = caseNarrativeElement.value;
            console.log('Saving case narrative:', caseNarrativeContent); // Diagnostic log

            const caseNarrative = {
                caseNarrativeContent
            };

            localStorage.setItem('caseNarrative', JSON.stringify(caseNarrative));
        } else {
            console.error('Element with id "case-narrative" not found.');
        }
    };

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem('caseNarrative');
        
        if (savedData) {
            const caseNarrative = JSON.parse(savedData);
            console.log('Loaded case narrative:', caseNarrative.caseNarrativeContent); // Diagnostic log

            const caseNarrativeElement = document.getElementById('case-narrative');
            if (caseNarrativeElement) {
                caseNarrativeElement.value = caseNarrative.caseNarrativeContent;
            } else {
                console.error('Element with id "case-narrative" not found.');
            }
        }
    };

    // Load form data when the page loads
    loadFormData();

    if (nextButton) {
        nextButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior

            // Save the form data
            saveFormData();

            // Navigate to the next page
            window.location.href = 'Handover.html';
        });
    } else {
        console.error('Button with id "next-button" not found.');
    }
});

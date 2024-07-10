document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('next-button');

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedPatientDetails = localStorage.getItem('patientDetails');
        const savedParaAssess = localStorage.getItem('paramedicAssessment')
        

        //patient details
        if (savedPatientDetails) {
            const patientDetails = JSON.parse(savedPatientDetails);

            document.getElementById('first-name').value = patientDetails.firstName;
            document.getElementById('last-name').value = patientDetails.lastName;
            document.getElementById('dob').value = patientDetails.dateOfBirth;
            document.getElementById('age').value = patientDetails.age;
        }

        
        if(savedParaAssess){
            const paraAssess = JSON.parse(savedParaAssess);
            //complaints
            document.getElementById('complaints').value = paraAssess.complaint;
            //info complaints
            document.getElementById('information-complaint').value = `Nature: ${paraAssess.nature}, 
Intensity: ${paraAssess.intensity}, 
Location: ${paraAssess.location}, 
Duration: ${paraAssess.duration}, 
Onset: ${paraAssess.onset}, 
Contributing: ${paraAssess.contributing}, 
Aggravating: ${paraAssess.aggravating}, 
Alleviating: ${paraAssess.alleviating}, 
Frequency: ${paraAssess.frequency}, 
Impact: ${paraAssess.impact}, 
Attribute: ${paraAssess.attribute}, 
Treatment: ${paraAssess.treatment}`;

            //Allergies
            document.getElementById('allergies').value = paraAssess.allergies;
            //Adverse Drug Reactions
            document.getElementById('drug-reactions').value = paraAssess.adverseDrugReactions;
            //signs
            document.getElementById('signs').value = `Pulse Rate: ${paraAssess.pulseRate}, 
Blood Pressure: ${paraAssess.bloodPressure}, 
Pupillary Response: ${paraAssess.pupillaryResponse}, 
GCS Total: ${paraAssess.gcsTotal}, 
Temperature: ${paraAssess.temperature}`;
        }
    };

    // Load form data when the page loads
    loadFormData();

    nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior


        // Navigate to the next page
        window.location.href = 'Patient-Details.html';
    });

});
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('next-button');

    const saveFormData = () => {
        const handover = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            dateOfBirth: document.getElementById('dob').value,
            age: document.getElementById('age').value,
            information: document.getElementById('information-complaint').value,
            signs: document.getElementById('signs').value,
            treatment: document.getElementById('Treatment').value,
            allergies: document.getElementById('allergies').value,
            medications: document.getElementById('Medications').value,
            background: document.getElementById('background').value,
            drugReactions: document.getElementById('drug-reactions').value,
            other: document.getElementById('other').value,
            complaints: document.getElementById('complaints').value
        };

        localStorage.setItem('handOver', JSON.stringify(handover));
    };

    const loadFormData = () => {
        const savedPatientDetails = localStorage.getItem('patientDetails');
        const savedParaAssess = localStorage.getItem('paramedicAssessment');
        const savedHandoverData = localStorage.getItem('handOver');
        
        if (savedHandoverData) {
            const formData = JSON.parse(savedHandoverData);
            document.getElementById('complaints').value = formData.complaints || '';
            document.getElementById('information-complaint').value = formData.information || '';
            document.getElementById('signs').value = formData.signs || '';
            document.getElementById('Treatment').value = formData.treatment || '';
            document.getElementById('allergies').value = formData.allergies || '';
            document.getElementById('Medications').value = formData.medications || '';
            document.getElementById('background').value = formData.background || '';
            document.getElementById('drug-reactions').value = formData.drugReactions || '';
            document.getElementById('other').value = formData.other || '';
        }

        if (savedPatientDetails) {
            const patientDetails = JSON.parse(savedPatientDetails);
            document.getElementById('first-name').value = patientDetails.firstName || '';
            document.getElementById('last-name').value = patientDetails.lastName || '';
            document.getElementById('dob').value = patientDetails.dateOfBirth || '';
            document.getElementById('age').value = patientDetails.age || '';
        }

        if (savedParaAssess) {
            const paraAssess = JSON.parse(savedParaAssess);
            /*
            // Concatenate complaints
            const complaints = paraAssess.complaints.map(c => c.complaint).join(', ');
            document.getElementById('complaints').value = complaints || '';
            
            // Info complaints
            const infoFields = ['nature', 'intensity', 'location', 'duration', 'onset', 'contributing', 'aggravating', 'alleviating', 'frequency', 'impact', 'attribute', 'treatment'];
            const infoComplaints = infoFields.reduce((acc, field) => {
                acc[field] = paraAssess.complaints.map(c => c[field]).join(', ');
                return acc;
            }, {}); 

            document.getElementById('information-complaint').value = `Nature: ${infoComplaints.nature}
Intensity: ${infoComplaints.intensity}
Location: ${infoComplaints.location}
Duration: ${infoComplaints.duration}
Onset: ${infoComplaints.onset}
Contributing: ${infoComplaints.contributing}
Aggravating: ${infoComplaints.aggravating}
Alleviating: ${infoComplaints.alleviating}
Frequency: ${infoComplaints.frequency}
Impact: ${infoComplaints.impact}
Attribute: ${infoComplaints.attribute}
Treatment: ${infoComplaints.treatment}`;
*/

            // Allergies
            const allergies = paraAssess.histories.map(h => h.allergies).join(', ');
            document.getElementById('allergies').value = allergies || '';

            // Adverse Drug Reactions
            const adverseDrugs = paraAssess.histories.map(h => h.adverseDrugReactions).join(', ');
            document.getElementById('drug-reactions').value = adverseDrugs || '';

            // Signs
            /*
            const signsFields = ['pulseRate', 'bloodPressure', 'pupillaryResponse', 'temperature', 'gcsTotal'];
            const signsData = signsFields.reduce((acc, field) => {
                acc[field] = paraAssess.vitalSignsList.map(v => v[field]).join(', ');
                return acc;
            }, {});

            document.getElementById('signs').value = `Pulse Rate: ${signsData.pulseRate}
Blood Pressure: ${signsData.bloodPressure}
Pupillary Response: ${signsData.pupillaryResponse}
Temperature: ${signsData.temperature}
GCS Total: ${signsData.gcsTotal}`;*/


        }


    };

    loadFormData();

    if (nextButton) {
        nextButton.addEventListener('click', (event) => {
            event.preventDefault();
            saveFormData();
            window.location.href = 'Generate-Report.html';
        });
    }
});

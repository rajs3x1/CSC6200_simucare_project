

    function calculateGCS() {
        const eye = parseInt(document.getElementById('eyeOpening').value);
        const verbal = parseInt(document.getElementById('verbalResponse').value);
        const motor = parseInt(document.getElementById('motorResponse').value);
        const total = eye + verbal + motor;

        document.getElementById('gcsTotal').value = total;
        localStorage.setItem('gcsTotal', total.toString());
    }

// Adding Presenting Complaint

    function addPresentingComplaint() {
        const container = document.getElementById('presentingComplaintContainer');
        const newComplaint = document.querySelector('.presenting-complaint').cloneNode(true);
    
        // Clear the values in the cloned elements
        newComplaint.querySelectorAll('input').forEach(input => input.value = '');
        
        // Remove existing delete button if any
        const existingDeleteButton = newComplaint.querySelector('.delete-button');
        if (existingDeleteButton) {
            existingDeleteButton.remove();
        }
    
        // Add delete button to new complaint
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-button';
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
            deletePresentingComplaint(this);
        };
        newComplaint.appendChild(deleteButton);
    
        container.appendChild(newComplaint);
    }
    
    function deletePresentingComplaint(button) {
        const complaintSection = button.closest('.presenting-complaint');
        complaintSection.remove();
    }
    
    
// Adding Patient History

function addPatientHistory() {
    const container = document.getElementById('patientHistoryContainer');
    const newHistory = document.querySelector('.patient-history').cloneNode(true);

    // Clear the values in the cloned elements
    newHistory.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
    newHistory.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    newHistory.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);

    // Remove existing delete button if any
    const existingDeleteButton = newHistory.querySelector('.delete-button');
    if (existingDeleteButton) {
        existingDeleteButton.remove();
    }

    // Add delete button to new history section
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
        deletePatientHistory(this);
    };
    newHistory.appendChild(deleteButton);

    container.appendChild(newHistory);
}

function deletePatientHistory(button) {
    const historySection = button.closest('.patient-history');
    historySection.remove();
}

// Add VitalSigns

function addVitalSigns() {
    const container = document.getElementById('vitalSignsContainer');
    const newVitalSigns = document.querySelector('.vital-signs').cloneNode(true);

    // Clear the values in the cloned elements
    newVitalSigns.querySelectorAll('input').forEach(input => input.value = '');
    newVitalSigns.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
    newVitalSigns.querySelectorAll('select').forEach(select => select.selectedIndex = 0);

    // Remove existing delete button if any
    const existingDeleteButton = newVitalSigns.querySelector('.delete-button');
    if (existingDeleteButton) {
        existingDeleteButton.remove();
    }

    // Add delete button to new vital signs section
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
        deleteVitalSigns(this);
    };
    newVitalSigns.appendChild(deleteButton);

    container.appendChild(newVitalSigns);
}

function deleteVitalSigns(button) {
    const vitalSignsSection = button.closest('.vital-signs');
    vitalSignsSection.remove();
}

document.getElementById('nextButtonParamedicAssessment').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action (navigation)
    
    // Collect Primary Survey data
    const primarySurvey = {
        danger: document.getElementById('danger').value,
        response: document.getElementById('response').value,
        airway: document.getElementById('airway').value,
        breathing: document.getElementById('breathing').value,
        circulation: document.getElementById('circulation').value,
        comments: document.getElementById('comments').value
    };


    // Collect presenting complaint data
    const complaints = [];
    document.querySelectorAll('.presenting-complaint').forEach(complaintDiv => {
        const complaintData = {
            complaint: complaintDiv.querySelector('[name="complaint"]').value,
            nature: complaintDiv.querySelector('[name="nature"]').value,
            intensity: complaintDiv.querySelector('[name="intensity"]').value,
            location: complaintDiv.querySelector('[name="location"]').value,
            duration: complaintDiv.querySelector('[name="duration"]').value,
            onset: complaintDiv.querySelector('[name="onset"]').value,
            contributing: complaintDiv.querySelector('[name="contributing"]').value,
            aggravating: complaintDiv.querySelector('[name="aggravating"]').value,
            alleviating: complaintDiv.querySelector('[name="alleviating"]').value,
            frequency: complaintDiv.querySelector('[name="frequency"]').value,
            impact: complaintDiv.querySelector('[name="impact"]').value,
            attribute: complaintDiv.querySelector('[name="attribute"]').value,
            treatment: complaintDiv.querySelector('[name="treatment"]').value
        };
        complaints.push(complaintData);
    });

    // Collect patient history data
    const histories = [];
    document.querySelectorAll('.patient-history').forEach(historyDiv => {
        const historyData = {
            illnesses: historyDiv.querySelector('[name="illnesses"]').value,
            vaccinations_status: historyDiv.querySelector('input[name="vaccinations_status"]:checked')?.value || '',
            vaccinations: historyDiv.querySelector('[name="vaccinations"]').value,
            medications: historyDiv.querySelector('[name="medications"]').value,
            operations: historyDiv.querySelector('[name="operations"]').value,
            hospitalVisits: historyDiv.querySelector('[name="hospitalVisits"]').value,
            allergies: historyDiv.querySelector('[name="allergies"]').value,
            adverseDrugReactions: historyDiv.querySelector('[name="adverseDrugReactions"]').value
        };
        histories.push(historyData);
    });

    // Collect vital signs data
    const vitalSignsList = [];
    document.querySelectorAll('.vital-signs').forEach(vitalSignsDiv => {
        const vitalSignsData = {
            timeAssessed: vitalSignsDiv.querySelector('[name="timeAssessed"]').value,
            pulseRate: vitalSignsDiv.querySelector('[name="pulseRate"]').value,
            bloodPressure: vitalSignsDiv.querySelector('[name="bloodPressure"]').value,
            electrocardiogram: vitalSignsDiv.querySelector('[name="electrocardiogram"]').value,
            respiratoryRate: vitalSignsDiv.querySelector('[name="respiratoryRate"]').value,
            respiratoryRhythm: vitalSignsDiv.querySelector('[name="respiratoryRhythm"]').value,
            respiratoryEffort: vitalSignsDiv.querySelector('[name="respiratoryEffort"]').value,
            oxygenSaturation: vitalSignsDiv.querySelector('[name="oxygenSaturation"]').value,
            glasgowComaScale: {
                eyeOpening: vitalSignsDiv.querySelector('[name="eyeOpening"]').value,
                verbalResponse: vitalSignsDiv.querySelector('[name="verbalResponse"]').value,
                motorResponse: vitalSignsDiv.querySelector('[name="motorResponse"]').value
            },
            pupillaryResponse: vitalSignsDiv.querySelector('[name="pupillaryResponse"]').value,
            temperature: vitalSignsDiv.querySelector('[name="temperature"]').value,
            bloodGlucoseLevel: vitalSignsDiv.querySelector('[name="bloodGlucoseLevel"]').value
        };
        
        vitalSignsList.push(vitalSignsData);
    });

    // Collect Diagnosis data
    const diagnosis = {
        primaryDiagnosis: document.getElementById('primaryDiagnosis').value,
        secondaryDiagnosis: document.getElementById('secondaryDiagnosis').value
    };
    
    // Store form data in localStorage
    localStorage.setItem('paramedicAssessment', JSON.stringify({ primarySurvey, complaints, histories, vitalSignsList, diagnosis }));

    // Redirect to the next page
    window.location.href = 'Management.html';
});

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the stored data from localStorage
    const paramedicAssessment = JSON.parse(localStorage.getItem('paramedicAssessment'));

    if (paramedicAssessment) {

        // Populate Primary Survey
        document.getElementById('danger').value = paramedicAssessment.primarySurvey.danger;
        document.getElementById('response').value = paramedicAssessment.primarySurvey.response;
        document.getElementById('airway').value = paramedicAssessment.primarySurvey.airway;
        document.getElementById('breathing').value = paramedicAssessment.primarySurvey.breathing;
        document.getElementById('circulation').value = paramedicAssessment.primarySurvey.circulation;
        document.getElementById('comments').value = paramedicAssessment.primarySurvey.comments;

        // Populate Diagnosis
        document.getElementById('primaryDiagnosis').value = paramedicAssessment.diagnosis.primaryDiagnosis;
        document.getElementById('secondaryDiagnosis').value = paramedicAssessment.diagnosis.secondaryDiagnosis;

        // Populate presenting complaints
        paramedicAssessment.complaints.forEach((complaintData, index) => {
            if (index > 0) addPresentingComplaint();
            const complaintDiv = document.querySelectorAll('.presenting-complaint')[index];
            complaintDiv.querySelector('[name="complaint"]').value = complaintData.complaint;
            complaintDiv.querySelector('[name="nature"]').value = complaintData.nature;
            complaintDiv.querySelector('[name="intensity"]').value = complaintData.intensity;
            complaintDiv.querySelector('[name="location"]').value = complaintData.location;
            complaintDiv.querySelector('[name="duration"]').value = complaintData.duration;
            complaintDiv.querySelector('[name="onset"]').value = complaintData.onset;
            complaintDiv.querySelector('[name="contributing"]').value = complaintData.contributing;
            complaintDiv.querySelector('[name="aggravating"]').value = complaintData.aggravating;
            complaintDiv.querySelector('[name="alleviating"]').value = complaintData.alleviating;
            complaintDiv.querySelector('[name="frequency"]').value = complaintData.frequency;
            complaintDiv.querySelector('[name="impact"]').value = complaintData.impact;
            complaintDiv.querySelector('[name="attribute"]').value = complaintData.attribute;
            complaintDiv.querySelector('[name="treatment"]').value = complaintData.treatment;
        });

        // Populate patient histories
        paramedicAssessment.histories.forEach((historyData, index) => {
            if (index > 0) addPatientHistory();
            const historyDiv = document.querySelectorAll('.patient-history')[index];
            historyDiv.querySelector('[name="illnesses"]').value = historyData.illnesses;
            const vaccinationStatus = historyDiv.querySelector(`input[name="vaccinations_status"][value="${historyData.vaccinations_status}"]`);
            if (vaccinationStatus) vaccinationStatus.checked = true;
            historyDiv.querySelector('[name="vaccinations"]').value = historyData.vaccinations;
            historyDiv.querySelector('[name="medications"]').value = historyData.medications;
            historyDiv.querySelector('[name="operations"]').value = historyData.operations;
            historyDiv.querySelector('[name="hospitalVisits"]').value = historyData.hospitalVisits;
            historyDiv.querySelector('[name="allergies"]').value = historyData.allergies;
            historyDiv.querySelector('[name="adverseDrugReactions"]').value = historyData.adverseDrugReactions;
        });

        // Populate vital signs
        paramedicAssessment.vitalSignsList.forEach((vitalSignsData, index) => {
            if (index > 0) addVitalSigns();
            const vitalSignsDiv = document.querySelectorAll('.vital-signs')[index];
            vitalSignsDiv.querySelector('[name="timeAssessed"]').value = vitalSignsData.timeAssessed;
            vitalSignsDiv.querySelector('[name="pulseRate"]').value = vitalSignsData.pulseRate;
            vitalSignsDiv.querySelector('[name="bloodPressure"]').value = vitalSignsData.bloodPressure;
            vitalSignsDiv.querySelector('[name="electrocardiogram"]').value = vitalSignsData.electrocardiogram;
            vitalSignsDiv.querySelector('[name="respiratoryRate"]').value = vitalSignsData.respiratoryRate;
            vitalSignsDiv.querySelector('[name="respiratoryRhythm"]').value = vitalSignsData.respiratoryRhythm;
            vitalSignsDiv.querySelector('[name="respiratoryEffort"]').value = vitalSignsData.respiratoryEffort;
            vitalSignsDiv.querySelector('[name="oxygenSaturation"]').value = vitalSignsData.oxygenSaturation;
            vitalSignsDiv.querySelector('[name="eyeOpening"]').value = vitalSignsData.glasgowComaScale.eyeOpening;
            vitalSignsDiv.querySelector('[name="verbalResponse"]').value = vitalSignsData.glasgowComaScale.verbalResponse;
            vitalSignsDiv.querySelector('[name="motorResponse"]').value = vitalSignsData.glasgowComaScale.motorResponse;
            vitalSignsDiv.querySelector('[name="pupillaryResponse"]').value = vitalSignsData.pupillaryResponse;
            vitalSignsDiv.querySelector('[name="temperature"]').value = vitalSignsData.temperature;
            vitalSignsDiv.querySelector('[name="bloodGlucoseLevel"]').value = vitalSignsData.bloodGlucoseLevel;
        });

    }
});


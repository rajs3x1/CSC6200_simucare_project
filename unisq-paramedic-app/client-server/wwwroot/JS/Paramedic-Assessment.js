

    function calculateGCS() {
        const eye = parseInt(document.getElementById('eyeOpening').value);
        const verbal = parseInt(document.getElementById('verbalResponse').value);
        const motor = parseInt(document.getElementById('motorResponse').value);
        const total = eye + verbal + motor;
        document.getElementById('gcsTotal').value = total;
    }
    
    function addVitalSigns() {
        const container = document.getElementById('vitalSignsContainer');
        const newVitalSigns = document.querySelector('.vital-signs').cloneNode(true);
        container.appendChild(newVitalSigns);
    }
    
    function addPresentingComplaint() {
        const container = document.getElementById('presentingComplaintContainer');
        const newComplaint = document.querySelector('.presenting-complaint').cloneNode(true);
        container.appendChild(newComplaint);
    }

    function addPatientHistory() {
        const container = document.getElementById('patientHistoryContainer');
        const newComplaint = document.querySelector('.patient-history').cloneNode(true);
        container.appendChild(newComplaint);
    }

    document.getElementById('nextButtonParamedicAssessment').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action (navigation)

        // Collect form data
        const formDataParamedicAssessment = {
            danger: document.getElementById('danger').value,
            response: document.getElementById('response').value,
            airway: document.getElementById('airway').value,
            breathing: document.getElementById('breathing').value,
            circulation: document.getElementById('circulation').value,
            comments: document.getElementById('comments').value,

            complaint: document.getElementById('complaint').value,
            nature: document.getElementById('nature').value,
            intensity: document.getElementById('intensity').value,
            location: document.getElementById('location').value,
            duration: document.getElementById('duration').value,
            onset: document.getElementById('onset').value,
            contributing: document.getElementById('contributing').value,
            aggravating: document.getElementById('aggravating').value,
            alleviating: document.getElementById('alleviating').value,
            frequency: document.getElementById('frequency').value,
            impact: document.getElementById('impact').value,
            attribute: document.getElementById('attribute').value,
            treatment: document.getElementById('treatment').value,

            illnesses: document.getElementById('illnesses').value,
            vaccinations: document.getElementById('vaccinations').value,
            vaccinations_current: document.getElementById('vaccinations_current').value,
            vaccinations_not_current: document.getElementById('vaccinations_not_current').value,
            medications: document.getElementById('medications').value,
            operations: document.getElementById('operations').value,
            hospitalVisits: document.getElementById('hospitalVisits').value,
            allergies: document.getElementById('allergies').value,
            adverseDrugReactions: document.getElementById('adverseDrugReactions').value,
            timeAssessed: document.getElementById('timeAssessed').value,
            pulseRate: document.getElementById('pulseRate').value,
            bloodPressure: document.getElementById('bloodPressure').value,
            electrocardiogram: document.getElementById('electrocardiogram').value,
            respiratoryRate: document.getElementById('respiratoryRate').value, 
            respiratoryRhythm: document.getElementById('respiratoryRhythm').value, 
            respiratoryEffort: document.getElementById('respiratoryRate').value, 
            oxygenSaturation: document.getElementById('oxygenSaturation').value, 
            eyeOpening: document.getElementById('eyeOpening').value, 
            verbalResponse: document.getElementById('verbalResponse').value, 
            motorResponse: document.getElementById('motorResponse').value, 
            pupillaryResponse: document.getElementById('pupillaryResponse').value, 
            gcsTotal: document.getElementById('gcsTotal').value, 
            temperature: document.getElementById('temperature').value, 
            bloodGlucoseLevel: document.getElementById('bloodGlucoseLevel').value, 

            primaryDiagnosis: document.getElementById('primaryDiagnosis').value, 
            secondaryDiagnosis: document.getElementById('secondaryDiagnosis').value, 

        };

        console.log(formDataParamedicAssessment);

        // Store form data in localStorage
        localStorage.setItem('paramedicAssessment', JSON.stringify(formDataParamedicAssessment));

        // Redirect to the next page
        window.location.href = 'Management.html';
                
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Retrieve the stored data from localStorage
        const paramedicAssessment = JSON.parse(localStorage.getItem('paramedicAssessment'));

        if (paramedicAssessment) {
            console.log(paramedicAssessment);

            // Populate the form fields with the retrieved data
            document.getElementById('danger').value = paramedicAssessment.danger;
            document.getElementById('response').value = paramedicAssessment.response;
            document.getElementById('airway').value = paramedicAssessment.airway;
            document.getElementById('breathing').value = paramedicAssessment.breathing;
            document.getElementById('circulation').value = paramedicAssessment.circulation;
            document.getElementById('comments').value = paramedicAssessment.comments;

            document.getElementById('complaint').value = paramedicAssessment.complaint;
            document.getElementById('nature').value = paramedicAssessment.nature;
            document.getElementById('intensity').value = paramedicAssessment.intensity;
            document.getElementById('location').value = paramedicAssessment.location;
            document.getElementById('duration').value = paramedicAssessment.duration;
            document.getElementById('onset').value = paramedicAssessment.onset;
            document.getElementById('contributing').value = paramedicAssessment.contributing;
            document.getElementById('aggravating').value = paramedicAssessment.aggravating;
            document.getElementById('alleviating').value = paramedicAssessment.alleviating;
            document.getElementById('frequency').value = paramedicAssessment.frequency;
            document.getElementById('impact').value = paramedicAssessment.impact;
            document.getElementById('attribute').value = paramedicAssessment.attribute;
            document.getElementById('treatment').value = paramedicAssessment.treatment;

            document.getElementById('illnesses').value = paramedicAssessment.illnesses;
            document.getElementById('vaccinations').value = paramedicAssessment.vaccinations;
            document.getElementById('vaccinations_current').value = paramedicAssessment.vaccinations_current;
            document.getElementById('vaccinations_not_current').value = paramedicAssessment.vaccinations_not_current;
            document.getElementById('medications').value = paramedicAssessment.medications;
            document.getElementById('operations').value = paramedicAssessment.operations;
            document.getElementById('hospitalVisits').value = paramedicAssessment.hospitalVisits;
            document.getElementById('allergies').value = paramedicAssessment.allergies;
            document.getElementById('adverseDrugReactions').value = paramedicAssessment.adverseDrugReactions;
            document.getElementById('timeAssessed').value = paramedicAssessment.timeAssessed;
            document.getElementById('pulseRate').value = paramedicAssessment.pulseRate;
            document.getElementById('bloodPressure').value = paramedicAssessment.bloodPressure;
            document.getElementById('electrocardiogram').value = paramedicAssessment.electrocardiogram;
            document.getElementById('respiratoryRate').value = paramedicAssessment.respiratoryRate;
            document.getElementById('oxygenSaturation').value = paramedicAssessment.oxygenSaturation;
            document.getElementById('eyeOpening').value = paramedicAssessment.eyeOpening;
            document.getElementById('verbalResponse').value = paramedicAssessment.verbalResponse;
            document.getElementById('motorResponse').value = paramedicAssessment.motorResponse;
            document.getElementById('pupillaryResponse').value = paramedicAssessment.pupillaryResponse;
            document.getElementById('gcsTotal').value = paramedicAssessment.gcsTotal;
            document.getElementById('temperature').value = paramedicAssessment.temperature;
            document.getElementById('bloodGlucoseLevel').value = paramedicAssessment.bloodGlucoseLevel;

            document.getElementById('primaryDiagnosis').value = paramedicAssessment.primaryDiagnosis;
            document.getElementById('secondaryDiagnosis').value = paramedicAssessment.secondaryDiagnosis;

        }
    });
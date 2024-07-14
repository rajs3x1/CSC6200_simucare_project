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
            let complaints ="";
            for(let i = 0 ; i < paraAssess.complaints.length;i++){
                if(i == 0){
                    complaints = `${paraAssess.complaints[i].complaint}`;
                }else{
                    complaints = `${complaints}, ${paraAssess.complaints[i].complaint}`;
                }
                
            }
            document.getElementById('complaints').value = complaints
            
            // Info complaints

let natureComplain = "";
let intensityComplain = "";
let locationComplain = "";
let durationComplain = "";
let onsetComplain = "";
let contributingComplain = "";
let aggravatingComplain = "";
let alleviatingComplain = "";
let frequencyComplain = "";
let impactComplain = "";
let attributeComplain = "";
let treatmentComplain = "";

for (let i = 0; i < paraAssess.complaints.length; i++) {
    let complaint = paraAssess.complaints[i];
    if (i === 0) {
        natureComplain = `${complaint.nature}`;
        intensityComplain = `${complaint.intensity}`;
        locationComplain = `${complaint.location}`;
        durationComplain = `${complaint.duration}`;
        onsetComplain = `${complaint.onset}`;
        contributingComplain = `${complaint.contributing}`;
        aggravatingComplain = `${complaint.aggravating}`;
        alleviatingComplain = `${complaint.alleviating}`;
        frequencyComplain = `${complaint.frequency}`;
        impactComplain = `${complaint.impact}`;
        attributeComplain = `${complaint.attribute}`;
        treatmentComplain = `${complaint.treatment}`;
    } else {
        natureComplain +=  `, ${complaint.nature}`;
        intensityComplain += `, ${complaint.intensity}`;
        locationComplain += `, ${complaint.location}`;
        durationComplain += `, ${complaint.duration}`;
        onsetComplain += `, ${complaint.onset}`;
        contributingComplain += `, ${complaint.contributing}`;
        aggravatingComplain += `, ${complaint.aggravating}`;
        alleviatingComplain += `, ${complaint.alleviating}`;
        frequencyComplain += `, ${complaint.frequency}`;
        impactComplain += `, ${complaint.impact}`;
        attributeComplain += `, ${complaint.attribute}`;
        treatmentComplain += `, ${complaint.treatment}`;
    }
}

document.getElementById('information-complaint').value = `Nature: ${natureComplain} 
Intensity: ${intensityComplain}
Location: ${locationComplain}
Duration: ${durationComplain}
Onset: ${onsetComplain}
Contributing: ${contributingComplain} 
Aggravating: ${aggravatingComplain}
Alleviating: ${alleviatingComplain}
Frequency: ${frequencyComplain}
Impact: ${impactComplain}
Attribute: ${attributeComplain}
Treatment: ${treatmentComplain}`;



            //Allergies
            let allergy = "";
            for(let i = 0 ; i < paraAssess.histories.length ; i ++ ){
                
                if(i == 0){
                    allergy = `${paraAssess.histories[i].allergies}`;
                }else{
                    allergy += `, ${paraAssess.histories[i].allergies}`; 
                }
            }
            document.getElementById('allergies').value = allergy;

            //Adverse Drug Reactions
            let adverseDrug = "";
            for(let i = 0; i< paraAssess.histories.length; i++){
               
                if(i == 0){
                    
                    adverseDrug = `${paraAssess.histories[i].adverseDrugReactions}`;
                }else{
                    adverseDrug += `, ${paraAssess.histories[i].adverseDrugReactions}`; 
                }
            }
         
            document.getElementById('drug-reactions').value = adverseDrug;

            //signs
            let signsPulseRate = "";
            let signsBloodPressure = "";
            let signsPupillaryResponse = "";
            let signsGcsTotal = "";
            let signsTemperature = "";
            for(let i = 0 ; i < paraAssess.vitalSignsList.length ; i++){
                
                if(i == 0){
                    signsPulseRate = `${paraAssess.vitalSignsList[i].pulseRate}`;
                    signsBloodPressure = `${paraAssess.vitalSignsList[i].bloodPressure}`;
                    signsPupillaryResponse = `${paraAssess.vitalSignsList[i].pupillaryResponse}`;
                    signsTemperature = `${paraAssess.vitalSignsList[i].temperature}`;
                }else{
                    signsPulseRate += `${paraAssess.vitalSignsList[i].pulseRate}`;
                    signsBloodPressure += `${paraAssess.vitalSignsList[i].bloodPressure}`;
                    signsPupillaryResponse += `${paraAssess.vitalSigns[i].pupillaryResponse}`;
                    signsTemperature += `${paraAssess.vitalSignsList[i].temperature}`;
                }
            }
            
            document.getElementById('signs').value = `Pulse Rate: ${signsPulseRate}, 
Blood Pressure: ${signsBloodPressure}, 
Pupillary Response: ${signsPupillaryResponse},
Temperature: ${signsTemperature}`;
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
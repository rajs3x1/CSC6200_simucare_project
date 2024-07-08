

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
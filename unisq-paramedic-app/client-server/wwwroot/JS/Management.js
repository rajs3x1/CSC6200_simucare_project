function addNewTherapyRow() {
    const formTherapyTemplate = `
        <div class="form-row">
            <div class="form-group">
                <label for="time-of-admin">Time of Administration:</label>
                <input type="datetime-local" name="time-of-admin">
            </div>
            <div class="form-group">
                <label for="drug-name">Drug Name:</label>
                <input type="text" name="drug-name" placeholder="Input drug name">
            </div>
            <div class="form-group">
                <label for="drug-dose">Drug Dose:</label>
                <input type="text" name="drug-dose" placeholder="input drug dose "><span>(mg)</span>
            </div>
            <div class="form-group">
                <label for="route-administration">Route of Administration:</label>
                <input type="text" name="route-administration" placeholder="input Route">
            </div>
        </div>
    `;

    const drugTherapyFieldset = document.getElementById('drug-therapy');
    drugTherapyFieldset.insertAdjacentHTML('beforeend', formTherapyTemplate);
}

function addNewOtherManagementRow() {
    const formRowTemplate = `
        <div class="form-row">
            <div class="form-group">
                <label for="time-of-management">Time of Management:</label>
                <input type="datetime-local" name="time-of-management">
            </div>
            <div class="form-group">
                <label for="management-given">Management Given:</label>
                <input type="text" name="management-given" placeholder="Input management details">
            </div>
        </div>
    `;

    const otherManagementFieldset = document.getElementById('other-management');
    otherManagementFieldset.insertAdjacentHTML('beforeend', formRowTemplate);
}
document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById('management');
const nextButton = document.getElementById('next-button');

// Function to save form data to localStorage
const saveFormData = () => {
    const formData = {
        drugTherapy: [],
        otherManagement: []
    };

    document.querySelectorAll('#drug-therapy .form-row').forEach(row => {
        const timeOfAdmin = row.querySelector('input[name="time-of-admin"]').value;
        const drugName = row.querySelector('input[name="drug-name"]').value;
        const drugDose = row.querySelector('input[name="drug-dose"]').value;
        const routeAdministration = row.querySelector('input[name="route-administration"]').value;

        formData.drugTherapy.push({
            timeOfAdmin,
            drugName,
            drugDose,
            routeAdministration
        });
    });

    document.querySelectorAll('#other-management .form-row').forEach(row => {
        const timeOfManagement = row.querySelector('input[name="time-of-management"]').value;
        const managementGiven = row.querySelector('input[name="management-given"]').value;

        formData.otherManagement.push({
            timeOfManagement,
            managementGiven
        });
    });

    localStorage.setItem('managementFormData', JSON.stringify(formData));
};

const loadFormData = () => {
    const savedData = localStorage.getItem('managementFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);

        // Populate drug therapy data
        formData.drugTherapy.forEach((data, index) => {
            if (index === 0) {
                // Populate the first row if it's empty
                const firstRow = document.querySelector('#drug-therapy .form-row');
                firstRow.querySelector('input[name="time-of-admin"]').value = data.timeOfAdmin;
                firstRow.querySelector('input[name="drug-name"]').value = data.drugName;
                firstRow.querySelector('input[name="drug-dose"]').value = data.drugDose;
                firstRow.querySelector('input[name="route-administration"]').value = data.routeAdministration;
            } else {
                // Add new rows for subsequent entries
                addNewTherapyRow();
                const lastRow = document.querySelector('#drug-therapy .form-row:last-child');
                lastRow.querySelector('input[name="time-of-admin"]').value = data.timeOfAdmin;
                lastRow.querySelector('input[name="drug-name"]').value = data.drugName;
                lastRow.querySelector('input[name="drug-dose"]').value = data.drugDose;
                lastRow.querySelector('input[name="route-administration"]').value = data.routeAdministration;
            }
        });

        // Populate other management data
        formData.otherManagement.forEach((data, index) => {
            if (index === 0) {
                // Populate the first row if it's empty
                const firstRow = document.querySelector('#other-management .form-row');
                firstRow.querySelector('input[name="time-of-management"]').value = data.timeOfManagement;
                firstRow.querySelector('input[name="management-given"]').value = data.managementGiven;
            } else {
                // Add new rows for subsequent entries
                addNewOtherManagementRow();
                const lastRow = document.querySelector('#other-management .form-row:last-child');
                lastRow.querySelector('input[name="time-of-management"]').value = data.timeOfManagement;
                lastRow.querySelector('input[name="management-given"]').value = data.managementGiven;
            }
        });
    }
};


    // Load form data when the page loads
    loadFormData();

    nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Save the form data
        saveFormData();

        // Navigate to the next page
        window.location.href = 'Case-Narrative.html';
    });
});
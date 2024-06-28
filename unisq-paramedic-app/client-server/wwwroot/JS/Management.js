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

    function toggleOtherNature(selectElement) {
        var otherNatureInput = document.getElementById('otherNature');
        if (selectElement.value === 'other') {
            otherNatureInput.style.display = 'block';
        } else {
            otherNatureInput.style.display = 'none';
        }
    }

    function toggleOtherLocation(selectElement) {
        var otherNatureInput = document.getElementById('otherLocation');
        if (selectElement.value === 'other') {
            otherNatureInput.style.display = 'block';
        } else {
            otherNatureInput.style.display = 'none';
        }
    }

    function toggleOtherField(selectElement, inputId) {
        var otherInput = document.getElementById(inputId);
        if (selectElement.value === 'other') {
            otherInput.style.display = 'block';
        } else {
            otherInput.style.display = 'none';
        }
    }

    let sectionCount = 0;
    const historyOptions = [
        'Family History',
        'Social History',
        'Sexual History',
        'Substance History',
        'Menstrual History'
    ];

    function addHistorySection() {
        sectionCount++;
        const container = document.getElementById('otherPatientHistoryContainer');
        const section = document.createElement('div');
        section.id = `historySection${sectionCount}`;

        const label = document.createElement('label');
        label.innerText = `Select Section ${sectionCount}:`;
        label.setAttribute('for', `history${sectionCount}`);
        label.className = 'history-section-label';

        const select = document.createElement('select');
        select.id = `history${sectionCount}`;
        select.name = `history${sectionCount}`;
        select.className = 'history-section-select';
        select.onchange = function() {
            updateTextArea(this);
        };

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.innerText = 'Select History Type';
        select.appendChild(defaultOption);

        historyOptions.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText.toLowerCase().replace(' ', '_');
            option.innerText = optionText;
            select.appendChild(option);
        });

        const textarea = document.createElement('textarea');
        textarea.id = `textarea${sectionCount}`;
        textarea.name = `textarea${sectionCount}`;
        textarea.rows = 4;
        textarea.className = 'history-section-textarea';
        textarea.style.display = 'none';  // Initially hidden

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.innerText = 'Remove';
        removeButton.className = 'history-section-button';
        removeButton.onclick = () => removeHistorySection(section.id);

        section.appendChild(label);
        section.appendChild(select);
        section.appendChild(textarea);
        section.appendChild(removeButton);
        container.appendChild(section);
    }

    function removeHistorySection(sectionId) {
        const section = document.getElementById(sectionId);
        section.remove();
    }

    function updateTextArea(selectElement) {
        const textarea = selectElement.nextElementSibling;
        if (selectElement.value) {
            textarea.style.display = 'block';
        } else {
            textarea.style.display = 'none';
        }
    }
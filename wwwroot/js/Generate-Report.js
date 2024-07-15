document.addEventListener('DOMContentLoaded', function() {
    window.jsPDF = window.jspdf.jsPDF;

    document.getElementById('download-pdf').addEventListener('click', function() {
        const pdf = new jsPDF({
            orientation: 'l',
            unit: 'px',
            format: 'a4',
            marginLeft: 20,
            marginRight: 20,
            fontSize: 12,
        });

        const indexPageUrl = 'Index.html';
        const scenePageUrl = 'Scene-Information.html';
        const patientDetailsPageUrl = 'Patient-Details.html';

        // Retrieve user input from localStorage
        const savedSceneData = localStorage.getItem('sceneInformation');
        const sceneUserData = savedSceneData ? JSON.parse(savedSceneData) : {};

        const savedIndexData = localStorage.getItem('studentData');
        const indexUserData = savedIndexData ? JSON.parse(savedIndexData) : {};

        const savedPatientData = localStorage.getItem('patientDetails');
        const patientUserData = savedPatientData ? JSON.parse(savedPatientData) : {};

        // Function to fetch and render page content
        const fetchAndRenderPage = (url, userData) => {
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => response.text())
                    .then(html => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;

                        if (url === indexPageUrl) {
                            const pageContent = tempDiv.querySelector('#student-details');
                            if (!pageContent) {
                                console.error('Error: Element with id "student-details" not found.');
                                reject('Element not found');
                                return;
                            }

                            // Set field values for Index page
                            const studentIdField = pageContent.querySelector('#student-id');
                            if (studentIdField) {
                                studentIdField.value = userData.studentId || '';
                            }

                            const studentNameField = pageContent.querySelector('#student-name');
                            if (studentNameField) {
                                studentNameField.value = userData.studentName || '';
                            }

                            // Append tempDiv to body to ensure styles are applied
                            document.body.appendChild(tempDiv);

                            // Delay to ensure styles are applied
                            setTimeout(() => {
                                html2canvas(pageContent, {
                                    scale: 2,
                                    scrollX: -window.scrollX,
                                    scrollY: -window.scrollY,
                                    windowWidth: document.documentElement.offsetWidth,
                                    windowHeight: document.documentElement.offsetHeight,
                                }).then(canvas => {
                                    document.body.removeChild(tempDiv);
                                    resolve({
                                        canvas: canvas,
                                        width: canvas.width,
                                        height: canvas.height
                                    });
                                }).catch(error => {
                                    console.error('Error generating PDF:', error);
                                    reject(error);
                                });
                            }, 100); // Adjust timeout if necessary

                        } else if (url === scenePageUrl) {
                            const pageContent = tempDiv.querySelector('#scene-information');
                            if (!pageContent) {
                                console.error('Error: Element with id "scene-information" not found.');
                                reject('Element not found');
                                return;
                            }

                            // Set field values for Scene Information page
                            const incidentTypeField = pageContent.querySelector('#incident-type');
                            if (incidentTypeField) {
                                incidentTypeField.value = userData.incidentType || '';
                            }

                            const incidentCommentsField = pageContent.querySelector('#incident-comments');
                            if (incidentCommentsField) {
                                incidentCommentsField.value = userData.incidentComments || '';
                            }

                            const addressField = pageContent.querySelector('#address');
                            if (addressField) {
                                addressField.value = userData.address || '';
                            }

                            const locationCommentsField = pageContent.querySelector('#location-comments');
                            if (locationCommentsField) {
                                locationCommentsField.value = userData.locationComments || '';
                            }

                            const dateTimeElement = pageContent.querySelector('#date-time');
                            if (dateTimeElement) {
                                const now = new Date();

                                // Month names array
                                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            
                                // Get components
                                const day = String(now.getDate()).padStart(2, '0');
                                const monthIndex = now.getMonth();
                                const year = now.getFullYear();
                            
                                let hours = now.getHours();
                                const minutes = String(now.getMinutes()).padStart(2, '0');
                                const seconds = String(now.getSeconds()).padStart(2, '0');
                                const ampm = hours >= 12 ? 'PM' : 'AM'; // Adjusted to correctly determine AM or PM
                                hours = hours % 12;
                                hours = hours ? hours : 12; // the hour '0' should be '12'
                            
                                const formattedDateTime = `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
                            
                                dateTimeElement.textContent = formattedDateTime;
                            }

                            // Append tempDiv to body to ensure styles are applied
                            document.body.appendChild(tempDiv);

                            // Delay to ensure styles are applied
                            setTimeout(() => {
                                html2canvas(pageContent, {
                                    scale: 2,
                                    scrollX: -window.scrollX,
                                    scrollY: -window.scrollY,
                                    windowWidth: document.documentElement.offsetWidth,
                                    windowHeight: document.documentElement.offsetHeight,
                                }).then(canvas => {
                                    document.body.removeChild(tempDiv);
                                    resolve({
                                        canvas: canvas,
                                        width: canvas.width,
                                        height: canvas.height
                                    });
                                }).catch(error => {
                                    console.error('Error generating PDF:', error);
                                    reject(error);
                                });
                            }, 100); // Adjust timeout if necessary

                        } else if (url === patientDetailsPageUrl) { // Handle Patient-Details page
                            const pageContent = tempDiv.querySelector('#patient-details');
                            if (!pageContent) {
                                console.error('Error: Element with id "patient-details" not found.');
                                reject('Element not found');
                                return;
                            }

                            // Set field values for Patient Details page
                            const titleField = pageContent.querySelector('#title');
                            if (titleField) {
                                titleField.value = userData.title || '';
                            }

                            const firstNameField = pageContent.querySelector('#firstName');
                            if (firstNameField) {
                                firstNameField.value = userData.firstName || '';
                            }

                            const lastNameField = pageContent.querySelector('#lastName');
                            if (lastNameField) {
                                lastNameField.value = userData.lastName || '';
                            }

                            const dobField = pageContent.querySelector('#dateOfBirth');
                            if (dobField) {
                                dobField.value = userData.dateOfBirth || '';
                            }

                            const ageField = pageContent.querySelector('#age');
                            if (ageField) {
                                ageField.value = userData.age || '';
                            }

                            const genderField = pageContent.querySelector('#gender');
                            if (genderField) {
                                genderField.value = userData.gender || '';
                            }

                            const weightField = pageContent.querySelector('#weight');
                            if (weightField) {
                                weightField.textContent = userData.weight || '';
                            }

                            const addressField = pageContent.querySelector('#address');
                            if (addressField) {
                                addressField.textContent = userData.address || '';
                            }

                            const phoneField = pageContent.querySelector('#phone');
                            if (phoneField) {
                                phoneField.textContent = userData.phone || '';
                            }

                            // Append tempDiv to body to ensure styles are applied
                            document.body.appendChild(tempDiv);

                            // Delay to ensure styles are applied
                            setTimeout(() => {
                                html2canvas(pageContent, {
                                    scale: 2,
                                    scrollX: -window.scrollX,
                                    scrollY: -window.scrollY,
                                    windowWidth: document.documentElement.offsetWidth,
                                    windowHeight: document.documentElement.offsetHeight,
                                }).then(canvas => {
                                    document.body.removeChild(tempDiv);
                                    resolve({
                                        canvas: canvas,
                                        width: canvas.width,
                                        height: canvas.height
                                    });
                                }).catch(error => {
                                    console.error('Error generating PDF:', error);
                                    reject(error);
                                });
                            }, 100); // Adjust timeout if necessary
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching HTML:', error);
                        reject(error);
                    });
            });
        };

        // Fetch and render all three pages sequentially
        let pdfWidth;

        fetchAndRenderPage(indexPageUrl, indexUserData)
            .then(indexData => {
                const imgDataIndex = indexData.canvas.toDataURL('image/png');
                pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeightIndex = (indexData.height * pdfWidth) / indexData.width;

                // Add Index Page content to PDF
                pdf.addImage(imgDataIndex, 'PNG', 20, 20, pdfWidth - 40, pdfHeightIndex - 20);

                // Add borders
                pdf.setDrawColor(255);
                pdf.setLineWidth(1);
                pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20, 'S');

                return fetchAndRenderPage(scenePageUrl, sceneUserData);
            })
            .then(sceneData => {
                const imgDataScene = sceneData.canvas.toDataURL('image/png');
                const pdfHeightScene = (sceneData.height * pdfWidth) / sceneData.width;

                // Add Scene Page content to PDF
                pdf.addPage();
                pdf.addImage(imgDataScene, 'PNG', 20, 20, pdfWidth - 40, pdfHeightScene - 20);

                // Add borders
                pdf.setDrawColor(255);
                pdf.setLineWidth(1);
                pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20, 'S');

                return fetchAndRenderPage(patientDetailsPageUrl, patientUserData);
            })
            .then(patientData => {
                const imgDataPatient = patientData.canvas.toDataURL('image/png');
                const pdfHeightPatient = (patientData.height * pdfWidth) / patientData.width;

                // Add Patient Details Page content to PDF
                pdf.addPage();
                pdf.addImage(imgDataPatient, 'PNG', 20, 20, pdfWidth - 40, pdfHeightPatient - 20);

                // Add borders
                pdf.setDrawColor(255);
                pdf.setLineWidth(1);
                pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20, 'S');

                pdf.save('combined-information.pdf');
            })
            .catch(error => {
                console.error('Error rendering pages:', error);
            });
    });
});

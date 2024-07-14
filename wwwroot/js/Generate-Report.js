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

        const pageUrl = 'Scene-Information.html';

        // Retrieve user input from localStorage
        const savedData = localStorage.getItem('sceneInformation');
        const userData = savedData ? JSON.parse(savedData) : {};

        fetch(pageUrl)
            .then(response => response.text())
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                // Ensure the scene-information element is selected correctly
                const pageContent = tempDiv.querySelector('#scene-information');

                if (!pageContent) {
                    console.error('Error: Element with id "scene-information" not found.');
                    return;
                }

                // Update form fields with user input
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

                // Update date and time
                const dateTimeElement = tempDiv.querySelector('#date-time');
                if (dateTimeElement) {
                    const now = new Date();
                    const formattedDateTime = now.toLocaleString();
                    dateTimeElement.textContent = formattedDateTime;
                }

                // Append tempDiv to document body to properly render elements
                document.body.appendChild(tempDiv);

                html2canvas(pageContent, {
                    scale: 2,
                    scrollX: -window.scrollX,
                    scrollY: -window.scrollY,
                    windowWidth: document.documentElement.offsetWidth,
                    windowHeight: document.documentElement.offsetHeight,
                }).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    // Add logo to PDF (top right)
                    const logoImg = new Image();
                    logoImg.src = 'img/logo-USQ.png';
                    logoImg.onload = function() {
                        const logoWidth = 80;
                        const logoHeight = 40;
                        const logoX = pdfWidth - logoWidth - 20;
                        const logoY = 20;

                        pdf.addImage(logoImg, 'PNG', logoX, logoY, logoWidth, logoHeight);

                        // Add main content below logo
                        const contentTopMargin = 80;

                        pdf.addImage(imgData, 'PNG', 20, contentTopMargin, pdfWidth - 40, pdfHeight - 100);

                        // Add borders
                        pdf.setDrawColor(0); // Black
                        pdf.setLineWidth(1);
                        pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20, 'S');

                        pdf.save('scene-information.pdf');

                        // Remove tempDiv after generating PDF
                        document.body.removeChild(tempDiv);
                    };
                }).catch(error => {
                    console.error('Error generating PDF:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    });
});
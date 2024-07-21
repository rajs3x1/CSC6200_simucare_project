document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('download-pdf').addEventListener('click', async function() {
        // Define the async function that creates the PDF
        async function createPdf() {
            const { PDFDocument, rgb, StandardFonts } = window.PDFLib;

            const pdfDoc = await PDFDocument.create();
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

            // Fetch and embed the image
            const uniSQImg = "/wwwroot/img/logo-USQ.png";
            const uniSQImgBytes = await fetch(uniSQImg).then(res => res.arrayBuffer());
            const uniSQImage = await pdfDoc.embedPng(uniSQImgBytes);

            // Retrieve data from localStorage
            const savedStudentData = localStorage.getItem('studentData');
            const studentData = savedStudentData ? JSON.parse(savedStudentData) : {};

            const savedSceneData = localStorage.getItem('sceneInformation');
            const sceneInformation = savedSceneData ? JSON.parse(savedSceneData) : {};

            const savedPatientData = localStorage.getItem('patientDetails');
            const patientData = savedPatientData ? JSON.parse(savedPatientData) : {};

            const savedParamedicData = localStorage.getItem('paramedicAssessment');
            const paramedicAssessment = savedParamedicData ? JSON.parse(savedParamedicData) : {};

            // Utility function to create a new page
            function createNewPage() {
                const page = pdfDoc.addPage();
                const { width, height } = page.getSize();

                // Draw the header image on the new page
                const uniSQDims = uniSQImage.scale(0.2); // Scale the image to 20% of its original size
                page.drawImage(uniSQImage, {
                    x: width - uniSQDims.width - 20, // 20 units from the right edge
                    y: height - uniSQDims.height - 20, // 20 units from the top edge
                    width: uniSQDims.width,
                    height: uniSQDims.height,
                });

                return page;
            }

            // Function to draw text with wrapping
            function drawTextWithWrap(page, text, x, y, font, fontSize, maxWidth, lineHeight) {
                const lines = wrapText(text, font, fontSize, maxWidth);
                lines.forEach((line, index) => {
                    page.drawText(line, {
                        x: x,
                        y: y - (index * lineHeight),
                        size: fontSize,
                        font: font,
                        color: rgb(0, 0, 0),
                    });
                });
                return y - (lines.length * lineHeight);
            }

            // Function to wrap text
            function wrapText(text, font, fontSize, maxWidth) {
                const lines = [];
                const words = text.split(' ');
                let currentLine = '';

                for (const word of words) {
                    const testLine = currentLine + (currentLine ? ' ' : '') + word;
                    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

                    if (testWidth > maxWidth) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                }
                lines.push(currentLine);
                return lines;
            }

            // Initialize the first page
            let page = createNewPage();
            const { width, height } = page.getSize();
            const fontSizeHeading = 15;
            const fontSizeField = 10;
            const fontSizeFooter = 8;
            const margin = 20;
            const maxWidth = width - 2 * margin;
            let currentYPosition = height - 20;

            // Draw a section with optional offset
            function drawSection(title, contentGenerator, offset = 0) {
                if (currentYPosition - 40 < 40) { // Check if there's enough space for section title
                    page = createNewPage();
                    currentYPosition = height - 20;
                }

                page.drawText(title, {
                    x: margin,
                    y: currentYPosition + offset,
                    size: fontSizeHeading,
                    font: helveticaFont,
                    color: rgb(0.31, 0.3, 0.4),
                });

                currentYPosition -= 20 + offset; // Adjust Y position for the section title and offset
                contentGenerator();

                if (currentYPosition - 20 < 40) { // Check if there's enough space after section content
                    page = createNewPage();
                    currentYPosition = height - 20;
                }

                page.drawLine({
                    start: { x: margin, y: currentYPosition },
                    end: { x: width - margin, y: currentYPosition },
                    thickness: 1,
                    color: rgb(0.31, 0.3, 0.4),
                });

                currentYPosition -= 20; // Adjust for horizontal line space
            }

            // Draw the Student Details section with a 40 unit offset
            drawSection('Student Details', () => {
                currentYPosition = drawTextWithWrap(page, `Student ID: ${studentData.studentId || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Student Name: ${studentData.studentName || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            }, 40);

            // Draw the Scene Information section
            drawSection('Scene Information', () => {
                currentYPosition = drawTextWithWrap(page, `Incident Type: ${sceneInformation.incidentType || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Incident Comments: ${sceneInformation.incidentComments || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Address: ${sceneInformation.address || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Location Comments: ${sceneInformation.locationComments || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            });

            // Draw the Patient Details section
            drawSection('Patient Details', () => {
                currentYPosition = drawTextWithWrap(page, `Title: ${patientData.title || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Name: ${patientData.firstName || ''} ${patientData.lastName || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Date of Birth: ${patientData.dateOfBirth || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Age: ${patientData.age || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Gender: ${patientData.gender || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Phone: ${patientData.phone || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Weight (kg): ${patientData.weight || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Address: ${patientData.address || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            });

            // Draw the Paramedic Assessment section
            drawSection('Paramedic Assessment', () => {
                const presentingComplaints = paramedicAssessment.complaints || [];
                const presentingComplaintsHeading = 'Presenting Complaints';
                if (currentYPosition - 40 < 40) {
                    page = createNewPage();
                    currentYPosition = height - 20;
                }

                page.drawText(presentingComplaintsHeading, {
                    x: margin,
                    y: currentYPosition,
                    size: fontSizeHeading,
                    font: helveticaFont,
                    color: rgb(0.31, 0.3, 0.4),
                });
                currentYPosition -= 20;

                presentingComplaints.forEach((complaint, index) => {
                    currentYPosition = drawTextWithWrap(page, `Complaint ${index + 1}: ${complaint.complaint || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Comments: ${complaint.comments || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition -= 20;
                });
            });

            // Draw the Vital Signs section
            drawSection('Vital Signs', () => {
                const vitalSigns = paramedicAssessment.vitalSignsList[0] || {};
                currentYPosition = drawTextWithWrap(page, `Time Assessed: ${vitalSigns.timeAssessed || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Pulse Rate: ${vitalSigns.pulseRate || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Blood Pressure: ${vitalSigns.bloodPressure || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `ECG: ${vitalSigns.electrocardiogram || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Respiratory Rate: ${vitalSigns.respiratoryRate || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Respiratory Rhythm: ${vitalSigns.respiratoryRhythm || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Respiratory Effort: ${vitalSigns.respiratoryEffort || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Oxygen Saturation: ${vitalSigns.oxygenSaturation || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Glasgow Coma Scale: E${vitalSigns.glasgowComaScale?.eyeOpening || ''} V${vitalSigns.glasgowComaScale?.verbalResponse || ''} M${vitalSigns.glasgowComaScale?.motorResponse || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `GCS Total: ${vitalSigns.gcsTotal || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Pupillary Response: ${vitalSigns.pupillaryResponse || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Temperature: ${vitalSigns.temperature || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Blood Glucose Level: ${vitalSigns.bloodGlucoseLevel || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            });

            // Draw the Histories section
            drawSection('Histories', () => {
                const histories = paramedicAssessment.histories[0] || {};
                currentYPosition = drawTextWithWrap(page, `Illnesses: ${histories.illnesses || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Vaccinations Status: ${histories.vaccinations_status || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Vaccinations: ${histories.vaccinations || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Medications: ${histories.medications || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Operations: ${histories.operations || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Hospital Visits: ${histories.hospitalVisits || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Allergies: ${histories.allergies || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Adverse Drug Reactions: ${histories.adverseDrugReactions || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            });

            // Draw the Diagnosis section
            drawSection('Diagnosis', () => {
                const diagnosis = paramedicAssessment.diagnosis || {};
                currentYPosition = drawTextWithWrap(page, `Primary Diagnosis: ${diagnosis.primaryDiagnosis || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Secondary Diagnosis: ${diagnosis.secondaryDiagnosis || ''}`, margin, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            });

            // Save the PDF to get the total number of pages
            const pdfBytes = await pdfDoc.save();
            const pdfDocLoaded = await PDFDocument.load(pdfBytes);
            const totalPages = pdfDocLoaded.getPageCount();

            // Update the footer on each page
            pdfDocLoaded.getPages().forEach((page, index) => {
                page.drawText(`Page ${index + 1} of ${totalPages}`, {
                    x: width - margin - 80,
                    y: 20,
                    size: fontSizeFooter,
                    font: helveticaFont,
                    color: rgb(0.31, 0.3, 0.4),
                });
            });

            const finalPdfBytes = await pdfDocLoaded.save();
            const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            // Trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'StudentAssessmentReport.pdf';
            a.click();
            URL.revokeObjectURL(url);
        }

        // Call the async function
        await createPdf();
    });
});

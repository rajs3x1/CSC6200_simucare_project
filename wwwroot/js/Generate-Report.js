document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('download-pdf').addEventListener('click', async function() {
        async function createPdf() {
            const { PDFDocument, rgb, StandardFonts } = window.PDFLib;

            const pdfDoc = await PDFDocument.create();
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

            const uniSQImg = "/wwwroot/img/logo-USQ.png";
            const uniSQImgBytes = await fetch(uniSQImg).then(res => res.arrayBuffer());
            const uniSQImage = await pdfDoc.embedPng(uniSQImgBytes);

            const savedStudentData = localStorage.getItem('studentData');
            const studentData = savedStudentData ? JSON.parse(savedStudentData) : {};

            const savedSceneData = localStorage.getItem('sceneInformation');
            const sceneInformation = savedSceneData ? JSON.parse(savedSceneData) : {};

            const savedPatientData = localStorage.getItem('patientDetails');
            const patientData = savedPatientData ? JSON.parse(savedPatientData) : {};

            const savedParamedicData = localStorage.getItem('paramedicAssessment');
            const paramedicAssessment = savedParamedicData ? JSON.parse(savedParamedicData) : {};

            const savedManagementData = localStorage.getItem('managementFormData');
            const managementFormData = savedManagementData ? JSON.parse(savedManagementData) : {};

            const savedCaseNarrative = localStorage.getItem('caseNarrative');
            const caseNarrative = savedCaseNarrative ? JSON.parse(savedCaseNarrative) : {};
            const caseNarrativeContent = caseNarrative.caseNarrativeContent || '';


            function createNewPage() {
                const page = pdfDoc.addPage();
                const { width, height } = page.getSize();
                const uniSQDims = uniSQImage.scale(0.2);
                page.drawImage(uniSQImage, {
                    x: width - uniSQDims.width - 20,
                    y: height - uniSQDims.height - 20,
                    width: uniSQDims.width,
                    height: uniSQDims.height,
                });
                return page;
            }

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

            let page = createNewPage();
            const { width, height } = page.getSize();
            const fontSizeHeading = 15;
            const fontSizeField = 10;
            const fontSizeFooter = 8;
            const margin = 20;
            const padding = 10;
            const maxWidth = width - 2 * margin - 2 * padding;
            let currentYPosition = height - margin - padding;
            
            function drawSection(title, contentGenerator, offset = 0, includeTitle = true, drawLines = true) {
                if (currentYPosition - 40 < margin + padding) {
                    page = createNewPage();
                    currentYPosition = height - margin - padding;
                }
            
                if (includeTitle && title) {
                    page.drawText(title, {
                        x: margin + padding,
                        y: currentYPosition + offset,
                        size: fontSizeHeading,
                        font: helveticaFont,
                        color: rgb(0.31, 0.3, 0.4),
                    });
                }
            
                currentYPosition -= (includeTitle ? 20 : 0) + offset;
                contentGenerator();
            
                if (drawLines) {
                    if (currentYPosition - 20 < margin + padding) {
                        page = createNewPage();
                        currentYPosition = height - margin - padding;
                    }
            
                    page.drawLine({
                        start: { x: margin + padding, y: currentYPosition },
                        end: { x: width - margin - padding, y: currentYPosition },
                        thickness: 1,
                        color: rgb(0.31, 0.3, 0.4),
                    });
                    currentYPosition -= 20;
                }
            }
            

            // Draw Student Details section
            drawSection('Student Details', () => {
                currentYPosition = drawTextWithWrap(page, `Student ID: ${studentData.studentId || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Student Name: ${studentData.studentName || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            }, 40);

            // Draw Scene Information section
            drawSection('Scene Information', () => {
                currentYPosition = drawTextWithWrap(page, `Incident Type: ${sceneInformation.incidentType || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Incident Comments: ${sceneInformation.incidentComments || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Address: ${sceneInformation.address || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Location Comments: ${sceneInformation.locationComments || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            });

            // Draw Patient Details section
            drawSection('Patient Details', () => {
                currentYPosition = drawTextWithWrap(page, `Title: ${patientData.title || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Name: ${patientData.firstName || ''} ${patientData.lastName || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Date of Birth: ${patientData.dateOfBirth || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Age: ${patientData.age || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Gender: ${patientData.gender || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Phone: ${patientData.phone || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Weight (kg): ${patientData.weight || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Address: ${patientData.address || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            });

            // Draw Paramedic Assessment section without header
            drawSection('', () => {  // Pass an empty string for the title
                const presentingComplaints = paramedicAssessment.complaints || [];
                const presentingComplaintsSubHeading = 'Presenting Complaints';

                // Check if we need a new page
                if (currentYPosition - 40 < margin + padding) {
                    page = createNewPage();
                    currentYPosition = height - margin - padding;
                }

                // Draw the subheading for presenting complaints
                page.drawText(presentingComplaintsSubHeading, {
                    x: margin + padding,
                    y: currentYPosition + 15, // Move up by 10px
                    size: fontSizeHeading,
                    font: helveticaFont,
                    color: rgb(0.31, 0.3, 0.4),
                });
                currentYPosition -= 10; // Adjust for subheading height + move up by 10px

                // Define a reduced space between complaints
                const complaintSpacing = 5; // Reduced spacing between complaints

                // Draw each presenting complaint
                presentingComplaints.forEach((complaint, index) => {
                    if (index > 0) {
                        // Check if we need a new page for each complaint
                        if (currentYPosition - 40 < margin + padding) {
                            page = createNewPage();
                            currentYPosition = height - margin - padding;
                        }
                    }

                    currentYPosition = drawTextWithWrap(page, `Complaint ${index + 1}: ${complaint.complaint || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Nature: ${complaint.nature || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Intensity: ${complaint.intensity || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Location: ${complaint.location || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Duration: ${complaint.duration || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Onset: ${complaint.onset || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Contributing Factors: ${complaint.contributing || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Aggravating Factors: ${complaint.aggravating || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Alleviating Factors: ${complaint.alleviating || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Frequency: ${complaint.frequency || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Impact: ${complaint.impact || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Attribute: ${complaint.attribute || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Treatment: ${complaint.treatment || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);

                    currentYPosition -= complaintSpacing; // Reduced space between complaints
                }, 0, false);  // Set 'includeTitle' to false to avoid drawing the header
            });


            // Draw multiple Vital Signs sections without the header
            drawSection('', () => {  // Pass an empty string for the title to omit the header
                const vitalSignsList = paramedicAssessment.vitalSignsList || [];
                vitalSignsList.forEach((vitalSigns, index) => {
                    if (index > 0) {
                        // Check if we need a new page for each vital signs entry
                        if (currentYPosition - 40 < margin + padding) {
                            page = createNewPage();
                            currentYPosition = height - margin - padding;
                        }
                    }

                    // Draw Vital Signs details without the header
                    currentYPosition = drawTextWithWrap(page, `Vital Signs #${index + 1}`, margin + padding, currentYPosition, timesRomanFont, fontSizeHeading, maxWidth, 20);
                    currentYPosition = drawTextWithWrap(page, `Time Assessed: ${vitalSigns.timeAssessed || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Pulse Rate: ${vitalSigns.pulseRate || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Blood Pressure: ${vitalSigns.bloodPressure || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `ECG: ${vitalSigns.electrocardiogram || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Respiratory Rate: ${vitalSigns.respiratoryRate || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Respiratory Rhythm: ${vitalSigns.respiratoryRhythm || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Respiratory Effort: ${vitalSigns.respiratoryEffort || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Oxygen Saturation: ${vitalSigns.oxygenSaturation || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Glasgow Coma Scale: E${vitalSigns.glasgowComaScale?.eyeOpening || ''} V${vitalSigns.glasgowComaScale?.verbalResponse || ''} M${vitalSigns.glasgowComaScale?.motorResponse || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `GCS Total: ${vitalSigns.gcsTotal || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Pupillary Response: ${vitalSigns.pupillaryResponse || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Temperature: ${vitalSigns.temperature || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Blood Glucose Level: ${vitalSigns.bloodGlucoseLevel || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition -= 20;
                });
            });

            // Draw Histories section
            drawSection('Histories', () => {
                const histories = paramedicAssessment.histories[0] || {};
                currentYPosition = drawTextWithWrap(page, `Illnesses: ${histories.illnesses || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Vaccinations Status: ${histories.vaccinations_status || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Vaccinations: ${histories.vaccinations || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Medications: ${histories.medications || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Operations: ${histories.operations || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Hospital Visits: ${histories.hospitalVisits || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Allergies: ${histories.allergies || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                currentYPosition = drawTextWithWrap(page, `Adverse Drug Reactions: ${histories.adverseDrugReactions || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
            });

            // Draw Management Form section without header and lines
            drawSection('', () => {
                const managementList = managementFormData.management || [];
                managementList.forEach((management, index) => {
                    if (index > 0) {
                        if (currentYPosition - 40 < margin + padding) {
                            page = createNewPage();
                            currentYPosition = height - margin - padding;
                        }
                    }

                    currentYPosition = drawTextWithWrap(page, `Management Form #${index + 1}`, margin + padding, currentYPosition, timesRomanFont, fontSizeHeading, maxWidth, 20);
                    currentYPosition = drawTextWithWrap(page, `Time: ${management.time || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Description: ${management.description || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition -= 20;
                });
            }, 0, false, false);  // Set 'includeTitle' to false to omit the header and lines


            // Draw Management Form section without header and lines
            drawSection('', () => {
                const managementList = managementFormData.management || [];
                managementList.forEach((management, index) => {
                    if (index > 0) {
                        if (currentYPosition - 40 < margin + padding) {
                            page = createNewPage();
                            currentYPosition = height - margin - padding;
                        }
                    }

                    currentYPosition = drawTextWithWrap(page, `Management Form #${index + 1}`, margin + padding, currentYPosition, timesRomanFont, fontSizeHeading, maxWidth, 20);
                    currentYPosition = drawTextWithWrap(page, `Time: ${management.time || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Description: ${management.description || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition -= 20;
                });
            }, 0, false, false);


            // Draw Drug Therapy section without the header
            drawSection('', () => {  // Pass an empty string for the title to omit the header
                const drugTherapyList = managementFormData.drugTherapy || [];
                drugTherapyList.forEach((therapy, index) => {
                    if (index > 0) {
                        // Check if we need a new page for each therapy entry
                        if (currentYPosition - 40 < margin + padding) {
                            page = createNewPage();
                            currentYPosition = height - margin - padding;
                        }
                    }

                    // Draw Drug Therapy details without the header
                    currentYPosition = drawTextWithWrap(page, `Drug Therapy #${index + 1}`, margin + padding, currentYPosition, timesRomanFont, fontSizeHeading, maxWidth, 20);
                    currentYPosition = drawTextWithWrap(page, `Time of Administration: ${therapy.timeOfAdmin || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Drug Name: ${therapy.drugName || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Drug Dose: ${therapy.drugDose || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Route of Administration: ${therapy.routeAdministration || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition -= 20;
                });
            });

            // Draw Other Management section without the header
            drawSection('', () => {  // Pass an empty string for the title to omit the header
                const otherManagementList = managementFormData.otherManagement || [];
                otherManagementList.forEach((management, index) => {
                    if (index > 0) {
                        // Check if we need a new page for each management entry
                        if (currentYPosition - 40 < margin + padding) {
                            page = createNewPage();
                            currentYPosition = height - margin - padding;
                        }
                    }

                    // Draw Other Management details without the header
                    currentYPosition = drawTextWithWrap(page, `Other Management #${index + 1}`, margin + padding, currentYPosition, timesRomanFont, fontSizeHeading, maxWidth, 20);
                    currentYPosition = drawTextWithWrap(page, `Time of Management: ${management.timeOfManagement || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition = drawTextWithWrap(page, `Management Given: ${management.managementGiven || ''}`, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition -= 20;
                });
            });
      
            // Draw Case Narrative section with a header
            drawSection('', () => {
                // Define case narrative content
                const narrativeContent = caseNarrativeContent || '';

                // Check if space is needed for the case narrative
                if (currentYPosition - 40 < margin + padding) {
                    page = createNewPage();
                    currentYPosition = height - margin - padding;
                }

                    // Draw Case Narrative header
                    currentYPosition = drawTextWithWrap(page, 'Case Narrativei', margin + padding, currentYPosition, timesRomanFont, fontSizeHeading, maxWidth, 20);
                    currentYPosition = drawTextWithWrap(page, narrativeContent, margin + padding, currentYPosition, timesRomanFont, fontSizeField, maxWidth, 15);
                    currentYPosition -= 20;
            });

            // Add page numbers
            const totalPages = pdfDoc.getPageCount();
            pdfDoc.getPages().forEach((page, index) => {
                const { width, height } = page.getSize();
                page.drawText(`Page ${index + 1} of ${totalPages}`, {
                    x: width - margin - 50, // Adjust x position as needed
                    y: margin, // Adjust y position as needed
                    size: fontSizeFooter,
                    font: helveticaFont,
                    color: rgb(0.31, 0.3, 0.4),
                });
            });

            const pdfBytes = await pdfDoc.save();
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${studentData.studentId || 'unknown'}_${studentData.studentName || 'unknown'}_${patientData.lastName || 'unknown'}.pdf`;
            link.click();
            URL.revokeObjectURL(pdfUrl);
        }

        await createPdf();
    });
});

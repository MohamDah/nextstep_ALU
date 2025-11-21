// utils/generateCertificate.js

export const generateCertificate = async ({
    learnerName,
    courseTitle,
    dateCompleted,
    instructorName,
    certificateTemplateUrl = "/certificateTemplate.png",
}: {
    learnerName: string
    courseTitle: string
    dateCompleted: string
    instructorName: string
    certificateTemplateUrl?: string
}) => {
    return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = certificateTemplateUrl;

        img.onload = () => {
            // Create a temporary canvas element (not appended to the DOM)
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            // Set canvas dimensions to match the image
            canvas.width = img.width;
            canvas.height = img.height;

            // 2. Draw the base image onto the canvas
            ctx.drawImage(img, 0, 0);

            // 3. Set text styles and add dynamic text
            ctx.fillStyle = '#333'; // Dark gray text color

            // Learner Name
            ctx.font = '500 22px cursive';
            ctx.textAlign = 'center';
            ctx.fillText(learnerName, canvas.width / 2, 445); // Adjust Y-coordinate as needed

            // Course Title
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(courseTitle, canvas.width / 2, 502); // Adjust Y-coordinate

            // Date of Completion
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(dateCompleted, canvas.width / 2, 565); // Adjust Y-coordinate

            // Instructor Name (left-aligned or specific position)
            ctx.font = 'italic 20px cursive';
            ctx.textAlign = 'center';
            ctx.fillText(`Mr/Ms.${instructorName}`, 468, 635); // Adjust X and Y as needed

            // Instructor Name (left-aligned or specific position)
            ctx.font = '18px Arial';
            ctx.textAlign = 'left';
            const currentDate = new Date().toISOString().split('T')[0];
            ctx.fillText(currentDate, 680, 635); // Adjust X and Y as needed
            try {
                const dataURL = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = `${learnerName}_${courseTitle}_Certificate.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                resolve();
            } catch (err) {
                console.error("Error generating or downloading certificate:", err);
                reject(new Error("Failed to generate or download certificate."));
            }
        };

        img.onerror = (e) => {
            console.error("Failed to load certificate template image:", e);
            reject(new Error("Error: Could not load the certificate template image."));
        };
    });
};
async function getVideo() {
    try {
        let response = await fetch('/upload');
        console.log("Response:", response);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let parsedResponse = await response.json();
        console.log("Parsed Response:", parsedResponse);

        let parsedResponseData = parsedResponse.data;
        console.log("Parsed Response Data:", parsedResponseData);

        let dataContainer = document.getElementById("datacontainer");

        // Initialize an empty string to hold rows
        let rows = '';

        // Loop through the parsed response data
        for (let i = 0; i < parsedResponseData.length; i++) {
            const videoSrc = parsedResponseData[i].video.filename || ''; // Ensure there's a valid filename
            
            rows += `
                <div class="container d-flex-row lh-lg pb-3 pt-3">
                    ${videoSrc ? `
                        <video controls src="${videoSrc}" style="max-width: 100%; height: auto;"></video>
                    ` : '<p>Video source is not available.</p>'}
                </div>
            `;
        }

        // Update the inner HTML of the data container
        dataContainer.innerHTML = rows;

    } catch (error) {
        console.log("Error:", error);
        const dataContainer = document.getElementById("datacontainer");
        dataContainer.innerHTML = '<p>Error loading videos. Please try again later.</p>';
    }
}

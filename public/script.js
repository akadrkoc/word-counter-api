// Frontend JavaScript to send text to backend and display results

document.getElementById('submitBtn').addEventListener('click', async () => {
    const text = document.getElementById('inputText').value;

    if (!text.trim()) {
        alert("Please enter some text.");
        return;
    }

    try {
        const response = await fetch('/count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        // Display result to the user
        document.getElementById('result').innerHTML = `
            <p><strong>Word Count:</strong> ${data.wordCount}</p>
            <p><strong>Character Count:</strong> ${data.charCount}</p>
            <p><strong>Characters (No Spaces):</strong> ${data.charCountWithoutSpaces}</p>
        `;
    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong!");
    }
});

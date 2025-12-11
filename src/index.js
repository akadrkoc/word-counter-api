const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.static('public'));

/**
 * POST /count
 * Request body: { "text": "some text here" }
 * Response: {
 *   "wordCount": number,
 *   "charCount": number,
 *   "charCountWithoutSpaces": number
 * }
 */
app.post('/count', (req, res) => {
    // Validate request body
    const { text } = req.body;

    if (typeof text !== 'string') {
        // If the text is missing or not a string, return 400 Bad Request
        return res.status(400).json({
            error: 'Invalid request body. "text" field is required and must be a string.'
        });
    }

    // Trim text to remove extra spaces at the beginning and end
    const trimmedText = text.trim();

    // Calculate character count (including spaces)
    const charCount = trimmedText.length;

    // Calculate character count without spaces
    const charCountWithoutSpaces = trimmedText.replace(/\s+/g, '').length;

    // Calculate word count
    // Split by one or more whitespace characters (space, tab, newline)
    const words = trimmedText.length > 0 ? trimmedText.split(/\s+/) : [];
    const wordCount = words.length;

    // Send response as JSON
    return res.json({
        text,
        wordCount,
        charCount,
        charCountWithoutSpaces
    });
});

// Simple health check endpoint
app.get('/', (req, res) => {
    res.send('Word Counter API is running 🚀');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

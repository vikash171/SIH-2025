// Gemini API JavaScript implementation
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

async function callGeminiAPI(prompt) {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  return data;
}

// Example usage
// callGeminiAPI("Explain how AI works in a few words")
//   .then(result => console.log(result))
//   .catch(error => console.error('Error:', error));

export { callGeminiAPI };
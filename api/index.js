const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express();
// const port = 3000;
dotenv.config();
// app.use(express.json());


app.use(cors());
// app.use(cors({
//   origin: "",
//   credentials: true
// }));

const summarizeText = require('../summarize.js');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
// app.use(express.static('public'));
// Handle POST requests to the '/summarize' endpoint


app.post('/api/summarize', (req, res) => {
 // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

 // call your summarizeText function, passing in the text from the request
  summarizeText(text) 
    .then(response => {
      //  res.send(response); // Send the summary text as a response to the client
      res.json({ summary_text: response });

    })
    .catch(error => {
      console.log(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });

module.exports = app;

//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/covid-mashup'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/covid-mashup/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

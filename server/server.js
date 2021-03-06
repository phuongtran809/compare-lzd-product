import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import request from 'request';

function checkUrl(url) {
    const urlRegex = /^((http[s]?):\/)?\/?www\.lazada\.vn\/[\-\w\.]+$/;
    return urlRegex.test(url);
}

// Initialize the Express App
const app = new Express();
app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use(Express.static('client/build'));
}

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(Express.static(path.resolve(__dirname, '../dist')));

app.get('/api', (req, res) => {
    const url = req.query.url;
    if (!checkUrl(url)) {
        res.status(400).json({ code: 400, message: 'Invalid url' });
        return;
    }
    request(url, (error, response, html) => {
        if (error) {
            res.status(400).json({ code: 400, message: 'Fetch error' });
            return;
        }
        res.send(html);
    });
});

app.listen(3001, (error) => {
    if (!error) {
        console.log(`Find the server at: http://localhost:3001/`); // eslint-disable-line no-console
    }
});

export default app;

const http = require('http'); // Import the http module

// Create the server
const server = http.createServer((req, res) => {
    const chunks = []; // Array to store incoming data

    // Listen for data chunks
    req.on('data', (chunk) => {
        chunks.push(chunk); // Collect chunks of the request body
    });

    // Listen for the end of the data stream
    req.on('end', () => {
        const body = Buffer.concat(chunks).toString(); // Concatenate chunks into a string
        let responseContent;

        // Handle different routes
        if (req.url === '/' && req.method === 'GET') {
            // Home route
            res.writeHead(200, { 'Content-Type': 'text/html' });
            responseContent = '<h1>Welcome to My Server!</h1>';
        } else if (req.url === '/about' && req.method === 'GET') {
            // About route
            res.writeHead(200, { 'Content-Type': 'application/json' });
            responseContent = JSON.stringify({
                name: 'Your Name',
                description: 'I am learning Node.js!',
            });
        } else if (req.url === '/echo' && req.method === 'POST') {
            // Echo route
            res.writeHead(200, { 'Content-Type': 'application/json' });
            responseContent = JSON.stringify({
                method: req.method,
                url: req.url,
                body: body ? JSON.parse(body) : null,
            });
        } else {
            // Handle 404 - Not Found
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            responseContent = '404 Not Found';
        }

        res.end(responseContent); // Send the response
    });
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
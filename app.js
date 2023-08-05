let http_module = require('http');
let url_module = require('url');
let fs_module = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const view_path = './src/pages';
const view_error_path = view_path + '/errors';

const page_404 = '/404.html';
const page_500 = '/500.html';

// Creta the server. For client side operations
const server = http_module.createServer((req, res) => {
    
    let url = url_module.parse(req.url, true); // eg:- http://localhost:8080/default.html?year=2017&month=february
    let host = url.host; //returns 'localhost:8080'
    let pathname = url.pathname; //returns '/default.html'
    let search = url.search; //returns '?year=2017&month=february'
    let query = url.query; //returns an object: { year: 2017, month: 'february' }

    let filename = view_path + pathname; //returns './default.html'

    // 404 error page
    let output_404 = '404 error';
    
    fs_module.readFile(view_error_path + page_404, function (view_err_404, view_data_404) {
        if (view_err_404) { // 404 view file not found
            return res.end(output_404);
        }
        output_404 = view_data_404;
            
        // View handler
        fs_module.readFile(filename, function (view_err, view_data) {

            // 404 error handler
            if (view_err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end(output_404);
            } 
                
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(view_data);
            return res.end();

        });

    });

});

// The server object listens to the port.
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/\n\nType Ctrl+C to stop the server`);
});
var http = require('http');
// const url = require('url');

function createServer(port) {
    var server = http.createServer(function onRequest(req, res) {
        if (req.url === '/home' || req.url === '/home/') {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
            res.write('<h1> "Welcome to the Home Page" </h1>');
            res.end();
        } else if (req.url === '/getData' || req.url === '/getData/') {
            res.setHeader('Content-Type', 'application/json');
            var obj = {
                'name': 'Lucas',
                'class': 'CS100000',
                'profession': 'Cookie Eater'
            };
            res.end(JSON.stringify(obj));
        } else if (req.url.includes('addUp')) {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });

            console.log(req.body);
            // const search_params = current_url.searchParams;
            // if (search_params.has('num1')){ 
            //     var num1 = search_params.get('num1');
            // }
            
            res.write('<h1> "Welcome to the Home Page" </h1>');
            res.end();
         }else  {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
            res.write('<h1> 404 - NOT FOUND - TRY AGAIN - NOT TODAY - DID NOT WORK - FOR SURE </h1>');
            res.end();
        }

    })
    server.listen(port);
}
createServer("8000");
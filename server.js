var static = require('node-static');

var port = 80;

var file = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(port, function() {
    console.log('Server started on port: ' + port);
});

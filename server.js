var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.env.PORT || 8888;//process.argv[2]

var server = http.createServer(function (request, response) {
    var parseUrl = url.parse(request.url, true);
    var path = request.url;
    var query = '';

    var pathNoQuery = parseUrl.pathname;
    var queryObject = parseUrl.query;
    var method = request.method;

    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf-8');
        var db = fs.readFileSync('./db.txt', 'utf-8');
        string = string.replace('&&&money', db);
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(string);
        response.end();
    } else if (pathNoQuery === '/pay') {
        var db = fs.readFileSync('./db.txt', 'utf-8');
        var newDb = db - 1;
        fs.writeFileSync('./db.txt', newDb);
        response.setHeader('Content-Type', 'application/javascript');
        response.statusCode = 200;
        response.write(`${queryObject.callback}.call(undefined,'success')`);
        response.end();
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write('没有找到文件，请检查请求路径');
        response.end();
    }
})
server.listen(port);
console.log('监听' + port + '成功\n 可以打开http://localhost:' + port); 
var PORT = 8888;

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};
var path = require('path');
var os = require('os');
var IPv4,hostName;
hostName=os.hostname();
for(var i=0;i<os.networkInterfaces().en0.length;i++){
  if(os.networkInterfaces().en0[i].family=='IPv4'){
    IPv4=os.networkInterfaces().en0[i].address;
  }
}
console.log('----------local IP: '+IPv4);
console.log('----------local host: '+hostName);
var server = http.createServer(function (request, response) {
  var pathname = __dirname+url.parse(request.url).pathname;
  var realPath = path.join("", pathname);
  console.log(realPath);
  var ext = path.extname(realPath);
  ext = ext ? ext.slice(1) : 'unknown';
  fs.exists(realPath, function (exists) {
      if (!exists) {
          response.writeHead(404, {
            'Content-Type': 'text/plain'
          });

          response.write("This request URL " + pathname + " was not found on this server.");
          response.end();
      } else {
          fs.readFile(realPath, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                  'Content-Type': 'text/plain'
                });
                response.end(err);
            } else {
                var contentType = mine[ext] || "text/plain";
                response.writeHead(200, {
                  'Content-Type': contentType
                });
                response.write(file, "binary");
                response.end();
            }
          });
      }
  });
});
server.listen(PORT, IPv4);
console.log("Server runing at port: " + PORT + ".");

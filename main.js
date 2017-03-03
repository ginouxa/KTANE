
var http = require('http');

var server = http.createServer(function(req, res) {
res.writeHead(200, {"Content-Type": "text/html"});
res.write('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Ma page Node.js !</title>'+
'    </head>'+ 
'    <body>'+
'     	<label id="Compte">qqchose</label>'+   
'    </body>'+
'</html>');
res.end();
});
// test du serial port 
var serialport = require('serialport');

// list serial ports:
serialport.list(function (err, ports) {
ports.forEach(function(port) {
console.log(port.comName);
});
});

var portName = '/dev/ttyACM0';
var sp = new serialport(portName, {
baudRate: 9600,
dataBits: 8,
parity: 'none',
stopBits: 1,
flowControl: false,
parser: serialport.parsers.readline("\r\n")
});

sp.on('data', function(input) {
console.log(input);
});

server.listen(8080);
function serialListener()
{
    var receivedData = "";
    serialPort = new SerialPort(portName, {
        baudrate: 9600,
        // defaults for Arduino serial communication
         dataBits: 8, 
         parity: 'none', 
         stopBits: 1, 
         flowControl: false 
    });

    serialPort.on("open", function () {
      console.log('open serial communication');
     // Listens to incoming data
        serialPort.on('data', function(data) { 
             receivedData += data.toString();
              if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
//          save the data between 'B' and 'E'
               sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
               receivedData = '';
         }
     // send the incoming data to browser with websockets.
       socketServer.emit('update', sendData);
      });  
    });  
}
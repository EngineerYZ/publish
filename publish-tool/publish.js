const http = require('http');
const querystring = require('querystring');
const {fstat} = require('fs');
const fs = require('fs');
const archiver = require('archiver');

const postData = querystring.stringify({
    'msg': 'Hello World! 123'
});

let filename =  "./cat1.jpg";
let packname =  "./package";
//fs.stat(filename,(err,stat)=>{
    //console.log(stat.size);
    const options = {
        host: 'localhost',
        port: 8081,
        path: '/?filename=package.zip',
        method:'POST',
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    };

const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

archive.directory(packname,false);



archive.finalize();

    //Make a request
    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    archive.pipe(req);
    archive.on('end',()=>{
        req.end()
    });
// Write data to request body
//     let readStream = fs.createReadStream('./pa.jpg');
//     readStream.pipe(req);
//     readStream.on('end',()=>{
//         req.end()
//     })
    //req.write(postData);

//});

var fs = require('fs');
var path = require('path');
var readline = require('readline');
var crypto = require('crypto');

var currentDir = __dirname;

var findHTMLFiles = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, files) {
    if (err) {
      return done(err);
    }
    var pending = files.length;
    if (!pending) {
      return done(null, results);
    }
    files.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory() && file.indexOf('_site') === -1) {
          findHTMLFiles(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) {
              done(null, results);
            }
          });
        } else {
          if (file.indexOf('.html') !== -1) {
            results.push(file);
          }
          if (!--pending) {
            done(null, results);
          }
        }
      });
    });
  });
}

findHTMLFiles(currentDir, function (err, results) {
  if (err) {
    throw err;
  }

  results.forEach(function (file) {
    var tempFilePath = 'foo' + crypto.randomBytes(4).readUInt32LE(0) + 'bar.html';
    var tempFileWriteStream = fs.createWriteStream(tempFilePath);

    var filePath = path.resolve(file);
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });
    lineReader.on('line', function (line) {
      var trimmedLine = line.trim();
      if (trimmedLine.length > 3 && trimmedLine.indexOf('---') !== -1) {
        var splitLines = trimmedLine.split(' ');
        tempFileWriteStream.write(splitLines[0] + '\n');
        for (var i = 1; i < splitLines.length; i += 2) {
          if (splitLines[i].indexOf('---') !== -1) {
            break;
          }
          tempFileWriteStream.write(splitLines[i] + ' ' + splitLines[i + 1] + '\n');
        }
        tempFileWriteStream.write(splitLines[splitLines.length - 1] + '\n');
      } else {
        tempFileWriteStream.write(line + '\n');
      }
    });
    lineReader.on('close', function () {
      tempFileWriteStream.end();
      fs.unlink(filePath, function (err) {
        if (err) {
          console.log(err);
        }

        var writeStream = fs.createReadStream(tempFilePath).pipe(fs.createWriteStream(filePath));
        writeStream.on('finish', function () {
          fs.unlink(tempFilePath, function (err) {
            if (err) {
              console.log(err);
            }
          });
        });
      });
    });
  });
});
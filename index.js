const fs = require('fs');
const path = require('path');
const [fromPath, toPath] = require('./path.json');

function dateToFileName(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day < 10 ? '0' + day.toString() : 
              day.toString()}.${month < 10 ? '0' + 
              month.toString() : 
              month.toString()}.${year.toString()}.txt`
}

fs.watch(fromPath, (eventType, filename) => {
    try {
        if (filename && filename !== 'Common.txt') {
            if (/copy/i.exec(filename) && 
                /([0-9]{1,2}\.){2}[0-9]{1,4}/i.exec(filename)
            ) {
                const today = new Date();
                const newFileName = dateToFileName(today);
                
                if (!fs.existsSync(path.join(fromPath, newFileName)) &&
                    fs.existsSync(fromPath, filename)
                ) {
                    fs.rename(
                        path.join(fromPath, filename), 
                        path.join(fromPath, newFileName), 
                        () => {
                            console.log(`File renamed`);
                        }
                    );
                }
            } else {
                fs.readdir(fromPath, (err, files) => {
                    let allData = '';
                    files.forEach(file => {
                        if (file !== 'Common.txt') {
                            const filePath = path.join(fromPath, file);
                            allData += fs.readFileSync(filePath);
                        }
                    });
                    const commonFilePath = path.join(toPath, 'Common.txt');
                    fs.writeFileSync(commonFilePath, allData);
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
});
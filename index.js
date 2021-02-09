const fs = require('fs');
const [fromPath, toPath] = require('./path.json'); 

// Old version (there is one big problem: if you save the file twice, you will have a repetition)
// fs.watch(path, (eventType, filename) => {
//     if (filename && filename !== 'Common.txt' && !/copy/i.exec(filename)) {
//         try {
//             if (eventType === 'change') {
//                 const changedFilePath = `${path}${filename}`; 
//                 const data = fs.readFileSync(changedFilePath);
//                 const commonFilePath = `${path}Common.txt`;
//                 fs.appendFileSync(commonFilePath, data);
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     }
//   });

// In new version fixed previous trouble
fs.watch(fromPath, (eventType, filename) => {
    try {
        if (filename && filename !== 'Common.txt' && !/copy/i.exec(filename)) {
            fs.readdir(fromPath, (err, files) => {
                let allData = '';
                files.forEach(file => {
                    if (file !== 'Common.txt') {
                        const filePath = `${fromPath}${file}`;
                        allData += fs.readFileSync(filePath);
                    }
                });
                const commonFilePath = `${toPath}Common.txt`;
                fs.writeFileSync(commonFilePath, allData);
            });
        }
    } catch (e) {
        console.log(e);
    }
  });
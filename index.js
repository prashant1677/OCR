const express = require('express');
const tesseract = require("node-tesseract-ocr");
const app = express();
// const docx = require("docx");
// const { Document, Packer, Paragraph, TextRun } = docx;
const port = 3000;
const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
};

const fs = require('fs');

app.get('/', (req, res) => {

    // let img = ["./asset/IMG_8204.jpeg","./asset/IMG_0196.jpeg"];         //array of iamges
    // let img = fs.readFile('./asset/' + file);                       //
    // const img = "https://tesseract.projectnaptha.com/img/eng_bw.png";  //images from link

    const testFolder = './asset/';
    // var text = "first";
    fs.readdir(testFolder, (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log("\nCurrent directory filenames:", files);
            files.forEach(file => {
                console.log("Step 1 = " + file);
                var fl = testFolder + file;
                tesseract
                    .recognize(fl, config)
                    .then((txt) => {
                        console.log("Result:", txt);
                        fs.writeFile('./output/' + file.split(".")[0] + ".docx", txt, function (err) {
                            if (err) return console.error(err);
                        });
     
                    })
                    .catch((error) => {
                        console.log(error.message)
                    })
            });
            res.send("Task Finished");
        }

    });

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});


/*
    Used to export the file into a .docx file

    .forEach(async (file) => {
        let img = fs.readFileSync('./asset/' + file);
        console.log(file);

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                // new TextRun("Hello World"),
                                new TextRun({
                                    text:"some text",
                                    font:"Aerial",
                                    size:26
                                })
                            ],
                        }),
                    ],
                }],
            });

            Packer.toBuffer(doc).then((buffer) => {
                // console.log(buffer);
                fs.writeFileSync(file.split(".")[0] + ".docx", buffer);
                // res.send(doc);
            });

    Done! A file will be downloaded in your file system.
*/
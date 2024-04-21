const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pdfkit = require("pdfkit");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/submit-form", (req, res) => {
  const formData = req.body;

  const doc = new pdfkit();
  const filePath = `${__dirname}/form.pdf`;

  const fileStream = fs.createWriteStream(filePath);
  doc.pipe(fileStream);

  doc.fontSize(15).text("Application Form", {
    align: "center",
    width: 410,
  });

  const marginTop = 50;

  doc.fontSize(12).text(`Name: ${formData.name}`, { marginTop });
  doc.fontSize(12).text(`Email: ${formData.email}`, { marginTop });
  doc.fontSize(12).text(`Title: ${formData.title}`, { marginTop });
  doc.fontSize(12).text(`Description: ${formData.description}`, { marginTop });

  doc.fontSize(12).text("Skills : "), { marginTop };
  doc.list(formData.skills.map((skill) => `${skill}`, { marginTop }));

  doc.end();

  fileStream.on("finish", () => {
    res.download(filePath, "Application_form.pdf", (err) => {
      if (err) {
        console.error("Error downloading PDF:", err);
        res.status(500).send("Error downloading PDF");
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting PDF file:", err);
        }
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

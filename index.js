import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
const port = process.env.PORT; //|| "3000"

// app.use(express.static("dist"));
app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: [process.env.BASE_URL],
//     methods: ["POST","GET"],
//     credentials: true,
//   })
// );

app.post("/", (req, res) => {
  console.log(req.body)
  res.send("hello")
});

// app.post("/contact", (req, res) => {
//   // res.send(req.body);
//   updateEntrySheets(req.body);
// });

async function updateEntrySheets(formData) {
  // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: process.env.PRIVATE_EMAIL,
    key: process.env.PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.SPREADSHEET_ID,
    serviceAccountAuth
  );

  await doc.loadInfo(); // loads document properties and worksheets
  // console.log(doc.title);
  // await doc.updateProperties({ title: "renamed doc" });

  const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  // console.log(sheet.title);
  // console.log(sheet.rowCount);

  await sheet.addRow(formData);

  // console.log(response)
}

app.listen(port, () => console.log(`Running at port ${port}`));

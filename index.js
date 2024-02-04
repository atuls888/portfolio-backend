import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
const port = process.env.PORT || "3000"; //

app.use(bodyParser.json());


app.post("/", (req, res) => {
  updateEntrySheets(req.body);
  res.send('sucessfull')
});

async function updateEntrySheets(formData) {

  const serviceAccountAuth = new JWT({

    email: process.env.PRIVATE_EMAIL,
    key: process.env.PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.SPREADSHEET_ID,
    serviceAccountAuth
  );

   await doc.loadInfo(); 

  // const sheet = doc.sheetsByIndex[0]; 


  // await sheet.addRow(formData);

  // console.log(response)
}

app.listen(port, () => console.log(`Running at port ${port}`));

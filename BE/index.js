import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";
import db from "./src/config/db/db.js";
import routes from "./src/routes/index.js";
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({ credentials: true, origin: /* " */['http://127.0.0.1:5173', 'http://localhost:3000'] }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser())
app.use(cookieParser())
// app.use(cookieParser())
// app.use(fileUpload({
//     createParentPath: true
// }));

//
app.use(express.static('public'));
//
db.connect()
app.use(morgan('combined'))
routes(app)
app.listen(PORT, () => {
    console.log('listen port' + PORT)
})


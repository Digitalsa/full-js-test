import express from 'express';
import cors from "cors";
import routes from "./routes";

const api = express();
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.use(express.static('dist/public'));

api.use(cors());

api.use(routes);

api.listen(3030, function () {
    console.log("Servidor esta ouvindo na porta 3030")
})
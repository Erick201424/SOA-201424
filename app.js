import express from "express";
import cors from "cors";

import { api } from "./config/config.js";
import swaggerDocs from "./config/swagger.config.js";

import user from "./routes/user.routes.js"
import task from "./routes/task.routes.js"

const app = express();

app.use(cors());

app.use(express.json());

//routes
app.use("/api/user", user);
app.use("/api/task", task);

app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});
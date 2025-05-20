"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import publiRoutes from "../src/publics/public.routes.js";
import filtrarRoutes from "../src/publics/public.routes.js";
import commentRoutes from "../src/comments/comment.routes.js";
import { swaggerDocs, swaggerUi } from "./sawgger.js";


const configs = (app) => {
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) => {
    app.use("/blogAprende/v1/public", publiRoutes)
    app.use("/blogAprende/v1/filtrar", filtrarRoutes);
    app.use("/blogAprende/v1/comment", commentRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

}

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try {
        configs(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    } catch (err) {
        console.error("Server init failed:", err);
    }
}
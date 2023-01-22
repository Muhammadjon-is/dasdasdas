import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import { badRequestHandler, genericErrorHandler, notFoundHandler } from "./ErrorHandler.js"
import MarketPlace from "./marketPlace/index.js"
import cors from "cors"

const app = express()

const port = process.env.PORT || 3002
app.use(cors())
app.use(express.json())
app.use("/market", MarketPlace )

app.use(badRequestHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

mongoose.connect(process.env.MONGOURL)

mongoose.connection.on("Connected", () => {
    console.log("Mongo connected");
    app.listen(port, () => {
        console.table(listEndpoints(app))
        console.log("App running on ", port);
    })
})




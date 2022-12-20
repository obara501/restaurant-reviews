/*---------------------CONNECT TO SERVER------------------------*/

//Import statements.
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"

//Load environment variabled form .env
dotenv.config()
const MongoClient = mongodb.MongoClient

//Declare port as specified in .env
const port = process.env.PORT || 8000

//Create connection to MongoDB lient
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,{
        maxPoolSize: 50,//maximum connections at a time.
        waitQueueTimeoutMS: 2500,//timeout
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})

//Inject 
.then(async client =>{
    await RestaurantsDAO.injectDB(client)
    app.listen(port,() =>{
        console.log('listening on port '+port)
    })
})


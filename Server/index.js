import  express  from "express";

import cors from 'cors';
import { connectDb } from "./config/db.js";
import { adminLogin, registerAdmin } from "./Controller/AdminController.js";
import { AddDesitnation, deleteDestinationById, getAllDestination, getDestinationById, UpdateDestination } from "./Controller/DestinationController.js";
import { Login, registerUser} from "./Controller/UserController.js";
import { BookTrip, MyTrip } from "./Controller/TripsController.js";
import { addDestinationImages, getDestinationImages } from "./Controller/DestinationImageController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/AddDestination",AddDesitnation);
app.post("/AddDestination/images",addDestinationImages);



app.get("/getDestination",getAllDestination);
app.get("/getDestination/images",getDestinationImages);

app.get("/getDestinationById/:id",getDestinationById);
app.delete("/DeleteDestinationById/:id",deleteDestinationById);
app.put("/UpdateDestination/:id",UpdateDestination);

app.post("/bookMyTrip/:id",BookTrip);
app.get("/MyTrip/:id",MyTrip);

app.post("/UserRegistration",registerUser);
app.post("/login",Login);

// app.post("/admins", registerAdmin);
// app.post("/admins/login", adminLogin);

app.listen(7500,()=>{
connectDb();
})


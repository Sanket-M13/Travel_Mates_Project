
import { createConnection } from "mysql2/promise";

let connection = null;
export async function connectDb() {
    try {
      connection = await createConnection({
         host: 'localhost',
          user: 'root',
          password: 'cdac',
          port: 3306,
          database: 'travelmates'
      });
      console.log("Database Connected");
      
    } catch (error) {
        console.log("Error in db Connection");
        console.log(error);
    }
}

export function getConnectionObject(){
    return connection;
}





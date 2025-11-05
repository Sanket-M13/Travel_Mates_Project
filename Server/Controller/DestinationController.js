import { getConnectionObject } from "../config/db.js";

export async function AddDesitnation(request, response) {
  try {
    const connection = getConnectionObject();
    const { destination_name, description, Travel_mode, Imgpath, country } = request.body;

    const qry = `INSERT INTO destination(destination_name, description, Travel_mode, Imgpath, country)
                 VALUES ('${destination_name}', '${description}', '${Travel_mode}', '${Imgpath}', '${country}')`;

    const [resultSet] = await connection.query(qry);
    
    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Destination added successfully" });
    } else {
      response.status(400).send({ message: "Failed to add destination" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


export async function getAllDestination(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM destination`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function getDestinationById(request, response){
    try {
        const connection = getConnectionObject();
        // const {dest_id} = request.params.id;
        const qry = `SELECT * FROM destination where dest_id=${request.params.id}`;
        const [rows] = await connection.query(qry);
        // response.status(200).send(rows);
        if(rows.length === 0){
            response.status(404).send({message:'Destination not found'});
        }
        else{
            response.status(200).send(rows[0]);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function deleteDestinationById(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM destination WHERE dest_id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'destination Deleted'});
        }
        else{
            response.status(404).send({message:'destination not found'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}






import { getConnectionObject } from "../config/db.js";

export async function BookTrip(req ,res) {
     try {
        const connection = getConnectionObject();
        const { source, start_date, end_date, No_of_Person, Mode, Budget, dest_id } = req.body;
        const userId = req.params.id;

        const [destResult] = await connection.query(
            `SELECT destination_name, Price FROM destination WHERE dest_id = ${dest_id}`
        );

        if (destResult.length === 0) {
            return res.status(404).send({ message: "Destination not found" });
        }

        const destinationName = destResult[0].destination_name;

         const cleanPrice = destResult[0].Price.replace(/[^0-9.]/g, "");
        const totalBudget = parseFloat(cleanPrice) * Number(No_of_Person);
        
        // const totalBudget = Budget * No_of_Person;

        const qry = `
            INSERT INTO trip (source, destination, start_date, end_date, No_of_Person, Mode, Budget, id, dest_id)
            VALUES ('${source}', '${destinationName}', '${start_date}', '${end_date}', ${No_of_Person}, '${Mode}', ${totalBudget}, ${userId}, ${dest_id})
        `;

        const [result] = await connection.query(qry);

        if (result.affectedRows === 1) {
            res.status(200).send({
                message: `Trip to ${destinationName} booked successfully!`,
                totalBudget: totalBudget
            });
        } else {
            res.status(500).send({ message: "Failed to book trip" });
        }

    } catch (error) {
        console.error("Book Trip Error:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
}

export async function MyTrip(req,res){
    try {
        const connection = getConnectionObject();
        const userId = req.params.id;

        const qry = `
    SELECT 
        t.trip_id, 
        t.source, 
        t.destination, 
        t.start_date, 
        t.end_date, 
        t.No_of_Person, 
        t.Mode, 
        t.Budget, 
        d.destination_name, 
        d.Imgpath,
        u.name AS user_name
    FROM trip t
    JOIN destination d ON t.dest_id = d.dest_id
    JOIN users u ON t.id = u.id
    WHERE t.id = ${userId}
`;

        const [rows] = await connection.query(qry);
        res.status(200).send(rows);

    } catch (error) {
        console.error("Fetch My Trips Error:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
}



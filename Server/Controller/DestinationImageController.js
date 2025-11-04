import { getConnectionObject } from "../config/db.js";

export async function addDestinationImages(req, res) {
    try {
        const connection = getConnectionObject();
        const { dest_id, img_paths } = req.body; 

        if (!dest_id || !img_paths || !Array.isArray(img_paths)) {
            return res.status(400).send({ message: "Invalid input format" });
        }

        const insertQueries = img_paths.map(img => 
            `INSERT INTO destination_images (dest_id, img_path) VALUES (${dest_id}, '${img}')`
        );

        for (let q of insertQueries) {
            await connection.query(q);
        }

        res.status(200).send({ message: "Images added successfully!" });
    } catch (error) {
        console.error("Error adding images:", error);
        res.status(500).send({ message: "Server error", error: error.message });
    }
}

export async function getDestinationImages(req, res) {
    try {
        const connection = getConnectionObject();
        const { dest_id } = req.params;

        const [rows] = await connection.query(
            `SELECT img_id, img_path FROM destination_images WHERE dest_id = ?`,
            [dest_id]
        );

        res.status(200).send({ dest_id, images: rows });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).send({ message: "Server error", error: error.message });
    }
}
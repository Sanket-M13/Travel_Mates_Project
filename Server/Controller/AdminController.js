
import { getConnectionObject } from "../config/db.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from 'jsonwebtoken'

export async function registerAdmin(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, email, password, role, phone } = request.body;
        const encryptedPassword = hashSync(password, 12);

        const qry = `INSERT INTO admins(full_name, email, password, role, phone)
                     VALUES('${name}', '${email}', '${encryptedPassword}', '${role}', '${phone}')`;

        const [resultSet] = await connection.query(qry);

        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Admin registered' });
        } else {
            response.status(500).send({ message: 'Admin registration failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function adminLogin(request, response) {
    try {
        const connection = getConnectionObject();
        const { phone, password } = request.body;
        const qry = `SELECT * FROM admins WHERE phone='${phone}'`;
        const [rows] = await connection.query(qry);
        if (rows.length === 0) {
            response.status(400).send({ message: "Login failed, phone doesn't exist" });
        }
        else {
            if(compareSync(password,rows[0].password)){
                const token = jwt.sign({adminId:rows[0].id},'admin1234');
                response.status(200).send({token,message:'Login successful'});
            }
            else{
                response.status(400).send({ message: "Login failed, password is invalid" });
            }
            
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}


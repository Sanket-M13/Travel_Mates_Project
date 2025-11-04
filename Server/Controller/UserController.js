import { getConnectionObject } from "../config/db.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from 'jsonwebtoken'
// import { ROLES } from "../constants/RoleConstants.js";

export async function registerUser(request,response) {
    try {
        const connection = getConnectionObject();
        const { name, email, phone, password,address} = request.body;
        const encryptedPassword = hashSync(password, 12);
         const qry = `INSERT INTO users(name,email,phone,password,address) VALUES('${name}','${email}','${phone}','${encryptedPassword}','${address}')`;
         const [resultSet] = await connection.query(qry);
         if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Registration succesfull, now you can login' });
        }
        else {
            response.status(500).send({ message: 'User registration failed' });
        }

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
    
}

export async function Login(request, response) {
    try {
        const connection = getConnectionObject();
        const { email, password, role } = request.body;
        // const tableName = role === ROLES.ADMINS ? 'admins': 'users';
        console.log(role);
        
        var tableName = null;
        if(role === 'admin'){
            tableName = 'admins';
        }else{
            tableName = 'users';
        }
        const qry = `SELECT * FROM ${tableName} WHERE email='${email}'`;
        const [rows] = await connection.query(qry);
        if (rows.length === 0) {
            response.status(400).send({ message: "Login failed, Invalid Credential" });
        }
        else {
            if(compareSync(password,rows[0].password)){
                const token = jwt.sign({id:rows[0].id},'admin1234');
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
import jwt from "jsonwebtoken";

export function verifyToken(request,response,next){
    const authHeader = request.get('Authorization'); //'Bearer eyn43543fgfdg.sgfgdfgg'
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,'admin1234',(error, payload)=>{
            if(error){
               response.status(401).send({message:'Token is invalid'}); 
            }
            else{
                console.log(payload);
                request.loggedInAdminId = payload.adminId;
               next(); 
            }
        });
    }
    else{
       response.status(401).send({message:'Token is missing'}); 
    }
}
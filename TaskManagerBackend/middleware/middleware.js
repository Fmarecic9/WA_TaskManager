import jwt from 'jsonwebtoken'
import {config} from 'dotenv'


let jwt_secret = process.env.JWT_SECRET

async function generateJWT(payload) {
    try {
    let token = jwt.sign(payload, jwt_secret); 
    return token;
    } catch (err) {
    console.error(`Došlo je do greške prilikom generiranja JWT tokena: ${err}`);
    return null;
    }
    }

async function verifyJWT(token) {
    try {
        let decoded = jwt.verify(token, jwt_secret,{expiresIn: '24h'}); 
        return decoded;
    } catch (err) {
        console.error(`Došlo je do greške prilikom verifikacije JWT tokena: ${err}`);
        return null;
    }
}


const authMiddleware = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "Missing Authorization header" });
    }
    let token = req.headers.authorization.split(' ')[1]
    try{
    let decoded = await verifyJWT(token); 
    if (!decoded||!decoded.id) {
    return res.status(401).send('Nevaljan JWT token!');
    }
    req.authorised_user = decoded; 
    next(); 
    }
    catch(e){
        console.error(`Ni dobro ${e}`)
    }
    };

export{authMiddleware, generateJWT, verifyJWT}
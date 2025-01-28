import express from "express";
import bcrypt from "bcrypt"
import {authMiddleware, generateJWT, verifyJWT} from '../middleware/middleware.js'
import {connectToDatabase} from '../db.js'

const router = express.Router();
const db = await connectToDatabase();

async function hashiraj(plainPass,saltRounds) {
    try{
        let hashedPassword = await bcrypt.hash(plainPass,saltRounds)
        return hashedPassword
    }
    catch(e){
        console.error(`Ni uredu ${e}`)
        return null
    }
}

router.post('/register', async(req,res)=>{
    let {username, password} = req.body
    let hashedPass = await hashiraj(password,10)
    if (!hashedPass){
        return res.status(400).json("Greska kod hashiranja")
    }
    try{
        const userRegister = {
            username,
            password: hashedPass
        }
        let noviKorisnik = await db.collection('tasks_users').insertOne(userRegister)
        if(!noviKorisnik){
            return res.status(400).json({msg: "Nije moguce unijeti korisnika"})
        }
        return res.status(201).json({uneseno: userRegister.username})
    }
    catch(e){
        console.error(`Ni uredu ${e}`)
    }
})

router.post('/login', async(req,res)=>{
    let {username, password} = req.body
    try{    
        let trazeni = await db.collection('tasks_users').findOne({username})
        if (!trazeni){
            return res.status(404).send("User not found")
        }
        const compareRez = await bcrypt.compare(password, trazeni.password)
        if (compareRez === false){
            return res.status(400).json({msg:"lozinke se ne podudaraju"})
        }
        let token = await generateJWT({username: trazeni.username})
        return res.status(200).json({korisnik: trazeni.username, jwt: token})
    }
    catch(e){
        console.error(`Ni uredu ${e}`)
    }
})

export default router
import express from "express";
import {connectToDatabase} from '../db.js'
import { ObjectId } from 'mongodb';
const router = express.Router();

const db = await connectToDatabase();



router.get('/', async(req, res)=>{
    try{
        let tasksCollection = db.collection('tasks')
        let tasks = await tasksCollection.find().toArray()
        res.status(200).json(tasks)
    }
    catch(e){
        res.json({message:"Doslo je do greske", error: e})
    }
})

router.post('/', async(req,res)=>{
   const task = req.body
    try{
        let result = await db.collection('tasks').insertOne(task)
        res.status(200).json({insertedCount: result.insertedCount})
    }
    catch(e){
        console.error("error", e)
        res.status(500).json({error: e})
    }

})
router.patch('/:id', async(req,res)=>{
    let id_param = req.params.id
    let noviStatus = req.body.zavrsen
    try{
        let result = await db.collection('tasks').updateOne(
            { _id: new ObjectId(id_param) },
            {$set: {zavrsen: noviStatus}}
        )
    res.status(200).json({ modificirano: result.modifiedCount, modifiedTask: id_param });
    }
    catch(e){
        res.status(500).json(e);
    }
})

router.delete('/:id', async (req,res)=>{
    let tasksCollection = db.collection('tasks')
    let idParam = req.params.id
    try{
        let result = await tasksCollection.deleteOne({_id: new ObjectId(idParam)})
        res.status(200).json({deletedItems: result.deletedCount})
    }
    catch(e){
        res.status(400).json({ error: e});

    }
})
export default router;

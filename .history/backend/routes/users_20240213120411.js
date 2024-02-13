const express =require('express');
const router=express.Router();
const User=require('../models/users')
//getting all
router.get('/',async(req,res)=>{
    try{
        const users = await  User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
//getting one
router.get('/:id',(req,res)=>{
    res.send(req.params.name)
})
// creating one
router.post('/',async(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password: req.body.password
    })
    try{
const newUser= await user.save()
res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})
//updating one
router.patch('/:id',(req,res)=>{

})
//deleting one
router.get('/:id',(req,res)=>{

})

module.exports=router;
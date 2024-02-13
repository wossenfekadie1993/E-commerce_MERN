const express =require('express');
const router=express.Router();
const User=require('../models/users')
//getting all
router.get('/',async(req,res)=>{
    try{
        const users = await  User.find()
    }catch(err){
        res.status(500).json
    }
})
//getting one
router.get('/:id',(req,res)=>{

})
// creating one
router.post('/',(req,res)=>{

})
//updating one
router.patch('/:id',(req,res)=>{

})
//deleting one
router.get('/:id',(req,res)=>{

})

module.exports=router;
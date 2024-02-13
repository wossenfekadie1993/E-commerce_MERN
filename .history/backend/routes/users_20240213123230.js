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
router.get('/:id',getUser,(req,res)=>{
    res.json(res.user);
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
// router.delete('/:id',async(req,res)=>{
//     const {id}=req.params
// try{
//     await User.findByIdAndDelete(id)
// }catch(err){
// res.status(500).json({message:err.message})
// }
// })

router.delete('/:id',getUser,async(req,res)=>{
    const {id}=req.params
try{
    await User.findByIdAndDelete(id)
}catch(err){
res.status(500).json({message:err.message})
}
})

async function getUser(req,res,next){
let user;
    try{
    user= await User.findById(req.params.id);
    if (user==null){
        return res.status(404).json({message:" user not found"})
    }
}catch(err){
    res.status(500).json({message:err.message})
}
res.user=user;
next()
}
module.exports=router;
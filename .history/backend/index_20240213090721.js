require('dotenv').config();
const express =require('express');
const mongoose=require('mongoose');
const app=express();

const port=process.env.PORT || 4000
const db_
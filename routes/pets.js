import express from 'express'; 

const petsRouter = express.Router(); // router ir Router klases objekta instance

const { getAllDogs, getAllCats} = require('../controllers/petController.js');

petsRouter.get('/dogs', getAllDogs); 
petsRouter.get('/cats', getAllCats); 

module.exports=petsRouter;


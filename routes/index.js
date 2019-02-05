// TODO Task.2
/**
 * To achive modularity we will extract Router (METHOD/PATH) from METHOD/PATH+HANDLER pair;
 * (Syntax to avoid: https://expressjs.com/en/starter/basic-routing.html)
 * In this module:
 * 1. router object should be initialized
 * 2. previously created index controller should be used with GET method and /* path
 * 3. router object should be exported to use it from other modules
 *
 * DOCS: https://expressjs.com/en/guide/routing.html; Especially express.Router topic
 */
import express from 'express'; // importing express library, 
//which has a specific class Router

const router = express.Router(); // router ir Router klases objekta instance

const index = require('../controllers/indexController.js');
router.get('/*', index); 


module.exports = router;

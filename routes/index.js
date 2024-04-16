const express = require ("express"); 
const router = express.Router();
const htmlroutes = require ("./htmlroutes.js");
const apiroutes = require ("./apiroutes.js");
router.use(apiroutes)
router.use(htmlroutes)
module.exports = router; 
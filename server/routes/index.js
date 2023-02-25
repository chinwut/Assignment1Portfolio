/** 
  index.js
  Student Name: Chinnawut Boonluea
  Student ID: 301276464
  Date: 2023-02-07
**/
var express = require('express');
var router = express.Router();
const { userController, businessContactController } = require('../controllers');

router.get('/', userController.displayPage('Home', 'index'));
router.post('/', userController.displayPage('Home', 'index'));
router.get('/home', userController.displayPage('Home', 'index'));
router.post('/home', userController.displayPage('Home', 'index'));
router.get('/about', userController.displayPage('About', 'about'));
router.get('/projects', userController.displayPage('Projects', 'projects'));
router.get('/services', userController.displayPage('Services', 'services'));
router.get('/contact', userController.displayPage('Contact', 'contact'));
router.get('/login', userController.displayLoginPage);
router.post('/login', userController.processLoginPage);
router.get('/register', userController.displayRegisterPage);
router.post('/register', userController.processRegisterPage);
router.get('/logout', userController.performLogout);

router.get('/business-list', businessContactController.displayBusinessContactList);
router.get('/add-business', businessContactController.displayAddPage);
router.post('/add-business', businessContactController.processAddPage);
router.get('/edit-business/:id', businessContactController.displayEditPage);
router.post('/edit-business/:id', businessContactController.processEditPage);
router.get('/delete-business/:id', businessContactController.performDelete);

module.exports = router;
// ---------------------------------------------------
// Imports
const express = require('express')
const router = express.Router()
// Controller
const plansController  = require('../controller/planscontroller')
// ---------------------------------------------------


router.get('/', plansController.getAll)
router.post('/', plansController.create)
router.get('/:id', plansController.search)
router.post('/delete/:id', plansController.delete)
router.post('/update/:id', plansController.update)

module.exports = router

const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.getUser)
router.post('/', userController.addUser)

router.put('/:id', userController.updateAttendUser)
router.get('/:id', userController.getDetailUser)
router.delete('/:id', userController.deleteDetailUser)

module.exports = router
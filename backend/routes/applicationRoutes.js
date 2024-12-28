const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth');

router.post('/', auth, applicationController.createApplication);
router.get('/', auth, applicationController.getApplications);
router.put('/:id', auth, applicationController.updateApplication);
router.delete('/:id', auth, applicationController.deleteApplication);

module.exports = router;
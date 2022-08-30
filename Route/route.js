const router = require("express").Router();

const { ServerCheck,  studentInformation, createStudentInformation, deleteStudentInformation, updateStudentInformation, createInformation } = require('../controller/controller');
const { validateStudent, validateId } = require('../middleware/validation');
const { authenticateToken, verifyToken } = require("../utilities/auth");
const { signUserData, loginUserData } = require("../utilities/signData");


router.get('/', ServerCheck);
router.get('/getStudentDetails/:student_id', studentInformation);
router.post('/addStudent', verifyToken,validateStudent, createStudentInformation);
router.patch('/modifyDetail',verifyToekn, updateStudentInformation);
router.put('/modifyDetails', updateStudentInformation);
router.delete('/deleteStudentDetails', verifyToken, validateId, deleteStudentInformation);
router.post('/authenticate', authenticateToken);
router.post('/verify', verifyToken);
router.post('/sign', signUserData);
router.get('/login', loginUserData);
router.get('/response', createInformation);



module.exports = { router };


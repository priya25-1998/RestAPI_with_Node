const database = require('../utilities/db_connection_1');
const AesEncryption = require('aes-encryption');
const aes = new AesEncryption();
require('dotenv').config();


const getStudentInfo = async (student_id) => {

    let selectQuery = 'SELECT * FROM student WHERE id = ?;';
    qryparams = [student_id];
    let result = await database.execute(selectQuery, qryparams);
    return result;
}

const getDepartmentInfo = async (department_name) => {

    let selectQuery = 'SELECT s.name as student,s.department as department,c.name as company from student as s join placements as p  on s.id=p.S_ID join company as c on p.C_ID=c.id where s.department= ?;';
    qryparams = [department_name];
    let result = await database.execute(selectQuery, qryparams);
    return result;
}

const getCompanyInfo = async (company_id) => {

    let selectQquery = 'select s.name as STUDENT,c.name as COMPANY from student as s join placements as p  on s.id=p.S_ID join company as c on p.C_ID=c.id where c.id=?;';
    qryparams = [company_id];
    let result = await database.execute(selectQquery, qryparams);
    return result;
}

const insertStudentDetails = async (information) => {
    let insertQuery = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );';
    qryparams = [information.id, information.name, information.department, information.cgpa];
    let result = await database.execute(insertQuery, qryparams);
    return result;
}

const updateStudentDetails = async (information) => {
    let updateQuery = 'update student set name = ? , department = ?, cgpa = ? where id=?;';
    qryparams = [information.name, information.department, information.cgpa, information.id];
    let result = await database.execute(updateQuery, qryparams);
    return result;
}

const deleteStudentDetails = async (information) => {
    let deleteQuery = 'delete from student where id=?;';
    qryparams = [information.id];
    let result = await database.execute(deleteQuery, qryparams);
    return result;
}


const getUserInput = async (information, encrypted_pass) => {
    let insertQuery = 'insert into users SET id=? ,username=? ,password=?;';
    qryparams = [information.id, information.username, encrypted_pass];
    let results = await database.execute(insertQuery, qryparams);
    return results;
}

const fetchUserInput = async (information) => {
    let secretKey = process.env.AES_SECRET_KEY;
    aes.setSecretKey(secretKey);
    let selectQuery = 'select password from users where id = ?;';
    qryparams = [information.id];
    let results = await database.execute(selectQuery, qryparams);
    const decrypted = aes.decrypt(results[0].password);
    return decrypted;

}

const getDetails = async () => {
    let selectQuery = 'select * from usertable;';
    qryparams = [];
    let result = await database.execute(selectQuery, qryparams);
    return (result);
}



module.exports = { getStudentInfo, getDepartmentInfo, getCompanyInfo, insertStudentDetails, deleteStudentDetails, updateStudentDetails, getUserInput, fetchUserInput, getDetails };




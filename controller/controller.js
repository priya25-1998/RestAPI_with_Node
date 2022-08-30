const FetchDetails = require('../controller/controller_1');
const { compressResponse } = require('../utilities/compress_response');

const ServerCheck = (req, res) => {
    res.status(200).send({
        success: true,
        message: "Server is Active and Running"
    });
}



const studentInformation = async (req, res) => {
    query = await FetchDetails.getStudentInfo(req.params.student_id);
    res.status(200).send({
        success: true,
        message: "Displaying student details",
        output: query
    });

}

const createStudentInformation = async (req, res) => {
    let information = req.body;
    query = await FetchDetails.insertStudentDetails(information);
    if (query.error) {
        res.status(500).send(({
            success: false,
            message: query.error.message,
            data: query.error
        }));
        return;
    }
    res.status(200).send(({
        success: true,
        message: 'Inserted the Record Successfully'
    }));
}

const createInformation = async (req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    query = await FetchDetails.getDetails();
    if (query.error) {
        res.status(500).send(await compressResponse({
            success: false,
            message: query.error.message,
            data: query.error
        }));
        return;
    }
    res.status(200).send(await compressResponse({
        success: true,
        message: 'Data Fetch is successful',
        data: query
    }));
}


const updateStudentInformation = async (req, res) => {
    let information = req.body;
    query = await FetchDetails.updateStudentDetails(information);
    if (query.error) {
        res.status(500).send(({
            success: false,
            message: query.error.message,
            data: query.error
        }));
        return;
    }
    res.status(200).send(({
        success: true,
        message: "Updated Record Successfully"
    }));


}


const deleteStudentInformation = async (req, res) => {
    let information = req.body;
    query = await FetchDetails.deleteStudentDetails(information);
    if (query.error) {
        res.status(500).send(({
            success: false,
            message: query.error.message,
            data: query.error
        }));
        return;
    }
    res.status(200).send(({
        success: true,
        message: "Deleted Record Successfully"
    }));
}




module.exports = { ServerCheck,  studentInformation, createStudentInformation, deleteStudentInformation, updateStudentInformation, createInformation };
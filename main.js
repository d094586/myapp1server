import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

let countGeneralRowsInTable = 0;
let countRowsInTable = 0;
let countPage = 0;
let currentPage = 0;

const app = express();
app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mytest',
    password: 'Nm*5748w',
})

function connectbd() {
    return new Promise((res, rej) => {
        connection.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('db connected');
            }
            res();
        })
    })
}

app.post('/', getDataForClient)

async function start() {
    try {
        await connectbd();
        app.listen(5000, () => {
            console.log('started server');
        })
    } catch (error) {
        console.log(error);
    }
}
start();

function getCountGeneralRowsInTable() {
    return new Promise((res, rej) => {
        connection.query(`SELECT count(*) FROM tablee;`, function (err, result, fields) {
            countGeneralRowsInTable = result[0]['count(*)'];
            res();
        })
    })
}

function getCountPages() {
    if (countRowsInTable > 0) {
        countPage = Math.ceil(countGeneralRowsInTable / countRowsInTable);
    } else {
        throw new Error('countRowsInTable = 0!!!!!!!!!');
    }
}

async function getDataForClient(req, res) {
    try {
        countRowsInTable = req.body['countRowsInTable'];
        currentPage = req.body['currentPage'];
        await getCountGeneralRowsInTable();
        getCountPages();
        let list = await getSelectFromTable();
        res.status(200).json({
            table: list,
            countPage: countPage
        })

    } catch (e) {
        console.log(e);
    }
}

function getSelectFromTable() {
    return new Promise((res, rej) => {
        connection.query(`SELECT * FROM tablee LIMIT ${countRowsInTable} offset ${(currentPage - 1) * countRowsInTable};`, function (err, result, fields) {
            res(result)
        })
    })
}


















































// async function getFirstData(req, res) {
//     countStrokTable = req.body['countStrokTable'];
//     currentPage = req.body['currentPage'];
//     await getGeneralCountStrAndPage();
//     return res.json({
//         countPage: countPage,
//         table: await selectFromTable()
//     })
// }

// async function getTable(req, res) {
//     console.log(req.body);
//     currentPage = req.body.currentPage;
//     countStrokTable = req.body.countStrokTable;
//     res.json({
//         table: await getSelectTable()
//     })
// }



// function getGeneralCountStrAndPage() {
//     return new Promise((res, rej) => {
//         connection.query(`SELECT count(*) FROM tablee;`, function (err, result, fields) {
//             countGeneralStr = result[0]['count(*)'];
//             countPage = Math.ceil(countGeneralStr / countStrokTable);
//             res();
//         })
//     })
// }

// function getSelectTable() {
//     return new Promise((res, rej) => {
//         connection.query(`SELECT * FROM tablee LIMIT ${countStrokTable} offset ${(currentPage - 1) * (countStrokTable)};`, function (err, result, fields) {
//             res(result);
//         })
//     })
// }

// function selectFromTable() {
//     return new Promise((res, rej) => {
//         connection.query(`SELECT * FROM tablee LIMIT ${currentPage}, ${countStrokTable};`, function (err, result, fields) {
//             res(result);
//         })
//     })
// }
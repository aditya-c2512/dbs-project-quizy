const path = require('path');
const express = require('express');
const cors = require('cors');
const { json } = require('express');

const oracledb = require('oracledb');
const account = require('./utils/account.js');
const quiz = require('./utils/quiz.js');

const port = '8000';
const user_name = 'aditya';
const password = 'aditya';

const publicDir = path.join(__dirname, '../public');
const app = express();
app.use(express.static(publicDir));
app.use(express.json());
app.use(cors());

app.get(
    '',
    (req, res) =>
    {
        res.sendFile(publicDir + '/index.html');
    }
)

app.get(
    '/login_portal',
    (req, res) =>
    {
        res.sendFile(publicDir + '/student_login.html')
    }
)

app.get(
    '/signup_portal',
    (req, res) =>
    {
        res.sendFile(publicDir + '/student_signup.html');
    }
)

app.get(
    '/student_dashboard',
    (req, res) =>
    {
        res.sendFile(publicDir + '/student_dashboard.html');
    }
);

app.get(
    '/quiz',
    (req, res) =>
    {
        res.sendFile(publicDir + '/quiz_ui.html');
    }
)

app.get(
    '/student_login',
    (req, res) =>
    {
        // console.log(req);
        const reg_no = req.query.reg_no;
        const pwd = req.query.pwd;
        
        (async () => 
        {
            const result = await account.login(reg_no,pwd);
            if(result == 1) 
            {
                console.log('LOGGED IN');
                res.send({stat : 'LOGGED IN'});
            }
            else 
            {
                console.log('INCORRECT CREDENTIALS');
                res.send({stat : 'INCORRECT CREDENTIALS'});
            }
        })();
    }
);

app.get(
    '/student_account',
    (req, res) =>
    {
        const reg_no = req.query.reg_no;

        (async () =>
        {
            const result = await account.get_account(reg_no);
            if(result) res.send(result);
            else res.send('ACCOUNT DOES NOT EXIST');
        })();
    }
);

app.get(
    '/get_quizzes',
    (req, res) =>
    {
        const reg_no = req.query.reg_no;
        
        (async () =>
        {
            const result = await quiz.get_quizzes(reg_no);
            if(result) res.send(result);
            else res.send('QUIZZES DO NOT EXIST');
        })();
    }
);

app.get(
    '/get_questions',
    (req, res) =>
    {
        const sub_code = req.query.sub_code;
        
        (async () =>
        {
            const result = await quiz.get_questions(sub_code);
            if(result) res.send(result);
            else res.send('QUESTIONS DO NOT EXIST');
        })();
    }
);

app.get(
    '/get_subcode',
    (req, res) =>
    {
        const quiz_id = req.query.quiz_id;
        
        (async () =>
        {
            const result = await quiz.get_subcode(quiz_id);
            if(result) res.send(result);
            else res.send('SUBJECT CODE DO NOT EXIST');
        })();
    }
);

app.post(
    '/student_signup',
    (req, res) =>
    {
        const reg_no = req.body.reg_no;
        const name = req.body.name;
        const section = req.body.section;
        const dept = req.body.dept;
        const pwd = req.body.pwd;
        
        (async () =>
        {
            const result = await account.account_exists(reg_no);
            // console.log(result);
            if(result == true)
            {
                console.log('ACCOUNT EXISTS');
                res.send({stat : 'ACCOUNT EXISTS'});
            }
            else
            {
                await account.create_account(reg_no, name, dept, section, pwd);
                res.send({stat : 'ACCOUNT CREATED'});
            }
        })();
    }
)

app.listen(
    port,
    () =>
    {
        console.log('Backend Listening on ' + port);
        account.connect_db();
    }
);

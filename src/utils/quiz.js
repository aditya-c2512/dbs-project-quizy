const oracledb = require('oracledb');

var conn;
const user_name = 'aditya';
const password = 'aditya';

async function get_quizzes(reg_no)
{
    conn = await oracledb.getConnection(
        {
            user : user_name,
            password : password,
            connectionString : 'localhost/orcl'
        }
    );
    const query = `select * from QUIZ where id = any(select id from TAKES where TAKES.reg_no = ${reg_no})`;
    const result = await conn.execute(
        query,
        [],
        {
            resultSet : true,
            outFormat : oracledb.OUT_FORMAT_OBJECT
        }
    );
    const rs = result.resultSet;
    const rows = rs.getRows();
    conn.close();
    return rows;
}
async function get_questions(sub_code)
{
    conn = await oracledb.getConnection(
        {
            user : user_name,
            password : password,
            connectionString : 'localhost/orcl'
        }
    );
    const query = `select * from 
                    (select * from QUESTION 
                        where QUESTION.id = any(select id from QUESTION_IS_OF where sub_code = ${sub_code}) 
                    order by dbms_random.value ) 
                    where rownum <= 10`;
    const result = await conn.execute(
        query,
        [],
        {
            resultSet : true,
            outFormat : oracledb.OUT_FORMAT_OBJECT
        }
    );
    const rs = result.resultSet;
    const rows = rs.getRows(10);
    conn.close();
    return rows;
}
async function connect_db()
{
    conn = await oracledb.getConnection(
        {
            user : 'aditya',
            password : 'aditya',
            connectionString : 'localhost/orcl'
        }
    );
}

module.exports = 
{
    get_quizzes : get_quizzes,
    get_questions : get_questions
}
const oracledb = require('oracledb');

var conn;
const user_name = 'aditya';
const password = 'aditya';

async function login(reg_no, pwd)
{
    conn = await oracledb.getConnection(
        {
            user : user_name,
            password : password,
            connectionString : 'localhost/orcl'
        }
    );
    const query = `select count(*) cnt from STUDENT where reg_no=${reg_no} and pwd='${pwd}'`;
    const result = await conn.execute(
        query,
        [],
        {
            resultSet : true,
            outFormat : oracledb.OUT_FORMAT_OBJECT
        }
    );
    const rs = result.resultSet;
    const row = await rs.getRow();
    conn.close();
    return row.CNT;
}
async function get_account(reg_no)
{
    conn = await oracledb.getConnection(
        {
            user : user_name,
            password : password,
            connectionString : 'localhost/orcl'
        }
    );

    const query = `select name, reg_no, dept, section from STUDENT where reg_no=${reg_no}`;
    const result = await conn.execute(
        query,
        [],
        {
            resultSet : true,
            outFormat : oracledb.OUT_FORMAT_OBJECT
        }
    );
    const rs = result.resultSet;
    const row = await rs.getRow();
    conn.close();
    return row;
}
async function account_exists(reg_no)
{
    conn = await oracledb.getConnection(
        {
            user : 'aditya',
            password : 'aditya',
            connectionString : 'localhost/orcl'
        }
    );
    const query = `select count(*) cnt from STUDENT where reg_no=${reg_no}`;
    const result = await conn.execute(
        query,
        [],
        {
            resultSet : true,
            outFormat : oracledb.OUT_FORMAT_OBJECT
        }
    );
    const rs = result.resultSet;
    const row = await rs.getRow();
    conn.close();
    return (row.CNT>0);
}
async function create_account(reg_no, name, dept, section, pwd)
{
    conn = await oracledb.getConnection(
        {
            user : 'aditya',
            password : 'aditya',
            connectionString : 'localhost/orcl'
        }
    );

    const query = `insert into STUDENT values('${reg_no}', '${name}', '${dept}', '${section}', '${pwd}')`;
    conn.execute(query);
    conn.commit();
    conn.close();
    return;
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
    login : login,
    get_account : get_account,
    account_exists : account_exists,
    create_account : create_account,
    connect_db : connect_db
};
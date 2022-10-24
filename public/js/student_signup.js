const { response } = require("express");

const reg_no = document.getElementById('reg_no');
const sname = document.getElementById('name');
const section = document.getElementById('section');
const dept = document.getElementById('dept');
const pwd = document.getElementById('pwd');
const btn_submit = document.getElementById('btn_submit');

btn_submit.addEventListener("click", 
    function() 
    {
        if(!reg_no.value || !sname.value || !section.value || !dept.value || !pwd.value) alert('ENTER ALL FIELDS');
        else
        {
            const qreg = reg_no.value;
            const qname = sname.value;
            const qsec = section.value;
            const qdep = dept.value;
            const qpwd = pwd.value;
            const creds = {
                reg_no : qreg,
                name : qname,
                section : qsec,
                dept : qdep,
                pwd : qpwd
            };
            fetch('/student_signup', 
                {
                    method: 'POST',
                    headers: 
                    {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(creds)
                }
            ).then(
                function(response)
                { 
                    return response.json();
                }
            ).then(
                function(data)
                {
                    console.log(data);
                }
            );
        }
    }
);
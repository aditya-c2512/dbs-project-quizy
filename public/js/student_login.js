const btn_login = document.getElementById('btn_login');
const uname = document.getElementById('uname');
const pwd = document.getElementById('pwd');

btn_login.addEventListener("click", 
    function() 
    {
        const user_name = uname.value;
        const password = pwd.value;
        if(user_name && password)
        {
            fetch(`/student_login?reg_no=${user_name}&pwd=${password}`).then(
                (response) =>
                {
                    response.json().then(
                        (data) =>
                        {
                            if(data.stat === 'LOGGED IN')
                            {
                                window.location.replace(`/student_dashboard?reg_no=${user_name}`);
                            }
                            else alert('INCORRECT CREDENTIALS');
                        })
                })
        }
        else
        {
            alert('EMPTY CREDENTIALS');
        }
    }
);
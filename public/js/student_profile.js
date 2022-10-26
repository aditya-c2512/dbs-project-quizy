console.log('student account loading')

const StudentName=document.querySelector('#name');
const Subject=document.querySelector('#subject');
const RegNo=document.querySelector('#regno');
const Section=document.querySelector('#section');

var quiz_card = document.querySelector('#quiz_card1');
let quiz_cards_container = document.querySelector(".card-container");

StudentName.textContent='';
Subject.textContent='';
RegNo.textContent='';
Section.textContent='';

document.addEventListener('readystatechange',event =>
{
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        console.log("DOM elemets loaded");
    }

    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        console.log("Window loaded");
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
          // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
        let q_regno = params.reg_no; // "some_value"
        
        if(q_regno)
        {
            fetch('/student_account?reg_no=' + q_regno).then(
                (response) =>
                {
                    response.json().then(
                    (data) =>
                    {
                        if(data.error)
                        {
                            StudentName.textContent='NaN';
                            Subject.textContent='NaN';
                            RegNo.textContent='NaN';
                            Section.textContent='NaN';
                        }
                        else
                        {
                            StudentName.textContent = data.NAME;
                            Subject.textContent = data.DEPT;
                            RegNo.textContent = data.REG_NO;
                            Section.textContent = data.SECTION;
                        }
                    })
                })

            fetch(`/get_quizzes?reg_no=${q_regno}`).then(
                (response) =>
                {
                    response.json().then(
                        (data) =>
                        {
                            let cardsString = ``;
                            data.forEach(card => {
                                    var subcode = '';
                                    if(card.ID.startsWith('CYS')) subcode = 'ICT3156';
                                    else if(card.ID.startsWith('DBS')) subcode = 'ICT3171';
                                    else if(card.ID.startsWith('NLP')) subcode = 'DSE3156';
                                    
                                    cardsString += 
                                    `<div class="card">
                                        <div class="box">
                                            <div class="content">
                                            
                                            <h3>QUIZ ID : ${card.ID}</h3>
                                            <p>Duration:<span> ${card.DURATION}</span></p>
                                            <p>Max Marks:<span> ${card.MAX_MARKS}</span></p>

                                            <a href="/quiz?sub_code=${subcode}" target="_blank">Attempt Quiz</a>
                                            </div>
                                        </div>
                                    </div>`;
                            })

                            quiz_cards_container.innerHTML = cardsString;
                                
                            
                        }
                    )
                }
            )
        }
    }
})



async function get_subjectcode(id){
    let resp = await fetch('/get_subcode?quiz_id=' + id);

    return (resp).json();
}


let msg=document.querySelector('button');
msg.addEventListener('click',showmsg);

function showmsg(){
    alert("You will be redirected to the quiz window");
}

function attemptQuiz(){

}

//fetch api
fetch('https://jsonplaceholder.typicode.com/users')
.then(response=>{
    return response.json();
}).then(json=>{
    //console.log(json);
})

async function getUsers(){
    let response=await fetch('https://jsonplaceholder.typicode.com/users');
    let data=await response.json();
    return data;
}
getUsers().then(response=>{
    console.log(response)
})
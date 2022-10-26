const params = new Proxy(
  new URLSearchParams(window.location.search), 
  {
    get: (searchParams, prop) => searchParams.get(prop),
  }
);
let q_subcode = params.sub_code;

let curr_num = 1;
let questions = [];

fetch('/get_questions?sub_code=' + q_subcode).then(
  (response) =>
  {
      response.json().then(
      (data) =>
      {
          data.forEach(
            function(q_obj)
            {
              let corr_ans = '';
              let opts = [q_obj.CHOICE_A, q_obj.CHOICE_B, q_obj.CHOICE_C, q_obj.CHOICE_D];
              if(q_obj.CORRECT_ANS === "A") corr_ans = q_obj.CHOICE_A;
              else if(q_obj.CORRECT_ANS === "B") corr_ans = q_obj.CHOICE_B;
              else if(q_obj.CORRECT_ANS === "C") corr_ans = q_obj.CHOICE_C;
              else if(q_obj.CORRECT_ANS === "D") corr_ans = q_obj.CHOICE_D;
              const ques = {
                numb : curr_num,
                question : q_obj.PROMPT,
                answer : corr_ans,
                options : opts
              }
              curr_num += 1;

              questions.push(ques);
            }
          );
      })
  })

// let questions = [
//     {
//     numb: 1,
//     question: "What does HTML stand for?",
//     answer: "Hyper Text Markup Language",
//     options: [
//       "Hyper Text Preprocessor",
//       "Hyper Text Markup Language",
//       "Hyper Text Multiple Language",
//       "Hyper Tool Multi Language"
//     ]
//   },
//     {
//     numb: 2,
//     question: "What does CSS stand for?",
//     answer: "Cascading Style Sheet",
//     options: [
//       "Common Style Sheet",
//       "Colorful Style Sheet",
//       "Computer Style Sheet",
//       "Cascading Style Sheet"
//     ]
//   },
//     {
//     numb: 3,
//     question: "What does PHP stand for?",
//     answer: "Hypertext Preprocessor",
//     options: [
//       "Hypertext Preprocessor",
//       "Hypertext Programming",
//       "Hypertext Preprogramming",
//       "Hometext Preprocessor"
//     ]
//   },
//     {
//     numb: 4,
//     question: "What does SQL stand for?",
//     answer: "Structured Query Language",
//     options: [
//       "Stylish Question Language",
//       "Stylesheet Query Language",
//       "Statement Question Language",
//       "Structured Query Language"
//     ]
//   },
//     {
//     numb: 5,
//     question: "What does XML stand for?",
//     answer: "eXtensible Markup Language",
//     options: [
//       "eXtensible Markup Language",
//       "eXecutable Multiple Language",
//       "eXTra Multi-Program Language",
//       "eXamine Multiple Language"
//     ]
//   },
// ];
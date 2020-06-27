/* jshint esversion:6 */
// this should properly be a .json, but then i'd need a back end to serve it to me
const todo_questions = [{
  "text": "This is a question?",
  "type": "multipleChoice",
  "answers": [{
    text: "This answer is correct.",
    isCorrect: true
  },{
    text: "This answer is wrong.",
    isCorrect: false
  },{
    text: "This answer isn't wrong.",
    isCorrect: true
  },{
    text: "This answer isn't right.",
    isCorrect: false
  }]
}];

const questions = [{
  "text": "This statement is true.",
  "type": "boolean",
  "answer": true
},{
  "text": "This statement is false.",
  "type": "boolean",
  "answer": false
}];

export {questions};

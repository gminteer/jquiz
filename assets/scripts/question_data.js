/* jshint esversion:6 */
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

const questionData = [
  {
    "text": "This statement is true.",
    "type": "boolean",
    "answer": true
  },
  {
    "text": "This statement is false.",
    "type": "boolean",
    "answer": false
  },
  {
    "text": "This statement is 2 true.",
    "type": "boolean",
    "answer": true,
    "pointValue": 2
  },
  {
    "text": "This statement is 2 false.",
    "type": "boolean",
    "answer": false,
    "pointValue": 2
  },
  {
    "text": "This statement is 3 true.",
    "type": "boolean",
    "answer": true,
    "pointValue": 3
  },
  {
    "text": "This statement is 3 false.",
    "type": "boolean",
    "answer": false,
    "pointValue": 3
  }
];

export {questionData};

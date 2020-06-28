/* jshint esversion:6 */
const todo_questions = [

];

const questionData = [
  {
    "type": "textInput",
    "text": "Spell \"banana\".",
    "answer": "banana"
  },
  {
    "type": "multipleChoice",
    "text": "This is a question?",
    "answers": {
      "0": {
        "text": "This answer is correct.",
        "isRight": true
      },
      "1": {
        "text": "This answer is wrong.",
        "isRight": false
      },
      "2": {
        "text": "This answer isn't wrong.",
        "isRight": true
      },
      "3": {
        "id": 3,
        "text": "This answer isn't right.",
        "isRight": false
      }
    }
  },
  {
    "type": "boolean",
    "text": "This statement is true.",
    "answer": true
  },
  {
    "type": "boolean",
    "text": "This statement is false.",
    "answer": false
  },
  {
    "type": "boolean",
    "text": "This statement is 2 true.",
    "answer": true,
    "pointValue": 2
  },
  {
    "type": "boolean",
    "text": "This statement is 2 false.",
    "answer": false,
    "pointValue": 2
  },
  {
    "type": "boolean",
    "text": "This statement is 3 true.",
    "answer": true,
    "pointValue": 3
  },
  {
    "type": "boolean",
    "text": "This statement is 3 false.",
    "answer": false,
    "pointValue": 3
  }
];

export {questionData};

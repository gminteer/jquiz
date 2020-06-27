/* jshint esversion:6 */
const todo_questions = [];

const questionData = [
  {
    "text": "This is a question?",
    "type": "multipleChoice",
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

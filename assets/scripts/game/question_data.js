/* jshint esversion:6 */
const todo_questions = [

];

const questionData = [
  {
    "type": "textInput",
    "text": "What <script> attribute lets you refer to an external script?",
    "pointValue": 15,
    "answer": "src"
  },
  {
    "type": "textInput",
    "text": "What function in the Math library lets you round down to the nearest integer?",
    "pointValue": 15,
    "answer": "floor"
  },
  {
    "type": "textInput",
    "text": "Which JavaScript operator calculates the modulus of a number?",
    "pointValue": 25,
    "answer": "%"
  },
  {
    "type": "textInput",
    "text": "Which JavaScript operator checks for both value equality and type equality?",
    "pointValue": 15,
    "answer": "==="
  },
  {
    "type": "multipleChoice",
    "text": "Which HTML element should JavaScript code be placed in?",
    "pointValue": 5,
    "answers": {
      "0": {
        "text": "<script>",
        "isRight": true
      },
      "1": {
        "text": "<javascript>",
        "isRight": false
      },
      "2": {
        "text": "<js>",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "<program>",
        "isRight": false
      }
    }
  },  {
    "type": "multipleChoice",
    "text": "What are variables used for in JavaScript?",
    "pointValue": 5,
    "answers": {
      "0": {
        "text": "Storing numbers, strings of text, or other values",
        "isRight": true
      },
      "1": {
        "text": "Generating random data",
        "isRight": false
      },
      "2": {
        "text": "Making you wish you'd paid attention in math class",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "None of these answers are correct",
        "isRight": false
      }
    }
  },
  {
    "type": "multipleChoice",
    "text": "Which of the following is not a basic JavaScript variable type?",
    "pointValue": 5,
    "answers": {
      "0": {
        "text": "number",
        "isRight": false
      },
      "1": {
        "text": "string",
        "isRight": false
      },
      "2": {
        "text": "boolean",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "dateTime",
        "isRight": true
      }
    }
  },
  {
    "type": "multipleChoice",
    "text": "JavaScript scripts in webpages are run by:",
    "pointValue": 5,
    "answers": {
      "0": {
        "text": "Your web browser",
        "isRight": true
      },
      "1": {
        "text": "Google",
        "isRight": false
      },
      "2": {
        "text": "The web server",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "The government",
        "isRight": false
      }
    }
  },
  {
    "type": "boolean",
    "text": "You should place your JavaScript code inside of a <script> element when it's in an external script.",
    "answer": false,
    "pointValue": 5
  },
  {
    "type": "boolean",
    "text": "JavaScript is case-sensitive.",
    "answer": true,
    "pointValue": 5
  },
  {
    "type": "boolean",
    "text": "Java and JavaScript are different names for the same language.",
    "answer": false,
    "pointValue": 5
  },
  {
    "type": "boolean",
    "text": "All web browsers support JavaScript.",
    "answer": true,
    "pointValue": 5
  },
  {
    "type": "boolean",
    "text": "JavaScript is a strongly typed language.",
    "answer": false,
    "pointValue": 5
  },
  {
    "type": "multipleChoice",
    "text": "Which function lets you write to the JavaScript console?",
    "pointValue": 5,
    "answers": {
      "0": {
        "text": "console.log()",
        "isRight": true
      },
      "1": {
        "text": "console.warn()",
        "isRight": true
      },
      "2": {
        "text": "printf()",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "echo()",
        "isRight": false
      }
    }
  },
  {
    "type": "multipleChoice",
    "text": "Which event happens when the user clicks on a webpage?",
    "pointValue": 10,
    "answers": {
      "0": {
        "text": "activate",
        "isRight": false
      },
      "1": {
        "text": "click",
        "isRight": true
      },
      "2": {
        "text": "mouseover",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "mouseclick",
        "isRight": false
      }
    }
  },
  {
    "type": "multipleChoice",
    "text": "How would you call a function named myFunction?",
    "pointValue": 5,
    "answers": {
      "0": {
        "text": "myFunction()",
        "isRight": true
      },
      "1": {
        "text": "call myFunction",
        "isRight": false
      },
      "2": {
        "text": "gosub myFunction",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "myFunction.run()",
        "isRight": false
      }
    }
  },
  {
    "type": "multipleChoice",
    "text": "Which function lets you write to the JavaScript console?",
    "pointValue": 5,
    "answers": {
      "0": {
        "text": "console.log()",
        "isRight": true
      },
      "1": {
        "text": "console.warn()",
        "isRight": true
      },
      "2": {
        "text": "printf()",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "echo()",
        "isRight": false
      }
    }
  },
  {
    "type": "multipleChoice",
    "text": "Which of the following is a valid 'if' statement in JavaScript?",
    "pointValue": 10,
    "answers": {
      "0": {
        "text": "if x == 0 then",
        "isRight": false
      },
      "1": {
        "text": "if(x = 0)",
        "isRight": false
      },
      "2": {
        "text": "if x == 0:",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "if(x == 1)",
        "isRight": true
      }
    }
  },
  {
    "type": "multipleChoice",
    "text": "Which of the following 'for' loop in JavaScript?",
    "pointValue": 10,
    "answers": {
      "0": {
        "text": "for(var i = 0; i < 10; i++)",
        "isRight": true
      },
      "1": {
        "text": "for(const x of y)",
        "isRight": true
      },
      "2": {
        "text": "10.times",
        "isRight": false
      },
      "3": {
        "id": 3,
        "text": "for i in range(10):",
        "isRight": false
      }
    },
  },
  {
    "type": "multipleChoice",
    "text": "Which of the following is not a valid comment in JavaScript?",
    "pointValue": 5,
    "answers": {
      "0": {
        "text": "/* comment */",
        "isRight": false
      },
      "1": {
        "text": "// comment",
        "isRight": false
      },
      "2": {
        "text": "<!-- comment -->",
        "isRight": true
      },
      "3": {
        "id": 3,
        "text": "# comment",
        "isRight": true
      }
    }
  },
];

export {questionData};

/* jshint esversion:6 */
// this should properly be a .json, but then i'd need a back end to serve it to me
const questions = [
  {
    "q": "This statement is true.",
    "type": "boolean",
    "answer": true
  },
  {
    "q": "This is a question?",
    "type": "multipleChoice",
    "answers": { /* doing it this way makes it trivially easy to cheat with devtools
                    but, if you know how to do that this quiz should be trivially easy anyways */
      "right": ["I'm correct.", "I'm also correct."],
      "wrong": ["I'm wrong.", "I'm also wrong."]
    },
  }
];

export {questions};

# More accurately, LIST_OF_DEFECTS_AND_OR_REGRETS.md

- The block on the title screen that (should) show the last run of the quiz game doesn't actually show the last run until you refresh the page, because the two listeners for the event are happening in the wrong order.
- Never added visual feedback/bling for right/wrong answers in the main quiz game
  - The whole thing needs a style/optimization pass. I'm tagging tons of HTML elements with ids I don't actually use in the stylesheet/code anywhere, etc.
    - In my defense, no sane person would manually slam together an interface in javascript with direct DOM manipulation in 2020, and I assumed from the start using, like, react or something would be against the spirit of the excercise.
- Never added any audio components
- Never added any transitions/animations
- It'd be nice if it had more than 20 questions
  - On that note, never added variable questions (multiple choice except which answer is correct depends on randomly-picked keywords in the question text, like all of the boolean questions could be two questions if there was an optional "not" somewhere in the question text)
- The layout isn't responsive and looks bad at narrower max-widths
  - The main quiz layout also needs tweaking at wider max-widths
- The answer button font probably shouldn't be Bauhaus
  - I never added an about_screen and I might owe the freefont site a link somewhere on the quiz for Bauhaus 93, but I'm 99% sure it's the Microsoft font from whichever Microsoft Office freebie pack it's in, and they're violating Microsoft's license by serving it as a webfont.
- The seperation between model and view is pretty damned dirty in some spots.

### Things I'm happy with
- I spent (probably too much) time on the underlying client-side webapp quiz game engine part of things, which is a bit hypocritical with my rationale for not using react/whatever because the class hasn't touched doing things like es6 modules / abusing the built-in event loop.
- I'm reasonably sure it'd take minimal effort to replace quizData.js with a REST server, and the use of localStorage with backend storage.
- I'm also reasonably sure it wouldn't take too long to delete all of the generate/render functions and refactor the whole thing into something built around a popular framework library.
- Styling a quiz thing with Bauhaus fonts and that 70's brown/orange/yellow pallete might be too obvious, but it's obvious because it works.

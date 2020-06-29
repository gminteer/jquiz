# More accurately, LIST_OF_DEFECTS_AND_OR_REGRETS.md

- The block on the title screen that (should) show the last run of the quiz game doesn't actually show the last run until you refresh the page, because the two listeners for the event are happening in the wrong order.
- Never added visual feedback/bling for right/wrong answers in the main quiz game
- Never added any audio components
- Never added any transitions/animations
- It'd be nice if it had more than 20 questions
  - On that note, never added variable questions (multiple choice except which answer is correct depends on randomly-picked keywords in the question text, like all of the boolean questions could be two questions if there was an optional "not" somewhere in the question text)
- The layout isn't responsive and looks bad at narrower max-widths
  - The main quiz layout also needs tweaking at wider max-widths
- The answer button font probably shouldn't be Bauhaus
  - I never added an about_screen and I might owe the freefont site a link somewhere on the quiz for Bauhaus 93, but I'm 99% sure it's the Microsoft font from whichever Microsoft Office freebie pack it's in, and they're violating Microsoft's license by serving it as a webfont.

GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score

index.html


states
    mainMenuState
        buttons to transition to gameState (start) and highScoreState
    gameStartState
        button to transition to mainMenuState (quit)
        show countdown timer (3... 2... 1... )
        to gameState
    gameState
        set timer to n seconds
        set score to 0
        build a randomly sorted array of questions
        pop a question out of the array and display it
        if that was the last question in the list, add bonus points, endGame
            response.onClick => validateAnswer
                if response.id == question.answer.id w
                    score += question.value (or maybe round value, or some combination)
                else
                    timer -= question.penalty, if timer < 1 endGame
                pop a question
        interval, 1sec => timer--, if timer < 1 endGame
    endGameState
        show score
        input high score
        button and timeout to highScoreState
    highScoreState
        button to transition back to mainMenuState

| header

| main div
    three content panels on top of each other (title screen, game screen, high-score screen), two are just invisible

//TODO: import db from mongo


//TODO: get a specific user's attempt for a specific quiz
export function findAttempt(userID, quizID) {

}

//TODO: first time taking the quiz
export function createNewAttempt(userID, quizAttempt) {
    //quiz attempt might need to have quiz _id inside of it?
}

//TODO: replace user's previous attempt with this new one
export function replaceAttempt(userID, quizAttempt) {

}

//NOTE: might not need these anymore?
export function findAttemptsByQuiz(quizID) {
    // get attempts from all users for the given quiz
}

export function findAttemptsByUser(userID) {
    // get all attempts user has made
}
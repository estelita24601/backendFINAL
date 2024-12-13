import attemptModel from "./model.js";

//get a specific user's attempt for a specific quiz
export function findAttempt(userID, quizID) {
    return attemptModel.findOne({ userID: userID, quizID: quizID });
}

// first time taking the quiz
export function createNewAttempt(userID, quizAttempt) {
    return attemptModel.create({ userID, ...quizAttempt })
}

//replace user's previous attempt with this new one
export function replaceAttempt(userID, quizAttempt) {
    const { _id, ...updateFields } = quizAttempt; // Exclude _id from update fields
    return attemptModel.findOneAndUpdate(
        { userID: userID, quizID: quizAttempt.quizID }, // Filter
        { $set: updateFields }, // Use $set for safe updates
        { new: true, upsert: true } // Return the updated document, insert if not found
    );
}


//NOTE: might not need these anymore?
export function findAttemptsByQuiz(quizID) {
    return attemptModel.find({ quizID: quizID });
}

export function findAttemptsByUser(userID) {
    return attemptModel.find({ userID: userID });
}

export function getAllQuizzesAttempts() {
    return attemptModel.find();
}


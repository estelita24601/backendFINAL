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
    // Ensure quizID is included in the filter
    const filter = { userID: userID, quizID: quizAttempt.quizID };

    // Exclude _id from the update payload
    const { _id, quizID, ...updateFields } = quizAttempt;

    const update = { $set: updateFields };

    // Debugging logs
    console.log("Filter used in findOneAndUpdate:", filter);
    console.log("Update payload sent to MongoDB:", update);

    return attemptModel.findOneAndUpdate(
        filter, // Correctly use the filter
        update, // Safe update payload
        { new: true, upsert: true } // Options
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


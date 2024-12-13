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
    const filter = { userID: userID, quizID: quizAttempt.quizID }; // Define the filter explicitly
    const update = { $set: updateFields }; // Prepare the update payload

    // Debugging logs
    console.log("Filter used in findOneAndUpdate:", filter);
    console.log("Update payload sent to MongoDB:", update);

    return attemptModel.findOneAndUpdate(
        filter, // Use the defined filter
        update, // Use the update payload
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


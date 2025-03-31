import { RESET_ALL, Change_amount, Change_category, Change_difficulty, Change_score, Change_type } from "./actionType";

let initialState = {
    Question_category: "",
    Question_difficulty: "",
    Question_type: "",
    amount_of_Question: "",
    score: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Change_category:
            return {
                ...state,
                Question_category: action.payload
            };
        case Change_difficulty:
            return {
                ...state,
                Question_difficulty: action.payload
            };
        case Change_amount:
            return {
                ...state,
                amount_of_Question: action.payload
            };
        case Change_type:
            return {
                ...state,
                Question_type: action.payload
            };
        case Change_score:
            return {
                ...state,
                score: state.score + 1
            };

        case RESET_ALL:
            return {
                ...state,
                score: 0
            };
        default:
            return state;
    }
};

export default reducer;

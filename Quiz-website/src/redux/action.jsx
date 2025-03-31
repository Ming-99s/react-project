import {
    Change_category,
    Change_difficulty,
    Change_type,
    Change_amount,
    Change_score,
    RESET_ALL
} from './actionType';

export const handleCategoryChange = (payload) => ({
    type: Change_category,
    payload,
});
export const handleDifficultyChange = (payload) => ({
    type: Change_difficulty,
    payload,
});
export const handleTypeChange = (payload) => ({
    type: Change_type,
    payload,
});
export const handleScoreChange = (payload) => ({
    type: Change_score,
    payload,
});
export const handleAmountChange = (payload) => ({
    type: Change_amount,
    payload,
});


// Reset Action
export const handleReset = (payload) => ({
    type: RESET_ALL,
    payload
});

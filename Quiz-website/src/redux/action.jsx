import{
    Change_category,
    Change_difficulty,
    Change_type,
    Change_amount,
    Change_score,
} from './actionType'

export const handleCategoryChnage = (payload) =>({
    type: Change_category,
    payload,
})
export const handleDifficultyChange = (payload) =>({
    type: Change_difficulty,
    payload,
})
export const handleTypeChnage = (payload) =>({
    type: Change_type,
    payload,
})
export const handleAmountChnage = (payload) =>({
    type: Change_amount,
    payload,
})
export const handleScoreChnage = (payload) =>({
    type: Change_score,
    payload,
})
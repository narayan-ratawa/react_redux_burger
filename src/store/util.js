export const updatedState = (state,updatedData) => {
    return {
        ...state,
        ...updatedData
    }
}
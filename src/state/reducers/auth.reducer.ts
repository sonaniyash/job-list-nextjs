import actionType from "../actions/action.type";

const init = {
    user: {}
};

const authReducer = (state = init, action) => {
    switch (action.type) {
        case actionType.SET_JOB:
            return {
                ...state,
                user: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default authReducer;

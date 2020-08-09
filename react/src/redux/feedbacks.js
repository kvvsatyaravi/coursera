import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state = { isLoading: true,
    errMess: null,
    feedbacks:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACK:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        

        

        default:
            return state;
    }
};
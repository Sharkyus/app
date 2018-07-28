import * as actionTypes from './actionTypes';

let initialState = {
    limit: 20,
    offset: 0,
    rotate: 0,
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IMAGES_FETCH: {
            return {
                ...state
            };
        }
        case actionTypes.IMAGES_ROTATE: {
            return {
                ...state
            };
        }
        default: return state;
    }
};

export default imagesReducer;
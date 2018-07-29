import * as actionTypes from './actionTypes';

let initialState = {
    limit: 20,
    offset: 0,
    rotate: 0,
    fetchStarted: false,
    endReached: false,
    images: []
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IMAGES_ADD: {
            return {
                ...state,
                images: [
                    ...state.images,
                    ...action.images
                ],
                fetchStarted: false,
                offset: state.offset + action.images.length,
                endReached: action.images.length < state.limit
            };
        }
        case actionTypes.IMAGES_FETCH_START: {
            return {
                ...state,
                fetchStarted: true
            };
        }
        default: return state;
    }
};

export default imagesReducer;
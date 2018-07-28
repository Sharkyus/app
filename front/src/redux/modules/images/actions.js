import * as actionType from './actionTypes';

export const fetchImages = (limit, offset) => {
    return {
        type: actionType.IMAGES_FETCH,
        limit,
        offset
    }
};
export const rotateImages = (angle) => {
    return {
        type: actionType.IMAGES_ROTATE,
        angle
    }
};
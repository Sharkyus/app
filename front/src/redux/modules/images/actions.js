import * as actionType from './actionTypes';
import ApiService from '@/lib/ApiService';

export const fetchImages = (limit, offset, imageWidth, renderType) => {
    return async function(dispatch){
        dispatch(startFetch());
        let images = await ApiService.send(`/images?limit=${limit}&offset=${offset}&width=${imageWidth}&typeImg=${renderType}`, { method: 'GET' });
        dispatch(addImages(images));
    }
};

export const startFetch = () => {
    return {
        type: actionType.IMAGES_FETCH_START
    }
};

export const addImages = (images) => {
    return {
        type: actionType.IMAGES_ADD,
        images
    }
};

export const toggleSelectImage = (id, selected) => {
    return {
        type: actionType.IMAGES_TOGGLE_SELECT,
        id, selected
    }
};

export const rotateSelectedImages = (angle) => {
    return {
        type: actionType.IMAGES_ROTATE_SELECTED,
        angle
    }
};

export const rotateAllImages = (angle) => {
    return {
        type: actionType.IMAGES_ROTATE_ALL,
        angle
    }
};

export const resetRotations = () => {
    return {
        type: actionType.IMAGES_RESET_ROTATION
    }
};

export const updateImagesRotations = (data) => {
    return function(dispatch) {
        ApiService.send(`/images`, { method: 'PUT' }, data);
    }
};
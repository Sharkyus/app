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

export const updateImagesRotations = (data) => {
    return async function() {
        ApiService.send(`/images`, { method: 'PUT' }, data);
    }
};
import * as actionTypes from './actionTypes';
import Helpers from "@/lib/Helpers";

let initialState = {
    limit: 20,
    offset: 0,
    rotate: 0,
    fetchStarted: false,
    endReached: false,
    hasSelectedImages: false,
    globalRotate: 0,
    selectedImagesIndexes: [],
    images: []
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IMAGES_ADD: {
            action.images.forEach((img)=>{
                img.rotateDeg = 0;
                img.dbRelativeRotate = 0;
                img.selected = false;
            });
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
        case actionTypes.IMAGES_TOGGLE_SELECT: {
            let idx = _.findIndex(state.images, { id: action.id });
            state.images[idx].selected = action.selected;

            if (action.selected){
                state.selectedImagesIndexes.push(idx);
            } else {
                state.selectedImagesIndexes.splice(state.selectedImagesIndexes.indexOf(idx), 1);
            }
            state.hasSelectedImages = !!state.selectedImagesIndexes.length;

            return {
                ...state,
                images: [
                    ...state.images
                ]
            };
        }
        case actionTypes.IMAGES_ROTATE_SELECTED: {
            state.selectedImagesIndexes.forEach(idx=>{
                let image = state.images[idx];
                image.rotateDeg = Helpers.simplifyAngle(image.rotateDeg + action.angle);
                image.dbRelativeRotate = Helpers.simplifyAngle(image.dbRelativeRotate + action.angle);
            });
            return {
                ...state,
                images: [
                    ...state.images
                ]
            }
        }
        case actionTypes.IMAGES_ROTATE_ALL: {
            state.images.forEach((image)=>{
                image.rotateDeg = Helpers.simplifyAngle(image.rotateDeg + action.angle);
                image.dbRelativeRotate = Helpers.simplifyAngle(image.dbRelativeRotate + action.angle);
            });

            return {
                ...state,
                images: [
                    ...state.images
                ],
                globalRotate: Helpers.simplifyAngle(state.globalRotate + action.angle)
            }
        }
        case actionTypes.IMAGES_RESET_ROTATION: {
            state.images.forEach((image)=>{ image.dbRelativeRotate = 0 });

            return {
                ...state,
                images: [
                    ...state.images
                ],
                globalRotate: 0
            }
        }
        default: return state;
    }
};

export default imagesReducer;
import Helpers from "@/lib/Helpers";

export default {
    addImages: (state, images)=>{
        images.forEach((img)=>{
            img.rotateDeg = 0;
            img.dbRelativeRotate = 0;
            img.selected = false;
        });

        state.images.push(...images);
        state.fetchStarted = false;
        state.offset = state.offset + images.length;
        state.endReached = images.length < state.limit;
    },
    startFetch: (state)=>{
        state.fetchStarted = true;
    },
    toggleSelectImage: (state, { id, selected })=>{
        let idx = _.findIndex(state.images, { id });
        state.images[idx].selected = selected;

        if (selected){
            state.selectedImagesIndexes.push(idx);
        } else {
            state.selectedImagesIndexes.splice(state.selectedImagesIndexes.indexOf(idx), 1);
        }
        state.hasSelectedImages = !!state.selectedImagesIndexes.length;
    },
    rotateSelectedImages: (state, angle)=>{
        state.selectedImagesIndexes.forEach(idx=>{
            let image = state.images[idx];
            image.rotateDeg = Helpers.simplifyAngle(image.rotateDeg + angle);
            image.dbRelativeRotate = Helpers.simplifyAngle(image.dbRelativeRotate + angle);
        });
    },
    rotateAllImages: (state, angle)=>{
        state.images.forEach((image)=>{
            image.rotateDeg = Helpers.simplifyAngle(image.rotateDeg + angle);
            image.dbRelativeRotate = Helpers.simplifyAngle(image.dbRelativeRotate + angle);
        });

        state.globalRotate = Helpers.simplifyAngle(state.globalRotate + angle);
    },
    resetRotations: (state)=>{
        state.images.forEach((image)=>{ image.dbRelativeRotate = 0 });
        state.globalRotate = 0
    }
}
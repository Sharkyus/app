import BaseComponent from "@/components/common/BaseComponent";
import ImageThumb from "@/components/ImageThumb";
import template from "~/Wall.html";

export default class Wall extends BaseComponent {
    constructor(options = {}){
        super({ ...options, template });
        this.globalRotate = 0;
        this.thumbs = [];
        this.selectedThumbs = [];
    }
    addImages(images){
        images.forEach((img)=>{
            let thumb = new ImageThumb({ renderTo: this.$el, data: img });
            thumb.on('toggle-select', ::this._onThumbToggleSelect);
            this.thumbs.push(thumb);
        });
    }
    getRotatedImagesData(){
        return this.thumbs.filter(tb=>tb.getRotateAngle())
                          .map(tb=>({ id: tb.data.id, rotate: tb.getRotateAngle() }));
    }
    rotateSelectedThumbs(deg){
        this.selectedThumbs.forEach((thumb)=>{
            thumb.rotate(deg);
        });
    }
    rotateAllThumbs(deg){
        this.globalRotate = (360 + this.globalRotate + deg) % 360;
        this.thumbs.forEach((thumb)=>{
            thumb.rotate(deg);
        });
    }
    getGlobalRotate(){
        return this.globalRotate;
    }
    resetRotations(){
        this.globalRotate = 0;
        this.thumbs.filter(tb=>tb.resetRotate())
    }
    hasSelectedImages(){
        return !!this.selectedThumbs.length;
    }
    updateImagesSizes(){
        this.thumbs.forEach((tb)=>{
            tb.updateImageSize();
        });
    }
    _onThumbToggleSelect(thumb, selected){
        if (selected){
            return this.selectedThumbs.push(thumb);
        }

        this.selectedThumbs.splice(this.selectedThumbs.indexOf(thumb), 1);
    }
}
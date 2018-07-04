import BaseComponent from "@/components/common/BaseComponent";
import ImageThumb from "@/components/ImageThumb";
import template from "~/Wall.html";

export default class Wall extends BaseComponent {
    constructor(options = {}){
        super({ ...options, template });
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
    rotateSelectedThumbs(deg){
        this.selectedThumbs.forEach((thumb)=>{
            thumb.rotate(deg);
        });
    }
    rotateAllThumbs(deg){
        this.thumbs.forEach((thumb)=>{
            thumb.rotate(deg);
        });
    }
    hasSelectedImages(){
        return !!this.selectedThumbs.length;
    }
    _onThumbToggleSelect(thumb, selected){
        if (selected){
            return this.selectedThumbs.push(thumb);
        }

        this.selectedThumbs.splice(this.selectedThumbs.indexOf(thumb), 1);
    }
}
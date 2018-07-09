import BaseComponent from "@/components/common/BaseComponent";
import template from  "~/ImageThumb.html";

export default class ImageThumb extends BaseComponent{
    constructor(options = {}) {
        super({...options, template});
        this.rotateDeg = 0;
        this.dbRelativeRotate = 0;

        this.$refs.image.onload=()=>{
            this.$el.classList.remove('loading');
            this.updateImageSize();
        }
    }
    rotate(deg = 0){
        let { image } = this.$refs;
        this.rotateDeg = (360 + this.rotateDeg + deg) % 360;
        this.dbRelativeRotate = (360 + this.dbRelativeRotate + deg) % 360;

        image.style.transform = `rotate(${this.rotateDeg}deg)`;
    }
    getRotateAngle(){
        return this.dbRelativeRotate;
    }
    resetRotate(){
        this.dbRelativeRotate = 0;
    }
    updateImageSize(){
        let { image } = this.$refs;

        let {width, height} = this.$el.getBoundingClientRect();
        if (image.naturalWidth > image.naturalHeight){
            image.style.width = Math.min(width, height) + 'px';
            image.style.height = 'auto';
        } else {
            image.style.height = Math.min(width, height)+'px';
            image.style.width = 'auto';
        }
    }
    _bindEvents(){
        this.$el.addEventListener('click', ::this._onItemClick);
    }
    _onItemClick(){
        this.selected = !this.selected;
        this.$el.classList.toggle('image-thumb_selected', this.selected);
        this.emit('toggle-select', this, this.selected);
    }
}
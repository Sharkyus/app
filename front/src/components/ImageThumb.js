import BaseComponent from "@/components/common/BaseComponent";
import template from  "~/ImageThumb.html";

export default class ImageThumb extends BaseComponent{
    constructor(options = {}){
        super({ ...options, template });
        this.rotateDeg = 0;
        this.rotateOnShow = false;
    }
    rotate(deg){
        let { imageHidden, image } = this.$refs;
        this.rotateDeg += deg;

        if (!this._isScrolledIntoView()){
            return this.rotateOnShow = true;
        }

        let canvas = document.createElement('canvas');

        let { width: newWidth, height: newHeight } = this._rotateBox(this.rotateDeg, imageHidden.naturalWidth, imageHidden.naturalHeight);
        canvas.width = newWidth;
        canvas.height = newHeight;

        let ctx = canvas.getContext('2d');
        ctx.save();
        ctx.translate(newWidth/2, newHeight/2);
        ctx.rotate(this._toRad(this.rotateDeg));
        ctx.drawImage(imageHidden, -imageHidden.naturalWidth/2, -imageHidden.naturalHeight/2);
        ctx.restore();

        canvas.toBlob((blob)=>{
            image.src = URL.createObjectURL(blob);
        },'image/jpeg');
    }

    _isScrolledIntoView() {
        let { top, bottom } = this.$el.getBoundingClientRect();
        return (top < window.innerHeight + 200) && (bottom >= -200);
    }
    _rotateBox(deg, width, height){
        let newWidth = (width - Math.abs(Math.sin(this._toRad(deg)) * (width-height))).toFixed(0);
        let newHeight = (height + Math.abs(Math.sin(this._toRad(deg)) * (height-width))).toFixed(0);

        return { width: newWidth, height: newHeight };
    }
    _toRad(deg){
        return deg*Math.PI/180;
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
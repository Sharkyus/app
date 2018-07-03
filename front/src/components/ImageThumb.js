import BaseComponent from "@/components/common/BaseComponent";
import template from  "~/ImageThumb.html";

export default class ImageThumb extends BaseComponent{
    constructor(options = {}){
        super({ ...options, template });
        this.rotateDeg = 0;
    }
    rotate(deg){
        let { image, bgImage } = this.$refs;
        this.rotateDeg += deg;

        let canvas = document.createElement('canvas');

        let { width: newWidth, height: newHeight } = this._rotateBox(this.rotateDeg, image.naturalWidth, image.naturalHeight);
        canvas.width = newWidth;
        canvas.height = newHeight;

        console.log(newWidth, newHeight)

        let ctx = canvas.getContext('2d');
        ctx.save();
        ctx.translate(newWidth/2, newHeight/2);
        ctx.rotate(this._toRad(this.rotateDeg));
        ctx.drawImage(image, -newWidth/2, -newHeight/2);

        ctx.restore();

        canvas.toBlob((blob)=>{
            let rotatedImageURL = URL.createObjectURL(blob);
            // image.src = rotatedImageURL;
            bgImage.style.backgroundImage = `url(${rotatedImageURL})`;
        },'image/jpeg');
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
import BaseComponent from "@/components/common/BaseComponent";
import ImageThumb from "@/components/ImageThumb";
import template from "~/Wall.html";

export default class Wall extends BaseComponent {
    constructor(options = {}){
        super({ ...options, template });
    }
    addImages(images){
        images.forEach((img)=>{
            new ImageThumb({ renderTo: this.$el, data: img });
        });
    }
}
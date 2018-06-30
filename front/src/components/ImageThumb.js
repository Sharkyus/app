import BaseComponent from "@/components/common/BaseComponent";
import template from  "~/ImageThumb.html";

export default class ImageThumb extends BaseComponent{
    constructor(options = {}){
        super({ ...options, template });


    }
}
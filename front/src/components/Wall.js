import BaseComponent from "@/components/common/BaseComponent";
import ImageThumb from "@/components/ImageThumb";
import template from "~/Wall.html";

export default class Wall extends BaseComponent {
    constructor(data = {}){
        super({ ...data, template });
    }
}
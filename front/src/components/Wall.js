import BaseComponent from "@/components/common/BaseComponent";
import template from "~/Wall.html";

export default class Wall extends BaseComponent {
    constructor(data = {}){
        super(Object.assign(data, { template }));
    }
}
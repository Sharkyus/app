import BaseComponent from "@/components/common/BaseComponent";
import template from "~/ControlsPanel";

export default class ControlsPanel extends BaseComponent {
    constructor(options){
        super({ ...options, template });
    }
    _bindEvents(){
        let { rotateLeft, rotateRight } = this.$refs;

        rotateLeft.addEventListener('click', ()=>{ this.emit('rotate-left') });
        rotateRight.addEventListener('click', ()=>{ this.emit('rotate-right') });

        this.$el.addEventListener('mouseenter', ()=>{ this.emit('prepare-click') });
        this.$el.addEventListener('touchstart', ()=>{ this.emit('prepare-click') });
    }
}
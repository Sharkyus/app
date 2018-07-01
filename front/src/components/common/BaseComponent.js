import EventEmitter from 'event-emitter';
import _ from 'underscore';

const errors = [
    {
        prop: 'template',
        message: "Template required"
    },
    {
        prop: 'renderTo',
        message: "Container required"
    }
];

export default class BaseComponent{
    constructor(options){
        this.$refs = {};
        Object.assign(this, EventEmitter.methods);
        Object.assign(this, options);

        this._checkProps();
        this.render();

        this._extractRefs();
        this._bindEvents();
    }
    render(){
        let wrapper = document.createElement('div');
        wrapper.innerHTML = _.template(this.template)(this.data || {});
        this.$el = wrapper.firstChild;
        this.renderTo.appendChild(this.$el);
        this.rendered && (this.rendered());
    }
    _checkProps(){
        errors.forEach(error=>{
            if (!this[error.prop]) throw new Error(error.message);
        });
    }
    _extractRefs(){
        [].forEach.call(this.$el.querySelectorAll('[data-ref]'), (el)=>{
            this.$refs[el.dataset.ref] = el;
        });
    }
    _bindEvents(){

    }
}
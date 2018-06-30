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
        Object.assign(this, options);

        this._checkProps();
        this.render();
    }
    _checkProps(){
        errors.forEach(error=>{
            if (!this[error.prop]) throw new Error(error.message);
        });
    }
    render(){
        let wrapper = document.createElement('div');
        wrapper.innerHTML = _.template(this.template)(this.data || {});
        this.$el = wrapper.firstChild;
        this.renderTo.appendChild(this.$el);
        this.rendered && (this.rendered());
    }
}
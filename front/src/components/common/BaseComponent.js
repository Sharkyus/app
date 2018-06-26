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
    constructor(data){
        Object.assign(this, data);

        this._checkProps();
        console.log(this.data);
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
    }
}
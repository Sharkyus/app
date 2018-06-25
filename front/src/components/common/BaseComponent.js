const errors = [
    {
        prop: 'template',
        message: "Template required"
    }
];

export default class BaseComponent{
    constructor(data){
        Object.assign(this, data);
        this._checkProps();
    }
    _checkProps(){
        errors.forEach(error=>{
            if (!this[error.prop]) throw new Error(error.message);
        });
    }
}
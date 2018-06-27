/**
 * Created by sharkyus on 2/1/2017.
 */

let { Image } = require(`${process.cwd()}/src/models`);
let _ = require('lodash');

class ImagesService{
    constructor(app){
        app.get('/api/images', (req, res)=>{
            res.send([1,2,3])
        });
    }
}

module.exports = ImagesService;

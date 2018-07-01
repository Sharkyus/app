/**
 * Created by sharkyus on 2/1/2017.
 */

let { Image } = require(`${process.cwd()}/src/models`),
    sharp = require('sharp'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

class ImagesService{
    constructor(app){
        app.get('/api/images', async(req, res)=>{
            this.imagesBuffers = [];

            let { limit, offset, width: imageWidth, typeImg } = req.query;
            let images = await Image.findAll({ limit: Number(limit), offset: Number(offset), raw: true });

            let promises = [];
            images.forEach((image)=>{
                image.url = `${req.protocol}://${req.get('host')}/${image.name}`;
                let processPromise = this.createTempImage(`${process.cwd()}/public/original/${image.name}`, Number(imageWidth), typeImg === "progressive");
                processPromise.then((buffer)=>{
                    this.imagesBuffers[image.name] = buffer;
                });
                promises.push(processPromise);
            });

            await Promise.all(promises);
            res.send(images);
        });

        app.get('/:image', (req, res)=>{
            res.send(this.imagesBuffers[req.params.image]);
            delete this.imagesBuffers[req.params.image];
        });
    }
    createTempImage(src, width, progressive){
        // let imageName = path.basename(src);
        // return sharp(src).resize(width).toFile(`${process.cwd()}/public/temp/${imageName}`);

        return sharp(src).resize(width).jpeg({ progressive }).toBuffer();
    }
}

module.exports = ImagesService;

/**
 * Created by sharkyus on 2/1/2017.
 */

let { Image, sequelize } = require(`${process.cwd()}/src/models`),
    sharp = require('sharp'),
    _ = require('lodash');

class ImagesService{
    constructor(app){
        app.get('/api/images', async(req, res)=>{
            this.imagesBuffers = [];

            let { limit, offset, width: imageWidth, typeImg } = req.query;
            let images = await Image.findAll({ limit: Number(limit), offset: Number(offset), raw: true, fields: ['id', 'name'] });

            let promises = [];
            images.forEach((image)=>{
                image.url = `${req.protocol}://${req.get('host')}/${image.name}`;
                let processPromise = this.createTempImage(`${process.cwd()}/public/original/${image.name}`, Number(imageWidth), image.rotate, typeImg === "progressive");
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

        app.put('/api/images', async(req, res)=>{
            let { items, globalRotate } = req.body;
            let imgIds = items.map(img=>img.id);
            let casesList = [];

            items.forEach((img)=>{
                if (!(_.isNumber(img.id) && _.isNumber(img.rotate))) return;
                casesList.push(`WHEN ${img.id} THEN (360+(\`rotate\`+${img.rotate}))%360`);
            });

            try {
                await sequelize.query(
                    `UPDATE \`image\` SET \`rotate\`= ( CASE id ${casesList.join(' ')} END ) WHERE id IN (?)`,
                    { replacements: [imgIds], type: sequelize.QueryTypes.UPDATE }
                );
                if (globalRotate) {
                    await sequelize.query(
                        'UPDATE `image` SET `rotate`=`rotate`+? WHERE id NOT IN (?)',
                        { replacements: [globalRotate, imgIds], type: sequelize.QueryTypes.UPDATE }
                    );
                }
            } catch (e) {
                res.send(false);
            }
            res.send(true);
        });
    }
    async createTempImage(src, size, angle, progressive){
        let image = sharp(src);
        await image.rotate(angle);
        let imageBuffer = await image.toBuffer(),
            rotatedImage = sharp(imageBuffer),
            { width, height } = await rotatedImage.metadata();
        await rotatedImage.resize(width > height ? size : null, width <= height ? size : null);
        return rotatedImage.jpeg({ progressive }).toBuffer();
    }
}

module.exports = ImagesService;

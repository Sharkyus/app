let fs = require('fs'),
    path = require('path'),
    request = require('request'),
    uuid = require('uuid'),
    sharp = require('sharp'),

    targetCount = 100,
    downloadedCountPerIteration = 30,
    sizes = [800, 600];



const getRandomInt = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const download = (uri, path)=>{
    return new Promise((resolve)=>{
        request.head(uri, ()=>{
            request(uri).pipe(fs.createWriteStream(path)).on('close', resolve);
        });
    });
};


// const createThumbs = (src, sizes) => {
//     sizes.forEach((width)=>{
//         let pathToFolder = createFolder(`thumb_${width}`);
//         sharp(src).resize(width).toFile(`${pathToFolder}/${path.basename(src)}`);
//     });
// };

const createFolder = (name) => {
    let folderPath = `${process.cwd()}/public/${name}`;
    if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
    }
    return folderPath;
};


let { Image } = require('./src/models');
const startDownload = async() => {
    let imagesPath = createFolder('original');

    let i = 0;
    while(i < targetCount) {
        let promises = [];

        for(let j = 0; j < downloadedCountPerIteration; j++) {

            let width = [1280,1100,900][getRandomInt(0,2)],
                height = [900,740,600][getRandomInt(0,2)],
                name = `${uuid()}.jpg`,
                filePath = `${imagesPath}/${name}`;

            Image.create({ name, width, height, angle: 0 });

            let dlPromise = download(`https://picsum.photos/${width}/${height}/?random`, filePath);
            // dlPromise.then(()=>{
            //     createThumbs(filePath, sizes);
            // });
            promises.push(dlPromise);
            i++;

            if (i === targetCount) break;
        }

        await Promise.all(promises);
        console.log(`Downloaded count ${i}`);
    }
};

startDownload();
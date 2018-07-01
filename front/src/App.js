import Wall from "@/components/Wall";
import ApiService from "@/lib/ApiService";
import "styles/app.less";

export default class App{
    constructor(selector){
        this.$el = document.querySelector(selector);
        this.wall = new Wall({ renderTo: this.$el });

        this.fetchData();
    }
    async fetchData(){
        try {
            let images = await ApiService.send('/images?limit=20&offset=0&width=300&typeImg=progressive', { method: 'GET' });
            this.wall.addImages(images);
        } catch (e) {

        }
    }
    getDevicePixelRatio(){

    }
    _isMobile(){

    }
}
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
            let images = await ApiService.send('/images', { method: 'GET' });
            // this.wall.addImages(images);
        } catch (e) {

        }
    }
}
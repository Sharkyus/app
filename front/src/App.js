import Wall from "@/components/Wall";

export default class App{
    constructor(selector){
        this.$el = document.querySelector(selector);
        this.wall = new Wall({ renderTo: this.$el });
    }
}
import Wall from "@/components/Wall";
import ControlsPanel from "@/components/ControlsPanel";

import ApiService from "@/lib/ApiService";
import "styles/app.less";

export default class App{
    constructor(selector){
        this.limit = 20;
        this.offset = 0;
        this.loadingImages = false;
        this.endReached = false;

        this.$el = document.querySelector(selector);
        this.wall = new Wall({ renderTo: this.$el });
        this.controlsPanel = new ControlsPanel({ renderTo: this.$el });


        this._bindEvents();

        this._fetchData(this.limit, this.offset, 250);
    }
    async _fetchData(limit, offset, imageWidth, renderType = "progressive"){
        if (this.endReached || this.loadingImages) return;

        try {
            this.loadingImages = true;
            let images = await ApiService.send(`/images?limit=${limit}&offset=${offset}&width=${imageWidth}&typeImg=${renderType}`, { method: 'GET' });
            this.wall.addImages(images);
            this.endReached = images.length < limit;
            this.loadingImages = false;
        } catch (e) {

        }
    }
    _bindEvents(){
        this.controlsPanel.on('rotate:left', ::this._onRotateLeft);
        this.controlsPanel.on('rotate:right', ::this._onRotateRight);
        window.addEventListener('scroll', ::this._onScroll);
    }
    _getDevicePixelRatio(){

    }
    _isMobile(){

    }
    _onRotateRight(){
        this.wall.rotateSelectedImages(90);
    }
    _onRotateLeft(){
        this.wall.rotateSelectedImages(-90);
    }
    _onScroll(e){
        if (this.endReached || this.loadingImages) return;

        let { offsetHeight, scrollTop, clientHeight } = e.target.scrollingElement;

        if ((offsetHeight - (scrollTop + clientHeight)) < 300) {
            this.offset = this.limit + this.offset;
            this._fetchData(this.limit, this.offset, 250);
        }
    }
}
import Wall from "@/components/Wall";
import ControlsPanel from "@/components/ControlsPanel";
import Helpers from "@/lib/Helpers";
import _ from 'lodash';
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

        this._flushRotationsDataDebounce = _.debounce(this._flushRotationsData, 500);

        this._bindEvents();
        this._fetchData(this.limit, this.offset, this._getThumbSize());
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
            alert("Fetch error");
        }
    }
    _updateImagesRotations(data){
        return ApiService.send(`/images`, { method: 'PUT' }, data);
    }
    _getThumbSize(){
        if (Helpers.isMobileOrTablet()) {
            return Math.max(
                        window.innerHeight/this._getThumbsCountInLine(window.innerHeight),
                        window.innerWidth/this._getThumbsCountInLine(window.innerWidth)
                    ) * Helpers.getDevicePixelRatio();
        }

        return 250 * Helpers.getDevicePixelRatio();
    }
    _getThumbsCountInLine(size){
        switch(true){
            case size <= 411: return 2;
            case size > 411 && size <= 767 && window.innerWidth > window.innerHeight: return 6;
            case size > 411 && size <= 767 && window.innerWidth < window.innerHeight: return 4;
            case size > 767 && size <= 1023: return 4;
            default: return 6;
        }
    }
    _bindEvents(){
        this.controlsPanel.on('rotate-left', this._onClickRotate.bind(this, -90));
        this.controlsPanel.on('rotate-right', this._onClickRotate.bind(this, 90));

        if (Helpers.isMobileOrTablet()){
            this.wall.$el.addEventListener('touchstart', ::this._discardThumbsOptimization);
        } else {
            this.wall.$el.addEventListener('mousedown', ::this._discardThumbsOptimization);
        }
        this.controlsPanel.on('prepare-click', ::this._optimizeThumbsRotate);
        this.controlsPanel.on('prepare-click-discard', ::this._discardThumbsOptimization);

        window.addEventListener('scroll', ::this._onScroll);
        window.addEventListener('resize', ::this._onWindowResize);
    }
    _flushRotationsData(){
        let rotatedImagesData = this.wall.getRotatedImagesData();
        let globalRotate = this.wall.getGlobalRotate();
        if (rotatedImagesData.length) {
            this._updateImagesRotations({ items: rotatedImagesData, globalRotate});
            this.wall.resetRotations();
        }
    }
    _onClickRotate(deg){
        if (this.wall.hasSelectedImages()){
            this.wall.rotateSelectedThumbs(deg);
        } else {
            this.wall.rotateAllThumbs(deg);
        }

        this._flushRotationsDataDebounce();
    }
    _onScroll(e){
        this._checkNextFetch(e);
        if (this.rotateThubmsOptimized) {
            this._discardThumbsOptimization();
        }
    }
    _optimizeThumbsRotate(){
        this.rotateThubmsOptimized = true;
        this.$el.classList.add('optimize-thumbs-rotate');
    }
    _discardThumbsOptimization(){
        this.rotateThubmsOptimized = false;
        this.$el.classList.remove('optimize-thumbs-rotate');
    }
    _checkNextFetch(e){
        if (this.endReached || this.loadingImages) return;
        let { offsetHeight, scrollTop, clientHeight } = e.target.scrollingElement;

        if ((offsetHeight - (scrollTop + clientHeight)) < 300) {
            this.offset = this.limit + this.offset;
            this._fetchData(this.limit, this.offset, this._getThumbSize());
        }
    }
    _onWindowResize(){
        this.wall.updateImagesSizes();
    }
}
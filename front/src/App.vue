<template>
    <div class="app" :class="{ 'app_optimize-thumbs-rotate': rotateThubmsOptimized }">
        <Wall :images="images"
              @touchstart="_discardThumbsOptimization"
              @mousedown="_discardThumbsOptimization"
              @thumb-toggle-select="_onThumbToggleSelect"
              ref="wall"
        />
        <ControlsPanel @rotate-left="_onClickRotate(-90)"
                       @rotate-right="_onClickRotate(90)"
                       @prepare-click="_optimizeThumbsRotate"
        />
    </div>
</template>

<script>
    import Wall from '@/components/Wall';
    import ControlsPanel from '@/components/ControlsPanel';

    import Helpers from '@/lib/Helpers';
    import _ from 'lodash';
    import { mapState, mapActions, mapMutations } from 'vuex';

    export default {
        name: "App",
        components: {
            Wall, ControlsPanel
        },
        data(){
            return {
                rotateThubmsOptimized: false
            }
        },
        computed: {
            ...mapState('images', ['limit', 'offset', 'endReached',
                'fetchStarted', 'images', 'hasSelectedImages', 'globalRotate'])
        },
        mounted(){
            this._flushRotationsDataDebounce = _.debounce(this._flushRotationsData, 500);
            this._fetchData(this.limit, this.offset, this._getThumbSize());
            this._bindEvents();
        },
        methods: {
            ...mapActions('images', ['fetchImages', 'updateImagesRotations']),
            ...mapMutations('images', ['toggleSelectImage', 'rotateSelectedImages', 'rotateAllImages', 'resetRotations']),

            _fetchData(limit, offset, imageWidth, renderType = "progressive"){
                if (this.endReached || this.fetchStarted) return;

                try {
                    this.fetchImages({ limit, offset, renderType, imageWidth });
                } catch (e) {
                    alert("Fetch error");
                }
            },
            _getThumbSize(){
                if (Helpers.isMobileOrTablet()) {
                    return Math.max(
                        window.innerHeight/this._getThumbsCountInLine(window.innerHeight),
                        window.innerWidth/this._getThumbsCountInLine(window.innerWidth)
                    ) * Helpers.getDevicePixelRatio();
                }

                return 250 * Helpers.getDevicePixelRatio();
            },
            _getThumbsCountInLine(size){
                switch(true){
                    case size <= 411: return 2;
                    case size > 411 && size <= 767 && window.innerWidth > window.innerHeight: return 6;
                    case size > 411 && size <= 767 && window.innerWidth < window.innerHeight: return 4;
                    case size > 767 && size <= 1023: return 4;
                    default: return 6;
                }
            },
            _updateImagesRotations(data){
                return this.updateImagesRotations(data);
            },
            _bindEvents(){
                window.addEventListener('scroll', ::this._onScroll);
                window.addEventListener('resize', ::this._onWindowResize);
            },
            _getRotatedImagesData(){
                return this.images.filter(img=>img.dbRelativeRotate)
                    .map(img=>({ id: img.id, rotate: img.dbRelativeRotate }));
            },
            _flushRotationsData(){
                let rotatedImagesData = this._getRotatedImagesData();
                let globalRotate = this.globalRotate;
                if (rotatedImagesData.length) {
                    this._updateImagesRotations({ items: rotatedImagesData, globalRotate});
                    this.resetRotations();
                }
            },
            _onClickRotate(deg){
                if (this.hasSelectedImages){
                    this.rotateSelectedImages(deg);
                } else {
                    this.rotateAllImages(deg);
                }

                this._flushRotationsDataDebounce();
            },
            _onScroll(e){
                this._checkNextFetch(e);
                if (this.rotateThubmsOptimized) {
                    this._discardThumbsOptimization();
                }
            },
            _optimizeThumbsRotate(){
                this.rotateThubmsOptimized = true;
            },
            _discardThumbsOptimization(){
                this.rotateThubmsOptimized = false;
            },
            _checkNextFetch(e){
                if (this.endReached || this.fetchStarted) return;
                let { offsetHeight, scrollTop, clientHeight } = e.target.scrollingElement;

                if ((offsetHeight - (scrollTop + clientHeight)) < 300) {
                    this._fetchData(this.limit, this.offset, this._getThumbSize());
                }
            },
            _onThumbToggleSelect([id, selected]){
                this.toggleSelectImage({ id, selected });
            },
            _onWindowResize(){
                this.$refs.wall.updateImagesSizes();
            }
        }
    }
</script>
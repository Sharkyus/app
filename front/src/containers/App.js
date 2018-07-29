import React from 'react';
import { connect } from 'react-redux';
import { fetchImages, updateImagesRotations, resetRotations,
    toggleSelectImage, rotateSelectedImages, rotateAllImages } from "@/redux/modules/images/actions";
import _ from 'lodash';
import Wall from '@/components/Wall';
import ControlsPanel from '@/components/ControlsPanel';
import Helpers from '@/lib/Helpers';
import classnames from 'classnames';
import '@/styles/app';

@connect((state)=>{
    return state.images;
}, { fetchImages, updateImagesRotations, resetRotations,
    toggleSelectImage, rotateSelectedImages, rotateAllImages })

export default class App extends React.Component{
    constructor() {
        super();
        this._flushRotationsDataDebounce = _.debounce(this._flushRotationsData, 500);

        this.state = this._getInitialState();
    }
    _getInitialState(){
        return {
            rotateThubmsOptimized: false
        }
    }
    componentDidMount(){
        let { limit, offset } = this.props;
        this._fetchData(limit, offset, this._getThumbSize());
        this._bindEvents();
    }
    _fetchData(limit, offset, imageWidth, renderType = "progressive"){
        let { endReached, fetchStarted, fetchImages } = this.props;
        if (endReached || fetchStarted) return;

        try {
            fetchImages(limit, offset, renderType, imageWidth);
        } catch (e) {
            alert("Fetch error");
        }
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
    _updateImagesRotations(data){
        return this.props.updateImagesRotations(data);
    }
    _bindEvents(){
        window.addEventListener('scroll', ::this._onScroll);
        window.addEventListener('resize', ::this._onWindowResize);
    }
    _getRotatedImagesData(){
        return this.props.images.filter(img=>img.dbRelativeRotate)
            .map(img=>({ id: img.id, rotate: img.dbRelativeRotate }));
    }
    _flushRotationsData(){
        let rotatedImagesData = this._getRotatedImagesData();
        let globalRotate = this.props.globalRotate;
        if (rotatedImagesData.length) {
            this._updateImagesRotations({ items: rotatedImagesData, globalRotate});
            this.props.resetRotations();
        }
    }
    _onClickRotate(deg){
        let { hasSelectedImages, rotateSelectedImages, rotateAllImages } = this.props;

        if (hasSelectedImages){
            rotateSelectedImages(deg);
        } else {
            rotateAllImages(deg);
        }

        this._flushRotationsDataDebounce();
    }
    _onScroll(e){
        this._checkNextFetch(e);
        if (this.state.rotateThubmsOptimized) {
            this._discardThumbsOptimization();
        }
    }
    _optimizeThumbsRotate(){
        this.setState({ rotateThubmsOptimized: true });
    }
    _discardThumbsOptimization(){
        this.setState({ rotateThubmsOptimized: false });
    }
    _checkNextFetch(e){
        let { endReached, fetchStarted, limit, offset } = this.props;

        if (endReached || fetchStarted) return;
        let { offsetHeight, scrollTop, clientHeight } = e.target.scrollingElement;

        if ((offsetHeight - (scrollTop + clientHeight)) < 300) {
            this._fetchData(limit, offset, this._getThumbSize());
        }
    }
    _onThumbToggleSelect(id, selected){
        this.props.toggleSelectImage(id, selected);
    }
    _onWindowResize(){
        this.refs.wall.updateImagesSizes();
    }
    render(){
        let { images } = this.props;
        let { rotateThubmsOptimized } = this.state;

        let wallEvents = {
            [ Helpers.isMobileOrTablet() ? 'onTouchStart' : 'onMouseDown' ]: ::this._discardThumbsOptimization
        };
        let classes = classnames("app", { "app_optimize-thumbs-rotate": rotateThubmsOptimized });

        return (
            <div className={ classes }>
                <Wall ref="wall"
                      images={ images }
                      onThumbToggleSelect={ ::this._onThumbToggleSelect }
                      { ...wallEvents }
                />
                <ControlsPanel onRotateLeft={()=>{ this._onClickRotate(-90); }}
                               onRotateRight={()=>{ this._onClickRotate(90); }}
                               onPrepareClick={()=>{ this._optimizeThumbsRotate() }}
                />
            </div>
        )
    }
}
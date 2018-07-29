import React from 'react';
import ImageThumb from './ImageThumb';
import PropTypes from 'prop-types';
import Helpers from '@/lib/Helpers';

export default class Wall extends React.Component{
    static propTypes = {
        images: PropTypes.array,
        onTouchStart: PropTypes.func,
        onMouseDown: PropTypes.func
    };

    static defaultProps = {
        images: [],
        onTouchStart:()=>{},
        onMouseDown:()=>{}
    };

    constructor(){
        super();

        this.globalRotate = 0;
        this.thumbs = [];
        this.selectedThumbs = [];
    }
    updateImagesSizes(){
        this.thumbs.forEach((tb)=>{
            tb.updateImageSize();
        });
    }
    getRotatedImagesData(){
        return this.thumbs.filter(tb=>tb.getRotateAngle())
            .map(tb=>({ id: tb.props.data.id, rotate: tb.getRotateAngle() }));
    }
    rotateSelectedThumbs(deg){
        this.selectedThumbs.forEach((thumb)=>{
            thumb.rotate(deg);
        });
    }
    rotateAllThumbs(deg){
        this.globalRotate = Helpers.simplifyAngle(this.globalRotate + deg);
        this.thumbs.forEach((thumb)=>{
            thumb.rotate(deg);
        });
    }
    getGlobalRotate(){
        return this.globalRotate;
    }
    resetRotations(){
        this.globalRotate = 0;
        this.thumbs.filter(tb=>tb.resetRotate())
    }
    hasSelectedImages(){
        return !!this.selectedThumbs.length;
    }
    updateImagesSizes(){
        this.thumbs.forEach((tb)=>{
            tb.updateImageSize();
        });
    }
    _onThumbToggleSelect(thumb, selected){
        if (selected){
            return this.selectedThumbs.push(thumb);
        }

        this.selectedThumbs.splice(this.selectedThumbs.indexOf(thumb), 1);
    }
    renderImages(images = []){
        return images.map(imgData => {
            return <ImageThumb data={ imgData }
                               key={ imgData.id }
                               ref={ thumb => {
                                   if (!thumb) return;
                                   if (!this.thumbs.includes(thumb)){
                                       this.thumbs.push(thumb);
                                   }
                               }}
                               onToggleSelected={ ::this._onThumbToggleSelect }
            />;
        })
    }
    render(){
        let { images } = this.props;

        return (
            <div className="wall"
                 onTouchStart={ this.props.onTouchStart }
                 onMouseDown={ this.props.onMouseDown }
            >
                { this.renderImages(images) }
            </div>
        )
    }
}
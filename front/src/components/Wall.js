import React from 'react';
import ImageThumb from './ImageThumb';
import PropTypes from 'prop-types';

export default class Wall extends React.Component{
    static propTypes = {
        images: PropTypes.array,
        onTouchStart: PropTypes.func,
        onMouseDown: PropTypes.func
    };

    static defaultProps = {
        images: [],
        onTouchStart:()=>{},
        onMouseDown:()=>{},
        onThumbToggleSelect:()=>{}
    };

    constructor(){
        super();

        this.globalRotate = 0;
        this.thumbs = [];
    }
    updateImagesSizes(){
        this.thumbs.forEach((tb)=>{
            tb.updateImageSize();
        });
    }
    resetRotations(){
        this.globalRotate = 0;
        this.thumbs.filter(tb=>tb.resetRotate())
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
                               onToggleSelected={ ::this.props.onThumbToggleSelect }
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
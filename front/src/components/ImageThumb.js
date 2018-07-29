import React from 'react';
import ReactDOM from 'react-dom';
import Helpers from '@/lib/Helpers';
import classnames from 'classnames';
import PropTypes from "prop-types";

export default class ImageThumb extends React.Component{
    static propTypes = {
        data: PropTypes.object.isRequired,
        onToggleSelect: PropTypes.func
    };

    static defaultProps = {
        onToggleSelect:()=>{}
    };

    constructor(){
        super();
        this.state = this._getInitialState();
        this.dbRelativeRotate = 0;
    }
    _getInitialState(){
        return {
            loaded: false,
            imageWidth: '',
            imageHeight: '',
            rotateDeg: 0,
            selected: false
        }
    }
    rotate(deg = 0){
        this.setState({
            rotateDeg: Helpers.simplifyAngle(this.state.rotateDeg + deg)
        });

        this.dbRelativeRotate = Helpers.simplifyAngle(this.dbRelativeRotate + deg);
    }
    getRotateAngle(){
        return this.dbRelativeRotate;
    }
    resetRotate(){
        this.dbRelativeRotate = 0
    }
    updateImageSize(){
        let { image } = this.refs;

        let {width, height} = ReactDOM.findDOMNode(this).getBoundingClientRect();
        if (image.naturalWidth > image.naturalHeight){
            this.setState({
                imageWidth: `${Math.min(width, height)}px`,
                imageHeight: 'auto',
            });
        } else {
            this.setState({
                imageHeight: `${Math.min(width, height)}px`,
                imageWidth: 'auto',
            });
        }
    }
    _onImageLoaded(){
        this.setState({ loaded: true });
        this.updateImageSize();
    }
    _onItemClick(){
        let selected = !this.state.selected;
        this.setState({ selected });
        this.props.onToggleSelected(this, selected);
    }
    render(){
        let { data } = this.props;
        let { loaded, imageWidth, imageHeight, rotateDeg, selected } = this.state;

        let classes = classnames("image-thumb", { "loading": !loaded, "image-thumb_selected": selected });

        return (
            <div className={ classes } onClick={ ::this._onItemClick }>
                <img className="image-thumb__image"
                     src={ data.url }
                     alt={ data.name }
                     onLoad={ ::this._onImageLoaded }
                     style={{
                         width: imageWidth,
                         height: imageHeight,
                         transform: `rotate(${rotateDeg}deg)`
                     }}
                     ref="image"/>
            </div>
        )
    }
}
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
        let { id, selected } = this.props.data;
        this.props.onToggleSelected(id, !selected);
    }
    render(){
        let { url, name, selected, rotateDeg } = this.props.data;
        let { loaded, imageWidth, imageHeight } = this.state;

        let classes = classnames("image-thumb", { "loading": !loaded, "image-thumb_selected": selected });

        return (
            <div className={ classes } onClick={ ::this._onItemClick }>
                <img className="image-thumb__image"
                     src={ url }
                     alt={ name }
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
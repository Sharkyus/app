import React from 'react';
import { connect } from 'react-redux';
import { fetchImages, rotateImages } from "./redux/modules/images/actions";
import '@/styles/app';

@connect((state)=>{
    return {

    }
}, { fetchImages, rotateImages })

export default class App extends React.Component{
    render(){
        return <div>App</div>;
    }
}
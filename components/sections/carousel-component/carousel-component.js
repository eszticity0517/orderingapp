import React, {Component} from 'react';
import {Image, View} from 'react-native';
import Carousel from 'react-native-looped-carousel';
import '../../../global.js';

export class CarouselComponent extends Component
{
    constructor()
    {
        super();
        this.state = {
            size: global.size,
        };
    }

    render()
    {
        return (
            <View>
                <Carousel
                    delay={3000}
                    style={this._renderCarouselImageStyle()}
                    autoplay
                >
                    <Image source={require('../../../Sources/Carousel/image_0001.png')} style={this._renderCarouselImageStyle()} />
                    <Image source={require('../../../Sources/Carousel/image_0002.png')} style={this._renderCarouselImageStyle()} />
                    <Image source={require('../../../Sources/Carousel/image_0003.png')} style={this._renderCarouselImageStyle()} />
                    <Image source={require('../../../Sources/Carousel/image_0004.png')} style={this._renderCarouselImageStyle()} />
                    <Image source={require('../../../Sources/Carousel/image_0005.png')} style={this._renderCarouselImageStyle()} />
                </Carousel>
            </View>
        );
    }

    _renderCarouselImageStyle()
    {
        return ({ opacity: 0.4, width: this.state.size.width - 20 * 2, height: this.state.size.height / 3 });
    }
}

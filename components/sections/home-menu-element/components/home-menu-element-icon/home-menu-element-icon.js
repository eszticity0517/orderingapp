import React, { PureComponent } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './home-menu-element-icon-scss';

export class HomeMenuElementIcon extends PureComponent
{
    render()
    {
        return (
            <TouchableOpacity style={{ flex: 0.5 }} onPress={this.props.onPress.bind(this)}>
                <Image source={this.props.source} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
        );
    }
}

import React, { Component } from 'react';
import { Image, View} from 'react-native';
import mainStyles from '../../../../../main-styles.scss';
import styles from './product-image.scss';

export class ProductImage extends Component
{
    render()
    {
        return (
            <View style={mainStyles.imageIconContainer}>
                <Image source={{ uri: this.props.product.image }} style={styles.image} />
            </View>
        );
    }
}

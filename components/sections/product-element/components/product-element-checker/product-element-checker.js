import React, { Component } from 'react';
import { Image, TouchableOpacity, View} from 'react-native';
import styles from './product-element-checker.scss';

export class ProductElementChecker extends Component
{
    render()
    {
        return (
            <View style={styles.checkerContainer}>
                <TouchableOpacity style={styles.touchable} onPress={() => this.props.onCheck(this.props.product.uid)}>
                    <Image source={this.renderSource()} style={styles.image} />
                </TouchableOpacity>
            </View>
        );
    }

    renderSource()
    {
        return (this.props.product.mennyiseg ?
            require('../../../../../Sources/OrderInProgress/bin2.png')
            :
            require('../../../../../Sources/Products/cart_over.png')
        );
    }
}
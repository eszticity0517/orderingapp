import React, { Component } from 'react';
import { Image, TouchableOpacity, View, StyleSheet} from 'react-native';


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
            require('../../../../Sources/OrderInProgress/bin2.png')
            :
            require('../../../../Sources/Products/cart_over.png')
        );
    }
}

export const styles = StyleSheet.create({
    checkerContainer: {
        flex: 0.1,
        height: 20 * 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    touchable:  {
        backgroundColor: '#e4eef0',
        height: 20 * 3.5,
        width: '100%',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'white',
        alignItems: 'center',
    },
    image: {
        width: Math.round(20 / 1.5),
        height: Math.round(20 / 1.5),
        opacity: 0.5,
    },
});

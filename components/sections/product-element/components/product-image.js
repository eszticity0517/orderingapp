import React, { Component } from 'react';
import { Image, View, StyleSheet} from 'react-native';

export class ProductImage extends Component
{
    render()
    {
        return (
            <View style={styles.imageContainer}>
                <Image source={{ uri: this.props.product.image }} style={styles.image} />
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    imageContainer: {
        flex: 0.3,
        height: 20 * 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    image: {
        width: 30,
        height: 40,
    },
});


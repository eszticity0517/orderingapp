import React, {Component} from 'react';
import { Text, View, StyleSheet} from 'react-native';

export class OrderElementDetails extends Component {
    render()
    {
        return (
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.thickerGreenText}>{this.props.createDate}</Text>
                <Text numberOfLines={1} style={styles.productText}>({this.props.products}</Text>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    thickerGreenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
    container: {
        flex: 5,
        height: 80,
        justifyContent: 'center',
    },
    productText: {
        fontStyle: 'italic'
    }
});

import React, {Component} from 'react';
import { Text, View, StyleSheet} from 'react-native';
import mainStyles from '../../../../main-styles.scss';

export class OrderElementDetails extends Component {
    render()
    {
        return (
            <View style={styles.container}>
                <Text numberOfLines={1} style={mainStyles.thickerGreenText}>{this.props.createDate}</Text>
                <Text numberOfLines={1} style={styles.productText}>({this.props.products}</Text>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 5,
        height: 80,
        justifyContent: 'center',
    },
    productText: {
        fontStyle: 'italic'
    }
});

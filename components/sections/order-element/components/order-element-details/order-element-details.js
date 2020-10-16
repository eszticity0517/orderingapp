import React, {Component} from 'react';
import { Text, View} from 'react-native';
import mainStyles from '../../../../../main-styles.scss';
import styles from './order-element-details.scss';

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
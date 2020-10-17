import React, {Component} from 'react';
import {Image, View} from 'react-native';
import styles from './search-field-container.scss';
import mainStyles from '../../../main-styles.scss';

export class SearchFieldContainer extends Component
{
    render()
    {
        return (
            <View style={styles.searchFieldContainer}>
                    <View style={{ flex: 0.1}}>
                        <Image source={require('../../Sources/Products/search_over.png')} style={mainStyles.smallImage} />
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.props.children}
                    </View>
            </View>
        );
    }
}
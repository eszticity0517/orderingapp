import React, {Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';

export class SearchFieldContainer extends Component
{
    render()
    {
        return (
            <View style={styles.searchFieldContainer}>
                    <View style={{ flex: 0.1}}>
                        <Image source={require('../../Sources/Products/search_over.png')} style={{ width: 20 / 1.5, height: 20 / 1.5 }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.props.children}
                    </View>
            </View>
        );
    }
}


export const styles = StyleSheet.create({
    searchFieldContainer: {
        marginTop: 20 / 2,
        marginBottom: 20 / 2,
        height: 50,
        backgroundColor: '#e4eef0',
        borderRadius: 20 * 2,
        paddingTop: 20 / 2,
        paddingBottom: 20 / 2,
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
});

import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import '../../../../global.js';
import {OpeningMenuElement} from '../../opening-menu-element';

export class HeaderMenuComponent extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    render() {
        return (
            <View style={styles.openingMenuContainer}>

                <OpeningMenuElement
                    source={require('../../../../Sources/Openingmenu/home_100px.png')}
                    text="Home"
                    onPress={() => this.onPress('Home')}
                />

                <OpeningMenuElement
                    source={require('../../../../Sources/Openingmenu/star_100px.png')}
                    text="Kedvencek"
                    onPress={() => this.onPress('Favourites')}
                />

                <OpeningMenuElement
                    source={require('../../../../Sources/Openingmenu/shopping_cart_100px.png')}
                    text="Kosár"
                    onPress={this.onBasketPress.bind(this)}
                />

                <OpeningMenuElement
                    source={require('../../../../Sources/Openingmenu/chat_100px.png')}
                    text="Üzenetek"
                    onPress={() => this.onPress('Chat')}
                />

                <OpeningMenuElement
                    source={require('../../../../Sources/Openingmenu/gender_neutral_user_100px.png')}
                    text="Profil"
                    onPress={() => this.onPress('Profile')}
                />

            </View>
        );
    }

    onPress(value) {
        // Call this to close the menu.
        this.props.onMenuOpenPress();
        this.props.navigation.navigate(value);
    }

    onBasketPress() {
        global.getData('cart').then(cart => {
            if (cart === null) {
                this.props.onMenuOpenPress();
                this.props.navigation.navigate('EmptyCart');
            }
            else {
                this.props.onMenuOpenPress();
                this.props.navigation.navigate('OrderInProgress');
            }
        });
    }
}

export const styles = StyleSheet.create({
    openingMenuContainer: {
        zIndex: 2,
        backgroundColor: 'white',
        width: '100%',
        position: 'absolute',
        marginTop: 20 * 2,
        borderTopWidth: 3,
        borderTopColor: 'black',
    },
});

AppRegistry.registerComponent('HeaderMenuComponent', () => HeaderMenuComponent);

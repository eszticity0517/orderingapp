import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {ButtonContainer} from '../../common/button-component';
import '../../../global';
import {StyleSheet} from 'react-native';
import { FooterImage } from './components/footer-image';

export class FooterComponent extends Component
{
    render()
    {
        return (
            <ButtonContainer hidden={this.props.hidden} style={styles.footerButtonContainer}>
                <View style={{ height: 40, width: '100%', backgroundColor: 'black', flexDirection: 'row', alignSelf: 'stretch' }}>
                    <FooterImage source={require('../../../Sources/Footermenu/home_100px.png')} />
                    <FooterImage source={require('../../../Sources/Footermenu/star_100px.png')} />
                    <FooterImage source={require('../../../Sources/Footermenu/shopping_cart_100px.png')} />
                    <FooterImage source={require('../../../Sources/Footermenu/chat_100px.png')} />
                    <FooterImage source={require('../../../Sources/Footermenu/gender_neutral_user_100px.png')} />
                </View>
            </ButtonContainer>
        );
    }

    onPress(value)
    {
        this.props.navigation.navigate(value);
    }

    onBasketPress()
    {
        var orderstate;

        global.getData('basket').then(basket => {
            if (basket === null)
            {
                orderstate = 'EmptyBasket';
            }
            else {
                orderstate = 'OrderInProgress';
            }

            this.props.navigation.navigate(orderstate);
        });
    }
}

export const styles = StyleSheet.create({
    footerButtonContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'stretch',
        right: 0,
        left: 0,
        zIndex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        bottom: 12
    },
});


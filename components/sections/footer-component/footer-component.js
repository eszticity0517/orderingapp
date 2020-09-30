import React, {Component} from 'react';
import {View} from 'react-native';
import {ButtonContainer} from '../../common/button-container';
import '../../../global';
import {StyleSheet} from 'react-native';
import { FooterIconButton } from './components/footer-icon-button';

export class FooterComponent extends Component
{
    render()
    {
        return (
            <ButtonContainer hidden={this.props.hidden} style={styles.footerButtonContainer}>
                <View style={{ height: 40, width: '100%', backgroundColor: 'black', flexDirection: 'row', alignSelf: 'stretch' }}>
                    <FooterIconButton source={require('../../../Sources/Footermenu/home_100px.png')} onPress={this.onPress.bind(this)} />
                    <FooterIconButton source={require('../../../Sources/Footermenu/star_100px.png')} onPress={this.onPress.bind(this)}/>
                    <FooterIconButton source={require('../../../Sources/Footermenu/shopping_cart_100px.png')} onPress={this.onPress.bind(this)}/>
                    <FooterIconButton source={require('../../../Sources/Footermenu/chat_100px.png')} onPress={this.onPress.bind(this)}/>
                    <FooterIconButton source={require('../../../Sources/Footermenu/gender_neutral_user_100px.png')} onPress={this.onPress.bind(this)}/>
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
        bottom: 12,
    },
});


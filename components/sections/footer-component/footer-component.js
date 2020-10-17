import React, {Component} from 'react';
import {View} from 'react-native';
import {ButtonContainer} from '../../common/button-container';
import '../../../global';
import { FooterIconButton } from './components/footer-icon-button';
import styles from './footer-component.scss';

export class FooterComponent extends Component
{
    render()
    {
        return (
            <ButtonContainer hidden={this.props.hidden} style={styles.footerButtonContainer}>
                <View style={styles.innerContainer}>
                    <FooterIconButton source={require('../../../Sources/Footermenu/home_100px.png')} onPress={() => this.onPress('Home')} />
                    <FooterIconButton source={require('../../../Sources/Footermenu/star_100px.png')} onPress={() => this.onPress('Favourites')}/>
                    <FooterIconButton source={require('../../../Sources/Footermenu/shopping_cart_100px.png')} onPress={() => this.onCartPress()}/>
                    <FooterIconButton source={require('../../../Sources/Footermenu/chat_100px.png')} onPress={() => this.onPress('Chat')}/>
                    <FooterIconButton source={require('../../../Sources/Footermenu/gender_neutral_user_100px.png')} onPress={() => this.onPress('Profile')}/>
                </View>
            </ButtonContainer>
        );
    }

    onPress(value)
    {
        this.props.navigation.navigate(value);
    }

    onCartPress()
    {
        var orderstate;

        global.getData('cart').then(cart => {
            if (cart === null)
            {
                orderstate = 'EmptyCart';
            }
            else
            {
                orderstate = 'OrderInProgress';
            }

            this.props.navigation.navigate(orderstate);
        });
    }
}

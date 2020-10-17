import React, {Component} from 'react';
import {AppState, Text, View, StyleSheet} from 'react-native';
import {HeaderComponent} from './sections/header-component';
import {ButtonComponent} from './common/button-component';
import {ButtonContainer} from './common/button-container';
import {ScrollComponent} from './common/scroll-component';
import {Container} from './common/container';
import AsyncStorage from '@react-native-community/async-storage';
import '../global.js';
import mainStyles from '../main-styles.scss';

export class EmptyCart extends Component
{
    static navigationOptions = {
        headerShown: false,
    };

    constructor()
    {
        super();
        this.state = {
            size: global.size,
            appState: AppState.currentState,
            isMenuOpened: false,
        };
    }

    componentWillMount()
    {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    render()
    {
        return (
            <Container>
                <ScrollComponent appearance="view">
                    <HeaderComponent onMenuOpenPress={this.onMenuOpenPress.bind(this)} isMenuOpened={this.state.isMenuOpened} navigation={this.props.navigation} onPress={(value) => this.onPress('Home')} />
                    <View style={[this._renderButtonContainerStyle()]}>
                        <Text style={mainStyles.welcomeNoMargin}>A kosár üres.</Text>
                    </View>

                </ScrollComponent>
                <ButtonContainer>
                    <ButtonComponent onPress={() => this.onPress('Products')} text="Termékek hozzáadása" />
                </ButtonContainer>
            </Container>
        );
    }

    _renderButtonContainerStyle()
    {
        return ({ justifyContent: 'center', height: (this.state.size.height / 3) * 2 - 80, width: this.state.size.width - 40 });
    }

    componentWillUnmount()
    {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    onMenuOpenPress()
    {
        if (this.state.isMenuOpened)
        {
            this.setState(state =>
            {
                state.isMenuOpened = false;
                return state;
            });
        }
        else
        {
            this.setState(state =>
            {
                state.isMenuOpened = true;
                return state;
            });
        }
    }

    onPress(value)
    {
        this.props.navigation.navigate(value);
    }

    handleAppStateChange = (nextAppState) =>
    {
        if (nextAppState.match(/inactive|background/) && this.state.appState === 'active')
        {
            this.setState({ appState: nextAppState });
            AsyncStorage.setItem('maintainBasket', 'yes').then(() => {
                this.props.navigation.navigate('Login');
            });
        }
    }
}

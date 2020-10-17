import React, { Component } from 'react';
import { AppState, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { HeaderComponent } from './sections/header-component';
import { ButtonComponent } from './common/button-component';
import { ScrollComponent } from './common/scroll-component';
import '../global.js';
import { Container } from './common/container';
import { ButtonContainer } from './common/button-container';
import mainStyles from '../main-styles.scss';

export class OrderIsDone extends Component
{
    static navigationOptions = {
        headerShown: false,
    };

    constructor()
    {
        super();
        this.state = {
            size: global.size,
            szallitasiadatok: '',
            appState: AppState.currentState,
            isMenuOpened: false,
        };
    }

    render()
    {
        return (
            <Container>
                <ScrollComponent appearance="view">
                    <HeaderComponent onMenuOpenPress={this.onMenuOpenPress.bind(this)} isMenuOpened={this.state.isMenuOpened} szallitasiadatok={this.state.szallitasiadatok} navigation={this.props.navigation} onPress={(value) => this.onPress('Home')} />
                    <View style={this._renderButtonContainerStyle()}>
                        <Text style={mainStyles.welcomeNoMargin}>Rendelését rögzítettük.</Text>
                    </View>
                </ScrollComponent>
                <ButtonContainer>
                    <ButtonComponent onPress={() => this.onPress('Orders')} text="Rendben" />
                </ButtonContainer>
            </Container>
        );
    }

    _renderButtonContainerStyle()
    {
        return ({ justifyContent: 'center', height: (this.state.size.height / 3) * 2 - 80, width: this.state.size.width - 40 });
    }

    componentDidMount()
    {
        AppState.addEventListener('change', this._handleAppStateChange);

        if (this.props.navigation.state.params)
        {
            this.setState(state => {
                state.szallitasiadatok = this.props.navigation.state.params.szallitasiadatok;
                return state;
            });
        }
    
        global.removeItemValue('basket');
    }

    componentWillUnmount()
    {
        AppState.removeEventListener('change', this._handleAppStateChange);
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

    _handleAppStateChange = (nextAppState) =>
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

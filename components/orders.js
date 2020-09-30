import React, { Component } from 'react';
import { AppRegistry, AppState, AsyncStorage, Text, View, StyleSheet } from 'react-native';

import { ScrollComponent } from './common/scroll-component';
import { FooterComponent } from './sections/footer-component';
import { OrderElement } from './sections/order-element';
import '../global.js';
import { Indicator } from './common/indicator';
import { Container } from './common/container';
import { SeparatorLine } from './common/separator-line';

export class Orders extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    //#region

    constructor() {
        super();
        this.state = {
            isChecked: false,
            rendelesek: [],
            appState: AppState.currentState,
            loading: false,
            orders: null,
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

        // global.getData('partner_id').then(partnerId =>
        // {
        //     global.getData('vendor').then(vendor =>
        //     {
        //         var values = {
        //             id: JSON.stringify({
        //                 vendor: vendor,
        //                 object: 'rshop',
        //                 method: 'szamlak',

        //                 params: {
        //                     partner_id: parseInt(partnerId),
        //                 },
        //             }),
        //         };

        //         this.setState({loading:true});
        //         var formBody = [];
        //         for (var property in values)
        //         {
        //             var encodedKey = encodeURIComponent(property);
        //             var encodedValue = encodeURIComponent(values[property]);
        //             formBody.push(encodedKey + '=' + encodedValue);
        //         }

        //         formBody = formBody.join('&');
        //         fetch(global.baseUrl, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //             },
        //             body: formBody,
        //         }).then((response) => response.json())
        //             .then((responseJson) =>
        //             {
        //                 this.setState({loading:false});
        //                 if (responseJson.success)
        //                 {
        //                     this.setState({ orders: responseJson.success });
        //                 }
        //             })
        //             .catch((error) =>
        //             {
        //                 this.setState({loading:false});
        //                 console.error(error);
        //             });
        //     });
        // });
    }

    render() {
        var rendelesek = [];

        if (this.state.orders !== null) {
            for (let i = 0; i < this.state.orders.length; i++) {
                if (this.state.orders[i].items !== null) {
                    rendelesek.push(<OrderElement key={i} response={this.state.orders[i]} navigation={this.props.navigation} />);
                }
            }
        }

        return (
            <Container>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{
                        fontSize: 20,
                        margin: 10,
                    }}>Összes rendelés</Text>
                    <SeparatorLine />
                </View>

                <ScrollComponent style={styles.scroll}>
                    {rendelesek}
                </ScrollComponent>

                <FooterComponent navigation={this.props.navigation} />
                <Indicator transparent={false} visible={this.state.loading} />
            </Container>
        );
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    //#endregion

    //#region

    onPress(value) {
        this.props.navigation.navigate(value);
    }

    onCheck() {
        if (this.state.isChecked) {
            this.setState(state => {
                state.isChecked = false;
                return state;
            });
        }
        else {
            this.setState(state => {
                state.isChecked = true;
                return state;
            });
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
            this.setState({ appState: nextAppState });
            AsyncStorage.setItem('maintainBasket', 'yes').then(() => {
                this.props.navigation.navigate('Login');
            });
        }
    }

    //#endregion
}

export const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 55,
    },
});

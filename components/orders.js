import React, { Component } from 'react';
import { AppState, AsyncStorage, StyleSheet } from 'react-native';

import { ScrollComponent } from './common/scroll-component';
import { FooterComponent } from './sections/footer-component';
import { OrderElement } from './sections/order-element';
import '../global.js';
import { Indicator } from './common/indicator';
import { Container } from './common/container';
import { TitleHeader } from './sections/title-header';

export class Orders extends Component {
    static navigationOptions = {
        headerShown: false,
    };

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
        AppState.addEventListener('change', this.handleAppStateChange);

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
                <TitleHeader title="Összes rendelés"/>

                <ScrollComponent style={styles.scroll}>
                    {rendelesek}
                </ScrollComponent>

                <FooterComponent navigation={this.props.navigation} />
                <Indicator transparent={false} visible={this.state.loading} />
            </Container>
        );
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

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

    handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
            this.setState({ appState: nextAppState });
            AsyncStorage.setItem('maintainBasket', 'yes').then(() => {
                this.props.navigation.navigate('Login');
            });
        }
    }
}

export const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 55,
    },
});

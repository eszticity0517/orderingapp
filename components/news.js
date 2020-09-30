import React, { Component } from 'react';
import { AppRegistry, AppState, AsyncStorage, Text, View, StyleSheet } from 'react-native';

import { ScrollComponent } from './common/scroll-component';
import { FooterComponent } from './sections/footer-component';
import { OrderElement } from './sections/order-element';
import '../global.js';
import { Indicator } from './common/indicator';
import { Container } from './common/container';
import { SeparatorLine } from './common/separator-line';

export class News extends Component
{
    static navigationOptions = {
        header: null,
    };

    //#region

    constructor()
    {
        super();
        this.state = {
            appState: AppState.currentState,
            loading: false,
            news: null,
        };
    }

    componentWillMount()
    {
        AppState.addEventListener('change', this._handleAppStateChange);

        // global.getData('partner_id').then(partnerId =>
        // {
        //     global.getData('vendor').then(vendor =>
        //     {
        //         // NEWS NUMBER REQUEST

        //         var values = {
        //             id: JSON.stringify({
        //                 vendor: vendor,
        //                 object: 'rshop',
        //                 method: 'ujdonsagok',

        //                 params: {},
        //             }),
        //         };

        //         var formBody = [];
        //         for (var property in values)
        //         {
        //             var encodedKey = encodeURIComponent(property);
        //             var encodedValue = encodeURIComponent(values[property]);
        //             formBody.push(encodedKey + '=' + encodedValue);
        //         }

        //         formBody = formBody.join('&');
        //         this.setState({loading: true});
        //         fetch(global.baseUrl, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //             },
        //             body: formBody,
        //         }).then((response) => response.json())
        //             .then((responseJson) =>
        //             {
        //                 this.setState({
        //                     loading: false,
        //                     news: responseJson,
        //                 });
        //             })
        //             .catch((error) =>
        //             {
        //                 this.setState({loading: false});
        //                 console.error(error);
        //             });
        //     });
        // });
    }

    render()
    {
        // let ujdonsagok = [];

        // if (this.state.news !== null)
        // {
        //     for (let i = 0; i < this.state.news.items.length; i++)
        //     {
        //         ujdonsagok.push(
        //             <NewsElement
        //                 key={i}
        //                 text={this.state.news.items[i].megn}
        //                 source={{ uri: this.state.news.items[i].image }}
        //                 unitprice={this.state.news.items[i].nettoear}
        //                 unit={this.state.news.items[i].egyseg}
        //             />
        //         );
        //     }
        // }

        return (
            <Container>
                               <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{
                        fontSize: 20,
                        margin: 10,
                    }}>Újdonságok</Text>
                    <SeparatorLine />
                </View>
                <ScrollComponent>
                    {/* {ujdonsagok} */}
                </ScrollComponent>

                <FooterComponent navigation={this.props.navigation} />
                <Indicator  transparent={false} visible={this.state.loading}/>
            </Container>);
    }

    componentWillUnmount()
    {
        AppState.removeEventListener('change', this._handleAppStateChange);
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

AppRegistry.registerComponent('News', () => News);

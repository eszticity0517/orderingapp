import React, {Component} from 'react';
import {AppState} from 'react-native';
import {ScrollComponent} from './common/scroll-component';
import {CarouselComponent} from './sections/carousel-component';
import {HomeMenuElement} from './sections/home-menu-element';
import {FooterComponent} from './sections/footer-component';
import '../global.js';
import {Indicator} from './common/indicator';
import {Container} from './common/container';
import AsyncStorage from '@react-native-community/async-storage';

export class Home extends Component
{
    static navigationOptions = {
        headerShow: false,
    };

    constructor()
    {
        super();
        this.state = {
            rendelesek: null,
            ujdonsagok: null,
            appState: AppState.currentState,
            loading: false,
        };
    }

    componentDidMount()
    {
        AppState.addEventListener('change', this._handleAppStateChange);

        // global.getData('partner_id').then(partnerId =>
        // {
        //     global.getData('vendor').then(vendor =>
        //     {
        //         // ORDER NUMBER REQUEST

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
        //                 this.setState({loading: false});
        //                 if (responseJson.success)
        //                 {
        //                     let counter = 0;

        //                     for (let i = 0; i < responseJson.success.length; i++)
        //                     {
        //                         if (responseJson.success[i].items !== null)
        //                         {
        //                             counter++;
        //                         }
        //                     }

        //                     this.setState(state =>
        //                     {
        //                         state.rendelesek = counter;
        //                         return state;
        //                     });
        //                 }
        //             })
        //             .catch((error) =>
        //             {
        //                 this.setState({loading: false});
        //                 console.error(error);
        //             });

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
        //                 this.setState({loading: false});

        //                 this.setState(state =>
        //                 {
        //                     state.ujdonsagok = responseJson.items.length;
        //                     return state;
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
        return (
            <Container>
                <ScrollComponent>
                    <CarouselComponent />
                    <HomeMenuElement
                        onPress={() => this.onPress('Orders')}
                        source={require('../Sources/Homemenu/mua_doboz_over.png')}
                        text="korábbi rendelések"
                        number={this.state.rendelesek}
                    />

                    <HomeMenuElement
                        onPress={() => this.onPress('News')}
                        source={require('../Sources/Homemenu/star.png')}
                        text="újdonságok"
                        number={this.state.ujdonsagok}
                    />

                    <HomeMenuElement
                        onPress={() => this.onPress('Products')}
                        source={require('../Sources/Homemenu/hearth.png')}
                        text="termékek"
                    />
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

import React, {Component} from 'react';
import {AppState, Text, View} from 'react-native';
import { Container } from '../common/container';
import {FooterComponent} from '../sections/footer-component';
import {ButtonComponent} from '../common/button-component';
import {SummaryComponent} from '../sections/summary-component';
import '../../global.js';
import {Indicator} from '../common/indicator';
import AsyncStorage from '@react-native-community/async-storage';
import mainStyles from '../../main-styles.scss';
import styles from './profile.scss';

export class Profile extends Component
{
    // These will be displayed.
    _partnerAdatok;

    static navigationOptions = {
        headerShown: false,
    };

    constructor()
    {
        super();
        this.state = {
            size: global.size,
            appState: AppState.currentState,
            loading: false,
            partnerAdatok: null,
        };
    }

    componentDidMount()
    {
        AppState.addEventListener('change', this.handleAppStateChange);

        // global.getData('partner_id').then(partnerId =>
        // {
        //     global.getData('vendor').then(vendor =>
        //     {
        //         // GET COMPANY DATA

        //         var values = {
        //             id: JSON.stringify({
        //                 vendor: vendor,
        //                 object: 'rshop',
        //                 method: 'partnerAdatok',

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
        //                     this.setState({ partnerAdatok: responseJson.success });
        //                 }
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
        var megnevezes = this.state.partnerAdatok !== null ? this.state.partnerAdatok.megn : undefined;
        var cimek = [];

        if (this.state.partnerAdatok !== null)
        {
            for (let i = 0; i < this.state.partnerAdatok.cimek.length; i++)
            {
                cimek.push(<Text key={i} style={styles.welcomeSmall}>{this.state.partnerAdatok.cimek[i].cim}</Text>);
            }
        }

        return (
            <Container>
                <View style={styles.innerContainer}>
                    <Text style={mainStyles.bigCenteredText}>{megnevezes}</Text>
                    {cimek}

                    <SummaryComponent />

                    <View style={styles.buttonContainer}>
                        <ButtonComponent type="stretch" onPress={this.onPress.bind(this)} text="Kijelentkezés" />
                    </View>
                </View>
                <FooterComponent navigation={this.props.navigation} />
                <Indicator  transparent={false} visible={this.state.loading}/>
            </Container>);
    }

    componentWillUnmount()
    {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    onPress()
    {
        this.props.navigation.navigate('Login');

        // global.getData('partner_id').then(partnerId =>
        // {
        //     global.getData('vendor').then(vendor =>
        //     {
        //         var values = {
        //             id: JSON.stringify({
        //                 vendor: vendor,
        //                 object: 'rshop',
        //                 method: 'logout',

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
        //         fetch(global.baseUrl, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //             },
        //             body: formBody,
        //         }).then((response) => response.json())
        //             .then((responseJson) =>
        //             {
        //                 if (responseJson.success)
        //                 {
        //                     this.setState(state =>
        //                     {
        //                         state.felhasznalonev = '';
        //                         state.jelszo = '';
        //                     });

        //                     AsyncStorage.clear().then(() =>
        //                     {
        //                         global.removeItemValue('cart').then(() =>
        //                         {
        //                             this.props.navigation.navigate('Login');
        //                         });
        //                     });
        //                 }
        //                 else
        //                 {
        //                     console.log('Something went wrong');
        //                 }
        //             })
        //             .catch((error) =>
        //             {
        //                 console.error(error);
        //             });
        //     });


        // });
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

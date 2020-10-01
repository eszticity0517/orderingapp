import React, {Component} from 'react';
import {AppState, AsyncStorage, Text, View, StyleSheet} from 'react-native';
import { Container } from './common/container';
import {FooterComponent} from './sections/footer-component';
import {ButtonComponent} from './common/button-component';
import {SummaryComponent} from './sections/summary-component';
import '../global.js';
import {Indicator} from './common/indicator';

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
        AppState.addEventListener('change', this._handleAppStateChange);

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
        var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#323232';
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
                <View style={{ width: '100%', flex:1, flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginBottom: 55 }}>
                    <Text style={styles.welcome}>{megnevezes}</Text>
                    {cimek}

                    <SummaryComponent />

                    <View style={{ padding: 20, width: '100%' }}>
                        <ButtonComponent type="stretch" onPress={this.onPress.bind(this)} text="Kijelentkezés" />
                    </View>
                </View>
                <FooterComponent navigation={this.props.navigation} />
                <Indicator  transparent={false} visible={this.state.loading}/>
            </Container>);
    }

    componentWillUnmount()
    {
        AppState.removeEventListener('change', this._handleAppStateChange);
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
        //                         global.removeItemValue('basket').then(() =>
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
    //#endregion
}

export const styles = StyleSheet.create({
    welcomeSmall: {
        fontSize: 15,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});


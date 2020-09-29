import base64 from 'react-native-base64';

import React, { Component } from 'react';
import { Alert, Keyboard, Text, TextInput } from 'react-native';

import { ErrorText } from './common/error-text';
import { ButtonComponent } from './common/button-component';
import { CarouselComponent } from './sections/carousel-component';
import { ScrollComponent } from './common/scroll-component';
import { ButtonContainer } from './common/button-container';
import '../global.js';
import { Indicator } from './common/indicator';
import { Container } from './common/container';
import {StyleSheet} from 'react-native';

export class Login extends Component {
    _intervalHandler;
    _maintainBasketHandler;

    static navigationOptions = {
        headerShown: false,
    };

    constructor() {
        super();
        this.state = {
            felhasznalonev: '',
            jelszo: '',
            felhasznalonevVan: true,
            jelszoVan: true,
            buttonishidden: false,
            loading: false,
        };
    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.handleNavigateBack()),
            this.props.navigation.addListener('willBlur', () => console.log('blurred')),
        ];
        // This component mounts once hence it is the first component in the stacknavigator.
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    render() {
        return (
            <Container>
                <ScrollComponent>
                    <CarouselComponent />
                    <Text style={{ marginTop: 20 }}>
                        Partnerazonosító
                        {this._renderFelhasznalonevErrorMessage()}
                    </Text>
                    <TextInput onSubmitEditing={Keyboard.dismiss} keyboardType="numeric" value={this.state.felhasznalonev} onChangeText={(value) => this.onUsernameText(value, 'felhasznalonev')} />
                    <Text>
                        PIN kód
                        {this._renderJelszoErrorMessage()}
                    </Text>
                    <TextInput onSubmitEditing={Keyboard.dismiss} keyboardType="numeric" secureTextEntry={true} value={this.state.jelszo} onChangeText={(value) => this.onPasswordText(value, 'jelszo')} />
                    <Text onPress={this.onForgotPress.bind(this)} style={styles.forgotPasswordText}>Elfelejtettem a jelszavamat</Text>
                </ScrollComponent>

                <ButtonContainer hidden={this.state.buttonishidden} style={{ bottom: 0 }}>
                    <ButtonComponent onPress={this.onLoginPress.bind(this)} text="Bejelentkezés" />
                </ButtonContainer>
                {this._renderIndicator()}
            </Container>
        );
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
        clearTimeout(this._maintainBasketHandler);
        clearInterval(this._intervalHandler);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _renderIndicator() {
        return (this.state.loading ? <Indicator transparent={false} /> : undefined);
    }

    _renderFelhasznalonevErrorMessage() {
        return (this.state.felhasznalonevVan ? undefined : (<ErrorText keyboardType="numeric" text="Kötelező megadni." />));
    }

    _renderJelszoErrorMessage() {
        return (this.state.felhasznalonevVan ? undefined : <ErrorText text="Kötelező megadni." hidden={this.state.jelszoVan} />);
    }

    handleNavigateBack() {
        global.getData('maintainBasket').then(maintainBasket => {
            if (maintainBasket !== null && !this._maintainBasketHandler) {
                this._maintainBasketHandler = setTimeout(this.removeMaintainBasket, 600000);
            }
        });
    }

    _startInterval() {
        this._intervalHandler = setInterval(() => {
            global.getData('partner_id').then(partnerId => {
                if (partnerId !== null) {
                    global.getData('vendor').then(vendor => {
                        if (vendor !== null) {
                            var values = {
                                id: JSON.stringify({
                                    vendor: vendor,
                                    object: 'rshop',
                                    method: 'kategoriak',

                                    params: {},
                                }),
                            };

                            var formBody = [];
                            for (var property in values) {
                                var encodedKey = encodeURIComponent(property);
                                var encodedValue = encodeURIComponent(values[property]);
                                formBody.push(encodedKey + '=' + encodedValue);
                            }

                            formBody = formBody.join('&');
                            fetch(global.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                },
                                body: formBody,
                            }).then((response) => response.json())
                                .then(() => { })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                    });
                }
            });
        }, 25000);
    }

    _keyboardDidShow() {
        this.setState(state => {
            state.buttonishidden = true;
            return state;
        });
    }

    _keyboardDidHide() {
        this.setState(state => {
            state.buttonishidden = false;
            return state;
        });
    }

    onLoginPress() {
        clearTimeout(this._maintainBasketHandler);
        this._maintainBasketHandler = undefined;

        if (this.state.felhasznalonev.trim() === '' || this.state.jelszo.trim() === '') {
            if (this.state.felhasznalonev.trim() === '') {
                this.setState(() => {
                    return { felhasznalonevVan: false };
                });
            }

            if (this.state.felhasznalonev.trim() !== '') {
                this.setState(() => {
                    return { felhasznalonevVan: true };
                });
            }

            if (this.state.jelszo.trim() === '') {
                this.setState(() => {
                    return { jelszoVan: false };
                });
            }

            if (this.state.jelszo.trim() !== '') {
                this.setState(() => {
                    return { jelszoVan: true };
                });
            }
        }
        else {

            this.setState({
                loading: true,
            });
    
            this.props.navigation.navigate('Home');

            // var values = {
            //     id: true,
            // };

            // var formBody = [];
            // for (var property in values) {
            //     var encodedKey = encodeURIComponent(property);
            //     var encodedValue = encodeURIComponent(values[property]);
            //     formBody.push(encodedKey + '=' + encodedValue);
            // }

            // formBody = formBody.join('&');

            // // show spinner
            // this.setState({ loading: true });

            // fetch(global.baseUrl, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            //     },
            //     body: formBody,
            // }).then((response) => response.json())
            //     .then((responseJson) => {
            //         // show spinner
            //         this.setState({ loading: false });

            //         var originalVendor = responseJson.vendor;

            //         values = {
            //             id: JSON.stringify({
            //                 vendor: base64.decode(responseJson.vendor),
            //                 object: 'rshop',
            //                 method: 'login',

            //                 params: {
            //                     partner_id: this.state.felhasznalonev,
            //                     PIN: this.state.jelszo,
            //                 },
            //             }),
            //         };

            //         // show spinner
            //         this.setState({ loading: true });

            //         formBody = [];
            //         for (var property in values) {
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
            //             .then((responseJson) => {
            //                 // show spinner
            //                 this.setState({ loading: false });

            //                 if (responseJson.success) {
            //                     global.storeData('partner_id', this.state.felhasznalonev);
            //                     global.storeData('vendor', base64.decode(originalVendor));
            //                     global.storeData('partnerneve', responseJson.success.partner);

            //                     this.setState(state => {
            //                         state.felhasznalonev = '';
            //                         state.jelszo = '';
            //                         state.felhasznalonevVan = true;
            //                         state.jelszoVan = true;
            //                         return state;
            //                     });

            //                     this._startInterval();

            //                     global.getData('maintainBasket').then(maintainBasket => {
            //                         if (maintainBasket === null) {
            //                             // If the basket remained from previous usage, we have to delete it.
            //                             global.removeItemValue('basket').then(() => {
            //                                 this.props.navigation.navigate('Home');
            //                             });
            //                         }
            //                         else {
            //                             global.removeItemValue('maintainBasket').then(() => {
            //                                 this.props.navigation.navigate('Home');
            //                             });
            //                         }
            //                     });

            //                 }
            //                 else {
            //                     //Toast.show('Sikertelen bejelentkezés.');
            //                     Alert.alert(
            //                         'Hiba Történt',
            //                         'Helytelen felhasználónév vagy jelszó!',
            //                         [
            //                             { text: 'OK', onPress: () => console.log('OK Pressed') },
            //                         ],
            //                         { cancelable: false }
            //                     );
            //                 }
            //             })
            //             .catch((error) => {
            //                 // show spinner
            //                 this.setState({ loading: false });

            //                 console.error(error);
            //             });
            //         // Its important to make these fields empty, because componentDidMount wont be called anymore.


            //     })
            //     .catch((error) => {
            //         // show spinner
            //         this.setState({ loading: false });

            //         console.error(error);
            //     });
        }
    }

    onForgotPress() {
        clearTimeout(this._maintainBasketHandler);
        this.props.navigation.navigate('ForgottenPassword');
    }

    onUsernameText(value, name) {
        if (value.trim !== '') {
            this.setState(state => {
                state[name] = value;
                state.felhasznalonevVan = true;
                return state;
            });
        }
        else {
            this.setState(state => {
                state[name] = value;
                return state;
            });
        }
    }


    onPasswordText(value, name) {
        if (value.trim !== '') {
            this.setState(state => {
                state[name] = value;
                state.jelszoVan = true;
                return state;
            });
        }
        else {
            this.setState(state => {
                state[name] = value;
                return state;
            });
        }
    }

    removeMaintainBasket = async () => {
        // try {
        //     await AsyncStorage.removeItem("maintainBasket");
        //     return true;
        // }
        // catch (exception) {
        //     return false;
        // }
    }
    //#endregion
}

export const styles = StyleSheet.create({
    forgotPasswordText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: 'black',
        marginTop: 10,
    },
});



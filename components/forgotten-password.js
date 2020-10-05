import React, { Component } from 'react';
import { Keyboard, Text, TextInput, StyleSheet } from 'react-native';
import { ScrollComponent } from './common/scroll-component';
import { ButtonComponent } from './common/button-component';
import { ButtonContainer } from './common/button-container';
import { ErrorText } from './common/error-text';
import { CarouselComponent } from './sections/carousel-component';
import '../global.js';
import { Indicator } from './common/indicator';
import { Container } from './common/container';

export class ForgottenPassword extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor() {
        super();
        this.state = {
            email: '',
            emailVan: true,
            felhasznalonev: '',
            felhasznalonevVan: true,
            isButtonHidden: false,
            size: global.size,
            loading: false,
        };
    }

    render() {
        return (
            <Container>
                <ScrollComponent>
                    <CarouselComponent />
                    <Text style={{ marginTop: 20 }}>
                        Partnerazonosító
                    <ErrorText text="Kötelező megadni." hidden={this.state.felhasznalonevVan} />
                    </Text>
                    <TextInput autoFocus={false} value={this.state.felhasznalonev} onChangeText={(value) => this.onChangeText(value, 'felhasznalonev')} />
                    <Text style={{ marginTop: 20 }}>
                        E-mail cím
                    <ErrorText text="Kötelező megadni." hidden={this.state.emailVan} />
                    </Text>
                    <TextInput autoFocus={false} value={this.state.email} onChangeText={(value) => this.onChangeText(value, 'email')} />
                </ScrollComponent>


                <ButtonContainer hidden={this.state.isButtonHidden} style={styles.upperButtonContainer}>
                    <ButtonComponent onPress={this.onSendPress.bind(this)} text="Új jelszó küldése" />
                </ButtonContainer>
                <ButtonContainer hidden={this.state.isButtonHidden}>
                    <ButtonComponent onPress={this.onCancelPress.bind(this)} text="Mégsem" backgroundColor="#989898" />
                </ButtonContainer>
                <Indicator transparent={false} visible={this.state.loading} />
            </Container>);
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow() {
        this.setState(state => {
            state.isButtonHidden = true;
            return state;
        });
    }

    keyboardDidHide() {
        this.setState(state => {
            state.isButtonHidden = false;
            return state;
        });
    }

    onCancelPress() {
        this.props.navigation.navigate('Login');
    }

    onSendPress() {
        if (this.state.email.trim() !== '' || this.state.felhasznalonev.trim() !== '') {
            this.props.navigation.navigate('PasswordSent');

            //     var values = {
            //         id: true,
            //     };

            //     var formBody = [];
            //     for (var property in values)
            //     {
            //         var encodedKey = encodeURIComponent(property);
            //         var encodedValue = encodeURIComponent(values[property]);
            //         formBody.push(encodedKey + '=' + encodedValue);
            //     }

            //     formBody = formBody.join('&');

            //     this.setState({loading: true});
            //     fetch(global.baseUrl, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            //         },
            //         body: formBody,
            //     }).then((response) => response.json())
            //         .then((responseJson) =>
            //         {
            //             this.setState({loading: false});
            //             var originalVendor = responseJson.vendor;

            //             values = {
            //                 id: JSON.stringify({
            //                     vendor: base64.decode(originalVendor),
            //                     object: 'rshop',
            //                     method: 'newPin',

            //                     params: {
            //                         partner_id: this.state.felhasznalonev,
            //                         email: this.state.email,
            //                     },
            //                 }),
            //             };

            //             formBody = [];
            //             for (var property in values)
            //             {
            //                 var encodedKey = encodeURIComponent(property);
            //                 var encodedValue = encodeURIComponent(values[property]);
            //                 formBody.push(encodedKey + '=' + encodedValue);
            //             }

            //             formBody = formBody.join('&');
            //             this.setState({loading: true});
            //             fetch(global.baseUrl, {
            //                 method: 'POST',
            //                 headers: {
            //                     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            //                 },
            //                 body: formBody,
            //             }).then((response) => response.json())
            //                 .then((responseJson) =>
            //                 {
            //                     this.setState({loading: false});
            //                     if (responseJson.success)
            //                     {
            //                         this.setState(state =>
            //                         {
            //                             state.email = '';
            //                             state.felhasznalonev = '';
            //                             state.emailVan = true;
            //                             state.jelszovan = true;
            //                         });

            //                         this.props.navigation.navigate('PasswordIsSent');

            //                     }
            //                 })
            //                 .catch((error) =>
            //                 {
            //                     this.setState({loading: false});
            //                     console.error(error);
            //                 });
            //             // Its important to make these fields empty, because componentDidMount wont be called anymore.
            //         })
            //         .catch((error) =>
            //         {
            //             this.setState({loading: false});
            //             console.error(error);
            //         });
        }

        if (this.state.email.trim() === '') {
            this.setState(state => {
                return { emailVan: false };
            });
        }
        else {
            this.setState(state => {
                return { emailVan: true };
            });
        }

        if (this.state.felhasznalonev.trim() === '') {
            this.setState(state => {
                return { felhasznalonevVan: false };
            });
        }
        else {
            this.setState(state => {
                return { felhasznalonevVan: true };
            });
        }
    }

    onChangeText(value, name) {
        this.setState(state => {
            state[name] = value;
            return state;
        });
    }
}

export const styles = StyleSheet.create({
    upperButtonContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        height: 20 * 2 + 20 / 2,
        flexDirection: 'row',
        bottom: 20 * 2 + 20 / 2,
        flex: 1,
        alignSelf: 'stretch',
        right: 0,
        left: 0,
        zIndex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
});

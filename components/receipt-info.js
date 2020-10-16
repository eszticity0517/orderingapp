import React, { Component } from 'react';
import { AppState, Keyboard, Text, TextInput, View, Alert, StyleSheet } from 'react-native';

import { HeaderComponent } from './sections/header-component';
import { ButtonComponent } from './common/button-component';
import { SeparatorLine } from './common/separator-line';
import { ScrollComponent } from './common/scroll-component';
import { ButtonContainer } from './common/button-container';
import { Container } from './common/container';
import { TotalComponent } from './sections/total-component';
import { DropdownComponent } from './sections/dropdown-component';
import '../global.js';
import {Indicator} from './common/indicator';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
import mainStyles from '../main-styles.scss';

export class ReceiptInfo extends Component
{
    // If we have a cart in AsyncStorage, we assign it to this. If not, we create a new one.
    _cart;

    static navigationOptions = {
        header: null,
    };

    constructor()
    {
        super();
        this.state = {
            size: global.size,
            wayOfReceivingValue: 'Raktári átvétel',
            addressValue: '',
            cimek: [],
            aruatvetelek: [],
            megjegyzes: '',
            isButtonHidden: false,
            fuvardij: 0,
            termekekara: 0,
            vendor: null,
            partnerId: null,
            appState: AppState.currentState,
            loading: false,
            isMenuOpened: false,
            cart: null,
        };
    }

    componentWillMount()
    {
        AppState.addEventListener('change', this.handleAppStateChange);
        // This component mounts once hence it is the first component in the stacknavigator.
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentDidMount()
    {
        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.handleNavigateBack()),
            this.props.navigation.addListener('willBlur', () => console.log('blurred')),
        ];

        // global.getData('partner_id').then(partnerId =>
        // {
        //     global.getData('vendor').then(vendor =>
        //     {
        //         this.setState(state =>
        //         {
        //             state.vendor = vendor;
        //             state.partnerId = partnerId;
        //             return state;
        //         });

        //         // CLONE BASKET HERE
        //         global.getData('cart').then(cart =>
        //         {
        //             if (cart !== null)
        //             {
        //                 this.setState({ cart: JSON.parse(cart)});

        //                 let ossztomeg = 0;

        //                 if (this.state.cart !== null)
        //                 {
        //                     for (let i = 0; i < this.state.cart.tetelek.length; i++)
        //                     {
        //                         ossztomeg += parseFloat(this.state.cart.tetelek[i].tomeg) * this.state.cart.tetelek[i].mennyiseg;
        //                     }
        //                 }

        //                 var cart = JSON.parse(JSON.stringify(this.state.cart));
        //                 cart.tomeg = ossztomeg;

        //                 this.setState({ cart: cart });

        //                 // We calculate  the price of every product once.

        //                 let termekekara = 0;

        //                 if (this.state.cart !== null)
        //                 {
        //                     for (let i = 0; i < this.state.cart.tetelek.length; i++)
        //                     {
        //                         var termek = this.state.cart.tetelek[i];
        //                         if (termek.kedv_nettoear === null)
        //                         {
        //                             termekekara += this.state.cart.tetelek[i].nettoear * (this.state.cart.tetelek[i].mennyiseg);
        //                         }
        //                         else
        //                         {
        //                             if (termek.kiszereles !== null)
        //                             {
        //                                 var kedvezmenyezettKiszerelesDarabszama;
        //                                 var kedvezmenyezettKiszerelesID;

        //                                 termek.kiszereles.forEach(kiszereles =>
        //                                 {
        //                                     if (kiszereles.egyseg_id === termek.kedv_kiszereles_id)
        //                                     {
        //                                         kedvezmenyezettKiszerelesDarabszama = kiszereles.valtoszam;
        //                                         kedvezmenyezettKiszerelesID = kiszereles.egyseg_id;
        //                                     }
        //                                 });


        //                                 termek.kiszereles.forEach(kiszereles =>
        //                                 {
        //                                     // This part handles the discount.
        //                                     if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama)
        //                                     {
        //                                         var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
        //                                         var firstCondition = termek.mennyiseg >= minimumKedvezmenyezettDarab;

        //                                         if (firstCondition)
        //                                         {
        //                                             var modulo = termek.mennyiseg % kedvezmenyezettKiszerelesDarabszama;

        //                                             if (modulo === 0)
        //                                             {
        //                                                 termekekara += termek.kedv_nettoear * termek.mennyiseg;
        //                                             }
        //                                             else
        //                                             {
        //                                                 var nemKedvezmenyezettMennyiseg = modulo;
        //                                                 var kedvezmenyezettMennyiseg = termek.mennyiseg - nemKedvezmenyezettMennyiseg;

        //                                                 termekekara += termek.nettoear * nemKedvezmenyezettMennyiseg;
        //                                                 termekekara += termek.kedv_nettoear * kedvezmenyezettMennyiseg;
        //                                             }
        //                                         }
        //                                         else
        //                                         {
        //                                             termekekara += this.state.cart.tetelek[i].nettoear * (this.state.cart.tetelek[i].mennyiseg);
        //                                         }
        //                                     }
        //                                     else if (!kedvezmenyezettKiszerelesDarabszama)
        //                                     {
        //                                         termekekara += this.state.cart.tetelek[i].nettoear * (this.state.cart.tetelek[i].mennyiseg);
        //                                     }
        //                                 });
        //                             }
        //                             else
        //                             {
        //                                 termekekara += this.state.cart.tetelek[i].nettoear * (this.state.cart.tetelek[i].mennyiseg);
        //                             }
        //                         }
        //                     }
        //                 }

        //                 this.setState(state =>
        //                 {
        //                     state.termekekara = termekekara;
        //                     return state;
        //                 });

        //                 var values = {
        //                     id: JSON.stringify({
        //                         vendor: vendor,
        //                         object: 'rshop',
        //                         method: 'fuvardij',

        //                         params: {
        //                             tomeg: ossztomeg,
        //                         },
        //                     }),
        //                 };

        //                 var formBody = [];
        //                 for (var property in values)
        //                 {
        //                     var encodedKey = encodeURIComponent(property);
        //                     var encodedValue = encodeURIComponent(values[property]);
        //                     formBody.push(encodedKey + '=' + encodedValue);
        //                 }

        //                 formBody = formBody.join('&');
        //                 this.setState({ loading: true });
        //                 fetch(global.baseUrl, {
        //                     method: 'POST',
        //                     headers: {
        //                         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //                     },
        //                     body: formBody,
        //                 }).then((response) => response.json())
        //                     .then((responseJson) =>
        //                     {
        //                         this.setState({ loading: false });
        //                         if (responseJson.success)
        //                         {
        //                             this.setState(state =>
        //                             {
        //                                 state.fuvardij = responseJson.success;
        //                                 return state;
        //                             });
        //                         }
        //                     })
        //                     .catch((error) =>
        //                     {
        //                         this.setState({ loading: false });
        //                         console.error(error);
        //                     });


        //             }
        //         });

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
        //         this.setState({ loading: true });
        //         fetch(global.baseUrl, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //             },
        //             body: formBody,
        //         }).then((response) => response.json())
        //             .then((responseJson) =>
        //             {
        //                 this.setState({ loading: false });
        //                 if (responseJson.success)
        //                 {
        //                     var cimek = [];

        //                     for (let i = 0; i < responseJson.success.cimek.length; i++)
        //                     {
        //                         cimek.push(responseJson.success.cimek[i]);
        //                     }

        //                     this.setState(state =>
        //                     {
        //                         state.cimek = cimek;
        //                         return state;
        //                     });
        //                 }
        //             })
        //             .catch((error) =>
        //             {
        //                 this.setState({ loading: false });
        //                 console.error(error);
        //             });


        //         // GET WAY OF RECEIVING DATA
        //         var values = {
        //             id: JSON.stringify({
        //                 vendor: vendor,
        //                 object: 'rshop',
        //                 method: 'aruatvetel',

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
        //         this.setState({ loading: true });
        //         fetch(global.baseUrl, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //             },
        //             body: formBody,
        //         }).then((response) => response.json())
        //             .then((responseJson) =>
        //             {
        //                 this.setState({ loading: false });
        //                 var aruatvetelek = [];

        //                 for (let i = 0; i < responseJson.success.length; i++)
        //                 {
        //                     aruatvetelek.push(responseJson.success[i]);
        //                 }

        //                 this.setState(state =>
        //                 {
        //                     state.aruatvetelek = aruatvetelek;
        //                     return state;
        //                 });
        //             })
        //             .catch((error) =>
        //             {
        //                 this.setState({ loading: false });
        //                 console.error(error);
        //             });
        //     });
        // });
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (
            this.state.wayOfReceivingValue !== prevState.wayOfReceivingValue
            && this.state.wayOfReceivingValue !== 'Raktári átvétel'
        )
        {
            this.setState({
                addressValue: this.state.cimek[0].cim,
            });
        }
        else if (
            this.state.wayOfReceivingValue !== prevState.wayOfReceivingValue
            && this.state.wayOfReceivingValue === 'Raktári átvétel'
        )
        {
            this.setState({
                addressValue: '',
            });
        }
    }

    render()
    {
        return (
            <Container>
                <ScrollComponent appearance="view" style={{ marginBottom: this.renderMarginBottom() }}>

                    <HeaderComponent onMenuOpenPress={this.onMenuOpenPress.bind(this)} isMenuOpened={this.state.isMenuOpened} navigation={this.props.navigation} onPress={(value) => this.onPress('Home')} />

                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <SeparatorLine />
                    </View>

                    <View>
                        <ActionSheet
                            ref={o => this.aruatvetelekMenu}
                            options={this.renderAruAtvetelek()}
                            cancelButtonIndex={0}
                            destructiveButtonIndex={this.state.aruatvetelek.length}
                            onPress={(index) =>
                            {
                                // Zero index is for the cancel button.
                                if (index !== 0)
                                {
                                    this.setState({
                                        wayOfReceivingValue: this.state.aruatvetelek[index - 1].megn,
                                    });
                                }
                            }}
                        />
                    </View>

                    <View>
                        <ActionSheet
                            ref={o => this.cimekMenu}
                            // title={<Text style={{ color: '#000', fontSize: 18 }}>Átvétel módja</Text>}
                            options={this.renderCimErtekek()}
                            cancelButtonIndex={0}
                            destructiveButtonIndex={this.state.cimek.length}
                            onPress={(index) =>
                            {
                                // Zero index is the cancel button
                                if (index !== 0)
                                {
                                    this.setState({
                                        addressValue: this.state.cimek[index - 1].cim,
                                    });
                                }
                            }}
                        />
                    </View>

                    <DropdownComponent onPress={this.showAruatvetelekMenu} title={this.state.wayOfReceivingValue} />
                    {this.renderCimek()}

                    {this.renderNoteLabel()}
                    <View style={{ height: 20 * 1.5}}>
                        <TextInput underlineColorAndroid={'transparent'} placeholder={this.renderNotePlaceholder()} value={this.state.megjegyzes} onChangeText={(value) => this.onChangeText(value, 'megjegyzes')} />
                        <View style={{ borderTopColor: 'black', borderBottomWidth: 2, flex: 1 }} />
                    </View>
                </ScrollComponent>

                {this.renderTermekekAra()}
                {this.renderFuvardij()}

                <ButtonContainer style={mainStyles.upperButtonContainer} hidden={this.state.isButtonHidden}>
                    <TotalComponent text="Teljes összeg" sum={this.renderVegosszeg()} />
                </ButtonContainer>

                <ButtonContainer hidden={this.state.isButtonHidden}>
                    <ButtonComponent onPress={(value) => this.onPress('OrderIsDone')} text="Megerősítés" />
                </ButtonContainer>
                <Indicator transparent={false} visible={this.state.loading} />
            </Container>

        );
    }

    renderFuvardij()
    {
        let fuvardij;

        if (this.state.wayOfReceivingValue === 'Kiszállítás')
        {
            fuvardij = <ButtonContainer style={[mainStyles.upperButtonContainer, { bottom: (20 * 2 + 20 / 2) * 1.5 }]} hidden={this.state.isButtonHidden}>
                <TotalComponent text="Fuvardíj" sum={Math.round(this.state.fuvardij)} light />
            </ButtonContainer>;
        }

        return fuvardij;
    }

    renderTermekekAra()
    {
        return (
            this.state.wayOfReceivingValue === 'Kiszállítás' ?
                (<ButtonContainer
                    style={[mainStyles.upperButtonContainer, { bottom: (20 * 2 + 20 / 2) * 2 }]}
                    hidden={this.state.isButtonHidden}
                >
                    <TotalComponent text="Termékek ára" sum={Math.round(this.state.termekekara)} light />
                </ButtonContainer>) : undefined
        );
    }

    renderAruAtvetelek()
    {
        var aruatvetelek = [];

        // We need to add the cancel button manually, unless it won't be visible.
        aruatvetelek.push(<Text style={mainStyles.greyText}>Vissza</Text>);

        for (let i = 0; i < this.state.aruatvetelek.length; i++)
        {
            aruatvetelek.push(<Text style={mainStyles.blackText}>{this.state.aruatvetelek[i].megn}</Text>);
        }

        return aruatvetelek;
    }

    renderNotePlaceholder()
    {
       return (this.state.wayOfReceivingValue === 'Kiszállítás' ? 'Megjegyzés' : null);
    }

    renderNoteLabel()
    {
        return (this.state.wayOfReceivingValue === 'Raktári átvétel' ? <Text style={mainStyles.withMarginTop10}>Megjegyzés</Text> : null);
    }

    renderMarginBottom()
    {
        return (this.state.isButtonHidden ? 0 : 50);
    }

    renderVegosszeg()
    {
        let vegosszeg = this.state.termekekara;

        if (this.state.wayOfReceivingValue === 'Kiszállítás')
        {
            vegosszeg = this.state.termekekara + this.state.fuvardij;
        }

        return Math.round(vegosszeg);
    }

    renderCimek()
    {
        let cimek;

        if (this.state.wayOfReceivingValue === 'Kiszállítás')
        {
            cimek = (
                <View style={mainStyles.withMarginTop10}>
                    <DropdownComponent
                        onPress={this.showCimekMenu}
                        title={this.state.addressValue}
                        hidden={this.state.wayOfReceivingValue !== 'Kiszállítás'}
                    />
                </View>
            );
        }

        return cimek;
    }

    renderCimErtekek()
    {
        let cimErtekek = [];
        // We need to add the cancel button manually, unless it won't be visible.
        cimErtekek.push(<Text style={mainStyles.greyText}>Vissza</Text>);

        for (let i = 0; i < this.state.cimek.length; i++)
        {
            cimErtekek.push(<Text style={mainStyles.blackText}>{this.state.cimek[i].cim}</Text>);
        }

        return cimErtekek;
    }


    componentWillUnmount()
    {
        // this.subs.forEach(sub => sub.remove());
        AppState.removeEventListener('change', this.handleAppStateChange);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    showAruatvetelekMenu = () =>
    {
        if (this.aruatvetelekMenu)
        {
            this.aruatvetelekMenu.show();
        }
    }

    showCimekMenu = () =>
    {
        this.cimekMenu.show();
    }

    handleAppStateChange = (nextAppState) =>
    {
        if (nextAppState.match(/inactive|background/) && this.state.appState === 'active')
        {
            this.setState({ appState: nextAppState });
            AsyncStorage.setItem('maintainBasket', 'yes').then(() =>
            {
                this.props.navigation.navigate('Login');
            });
        }
    }

    keyboardDidShow()
    {
        this.setState(state =>
        {
            state.isButtonHidden = true;
            return state;
        });
    }

    keyboardDidHide()
    {
        this.setState(state =>
        {
            state.isButtonHidden = false;
            return state;
        });
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

    onChangeText(value, name)
    {
        this.setState(state =>
        {
            state[name] = value;
            return state;
        });
    }

    onPress(value)
    {

        if (value === 'OrderIsDone')
        {
            // Delete zero elements JUST here. Original cart remains unchanged.



            this.state.aruatvetelek.forEach(element =>
            {
                if (element.megn === this.state.wayOfReceivingValue)
                {
                    var cart = JSON.parse(JSON.stringify(this.state.cart));
                    cart.atvetel_id = element.id;
                    this.setState({ cart: cart });
                }
            });

            this.state.cimek.forEach(element =>
            {
                if (element.cim === this.state.addressValue)
                {
                    var cart = JSON.parse(JSON.stringify(this.state.cart));
                    cart.cim_id = parseInt(element.id);
                    this.setState({ cart: cart });
                }
            });

            if (this.state.cart.cim_id === null || this.state.wayOfReceivingValue === 'Raktári átvétel')
            {
                var cart = JSON.parse(JSON.stringify(this.state.cart));
                cart.cim_id = 0;
                this.setState({ cart: cart });
            }

            var cart = JSON.parse(JSON.stringify(this.state.cart));
            cart.megjegyzes = this.state.megjegyzes;
            cart.megjegyzes = this.state.fuvardij;
            this.setState({ cart: cart });

            var szallitasiadatok = this.state.wayOfReceivingValue === 'Kiszállítás' ? this.state.addressValue : 'Raktári átvétel';

            this.state.cart.tetelek.forEach(element =>
            {
                var cikk_id = parseFloat(element.cikk_id);

                if (element.kedv_nettoear !== null)
                {
                    // In this case, we have to create another object with same properties, but different price.
                    var teljesMennyiseg = element.mennyiseg;
                    var kedvezmenyezettMennyiseg;
                    var nemKedvezmenyezettMennyiseg;

                    if (element.kiszereles !== null)
                    {
                        element.kiszereles.forEach(kiszereles =>
                        {
                            if (kiszereles.egyseg_id === element.kedv_kiszereles_id)
                            {
                                var modulo = teljesMennyiseg % kiszereles.valtoszam;

                                if (modulo !== 0)
                                {
                                    nemKedvezmenyezettMennyiseg = modulo;
                                    kedvezmenyezettMennyiseg = teljesMennyiseg - nemKedvezmenyezettMennyiseg;

                                    // Divide the original elem
                                    var kedvezmenyesElem = {
                                        cikk_id: cikk_id.toString(),
                                        mennyiseg: kedvezmenyezettMennyiseg.toString(),
                                        nettoear: element.kedv_nettoear.toString(),
                                    };

                                    // Change the original quantity of the element
                                    element.mennyiseg = nemKedvezmenyezettMennyiseg.toString();

                                    var cart = JSON.parse(JSON.stringify(this.state.cart));
                                    cart.tetelek.push(kedvezmenyesElem);

                                    this.setState({ cart: cart });

                                    global.storeData('cart', JSON.stringify(this.state.cart));
                                }
                                else
                                {
                                    // Just change the price
                                    element.nettoear = element.kedv_nettoear;
                                }
                            }
                        });
                    }
                }

                delete element.egyseg;
                delete element.uid;
                delete element.kiszereles;
                delete element.megn;
                delete element.image;
                delete element.kivalasztottegyseg;
                delete element.min_mennyiseg;
                delete element.tomeg;
                delete element.kedv_kiszereles_id;
                delete element.kedv_mennyiseg;
                delete element.kedv_engedmeny;
                delete element.kedv_nettoear;

                element.cikk_id = cikk_id;
            });

            if (this.state.cart.partner_id === null)
            {
                var cart = JSON.parse(JSON.stringify(this.state.cart));
                cart.partner_id = parseInt(this.state.partnerId);

                this.setState({ cart: cart });
            }

            var temporaryBasket = JSON.parse(JSON.stringify(this.state.cart));

            for (let i = 0; i < temporaryBasket.tetelek.length; i++)
            {
                if (temporaryBasket.tetelek[i].mennyiseg === 0)
                {
                    temporaryBasket.tetelek.splice(i, 1);
                }
            }

            if (temporaryBasket.tetelek.length > 0)
            {
                // SEND AN ORDER
                var values = {
                    id: JSON.stringify({
                        vendor: this.state.vendor,
                        object: 'rshop',
                        method: 'rendeles',

                        params: temporaryBasket,
                    }),
                };

                var formBody = [];
                for (var property in values)
                {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(values[property]);
                    formBody.push(encodedKey + '=' + encodedValue);
                }

                formBody = formBody.join('&');
                this.setState({ loading: true });
                fetch(global.baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: formBody,
                }).then((response) =>
                {
                    setTimeout(() => null, 0);
                    return response.json();
                })
                    .then((responseJson) =>
                    {
                        this.setState({ loading: false });
                        if (responseJson.success)
                        {
                            this.props.navigation.navigate(value, { szallitasiadatok: szallitasiadatok });
                        }
                    })
                    .catch((error) =>
                    {
                        this.setState({ loading: false });
                        console.error(error);
                    });
            }
            else
            {
                Alert.alert(
                    'Hiba Történt',
                    'Csak nullás termék van a kosárban. Növelje a termék mennyiségét.',
                    [
                        { text: 'Rendben', onPress: () => { this.props.navigation.navigate('OrderInProgress'); } },
                    ],
                    { cancelable: false }
                );
            }
        }
        else
        {
            this.props.navigation.navigate(value);
        }
    }

    onWayOfReceivingValueChange(name, value)
    {
        this.setState(
            {
                wayOfReceivingValue: value,
            });
    }

    onAddressValueChange(name, value)
    {
        this.setState(
            {
                addressValue: value,
            });
    }

    handleNavigateBack()
    {
        global.getData('cart').then(cart =>
        {
            this.setState({ cart: JSON.parse(cart) });

            let ossztomeg = 0;

            if (this.state.cart !== null)
            {
                for (let i = 0; i < this.state.cart.tetelek.length; i++)
                {
                    ossztomeg += parseFloat(this.state.cart.tetelek[i].tomeg) * this.state.cart.tetelek[i].mennyiseg;
                }
            }

            var cart = JSON.parse(JSON.stringify(this.state.cart));
            cart.tomeg = ossztomeg;

            this.setState({ cart: cart });
        });
    }
}
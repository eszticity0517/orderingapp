import React, { Component } from 'react';
import { Alert, AppRegistry, AppState, ScrollView, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { HeaderComponent } from './sections/header-component';
import { ButtonComponent } from './common/button-component';
import { SeparatorLine } from './common/separator-line';
import { CartElement } from './sections/cart-element';
import { TotalComponent } from './sections/total-component';
import { ButtonContainer } from './common/button-container';
import { Container } from './common/container';
import '../global.js';
export class OrderInProgress extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor() {
        super();
        this.state = {
            size: global.size,
            vegosszeg: 0,
            appState: AppState.currentState,
            isMenuOpened: false,
            basket: null,
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.handleNavigateBack()),
            this.props.navigation.addListener('willBlur', () => {}),
        ];
        // We can assume that we have a basket, because the app does not navigate here without it.

        global.getData('basket').then(basket => {
            if (basket !== null) {
                this.setState({ basket: JSON.parse(basket) });

                // Probably we need to recalculate the "vegosszeg" param.

                let vegosszeg = 0;

                for (let i = 0; i < this.state.basket.tetelek.length; i++) {
                    var termek = this.state.basket.tetelek[i];
                    if (termek.kedv_nettoear === null) {
                        vegosszeg += this.state.basket.tetelek[i].nettoear * (this.state.basket.tetelek[i].mennyiseg);
                    }
                    else {
                        if (termek.kiszereles !== null) {
                            var kedvezmenyezettKiszerelesDarabszama;
                            var kedvezmenyezettKiszerelesID;

                            termek.kiszereles.forEach(kiszereles => {
                                if (kiszereles.egyseg_id === termek.kedv_kiszereles_id) {
                                    kedvezmenyezettKiszerelesDarabszama = kiszereles.valtoszam;
                                    kedvezmenyezettKiszerelesID = kiszereles.egyseg_id;
                                }
                            });


                            termek.kiszereles.forEach(kiszereles => {
                                // This part handles the discount.
                                if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama) {
                                    var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
                                    var firstCondition = termek.mennyiseg >= minimumKedvezmenyezettDarab;

                                    if (firstCondition) {
                                        var modulo = termek.mennyiseg % kedvezmenyezettKiszerelesDarabszama;

                                        if (modulo === 0) {
                                            vegosszeg += termek.kedv_nettoear * termek.mennyiseg;
                                        }
                                        else {
                                            var nemKedvezmenyezettMennyiseg = modulo;
                                            var kedvezmenyezettMennyiseg = termek.mennyiseg - nemKedvezmenyezettMennyiseg;

                                            vegosszeg += termek.nettoear * nemKedvezmenyezettMennyiseg;
                                            vegosszeg += termek.kedv_nettoear * kedvezmenyezettMennyiseg;
                                        }
                                    }
                                    else {
                                        vegosszeg += this.state.basket.tetelek[i].nettoear * (this.state.basket.tetelek[i].mennyiseg);
                                    }
                                }
                                else if (!kedvezmenyezettKiszerelesDarabszama) {
                                    vegosszeg += this.state.basket.tetelek[i].nettoear * (this.state.basket.tetelek[i].mennyiseg);
                                }
                            });
                        }
                        else {
                            vegosszeg += this.state.basket.tetelek[i].nettoear * (this.state.basket.tetelek[i].mennyiseg);
                        }
                    }
                }

                this.setState(state => {
                    state.vegosszeg = vegosszeg;
                    return state;
                });

            }
        });
    }

    componentDidUpdate() {
        // Probably we need to recalculate the "vegosszeg" param.

        let vegosszeg = 0;

        if (this.state.basket) {
            for (let i = 0; i < this.state.basket.tetelek.length; i++) {
                var termek = this.state.basket.tetelek[i];
                if (termek.kedv_nettoear === null) {
                    vegosszeg += this.state.basket.tetelek[i].nettoear * (this.state.basket.tetelek[i].mennyiseg);
                }
                else {
                    if (termek.kiszereles !== null) {
                        var kedvezmenyezettKiszerelesDarabszama;
                        var kedvezmenyezettKiszerelesID;

                        termek.kiszereles.forEach(kiszereles => {
                            if (kiszereles.egyseg_id === termek.kedv_kiszereles_id) {
                                kedvezmenyezettKiszerelesDarabszama = kiszereles.valtoszam;
                                kedvezmenyezettKiszerelesID = kiszereles.egyseg_id;
                            }
                        });


                        termek.kiszereles.forEach(kiszereles => {
                            // This part handles the discount.
                            if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama) {
                                var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
                                var firstCondition = termek.mennyiseg >= minimumKedvezmenyezettDarab;

                                if (firstCondition) {
                                    var modulo = termek.mennyiseg % kedvezmenyezettKiszerelesDarabszama;

                                    if (modulo === 0) {
                                        vegosszeg += termek.kedv_nettoear * termek.mennyiseg;
                                    }
                                    else {
                                        var nemKedvezmenyezettMennyiseg = modulo;
                                        var kedvezmenyezettMennyiseg = termek.mennyiseg - nemKedvezmenyezettMennyiseg;

                                        vegosszeg += termek.nettoear * nemKedvezmenyezettMennyiseg;
                                        vegosszeg += termek.kedv_nettoear * kedvezmenyezettMennyiseg;
                                    }
                                }
                                else {
                                    vegosszeg += this.state.basket.tetelek[i].nettoear * (this.state.basket.tetelek[i].mennyiseg);
                                }
                            }
                            else if (!kedvezmenyezettKiszerelesDarabszama) {
                                vegosszeg += this.state.basket.tetelek[i].nettoear * (this.state.basket.tetelek[i].mennyiseg);
                            }
                        });
                    }
                    else {
                        vegosszeg += this.state.basket.tetelek[i].nettoear * (this.state.basket.tetelek[i].mennyiseg);
                    }
                }
            }
        }

        if (vegosszeg !== this.state.vegosszeg) {
            this.setState(state => {
                state.vegosszeg = vegosszeg;
                return state;
            });
        }
    }

    render() {
        // We display basket elements here and enable editing.
        let termekek = [];

        if (this.state.basket !== null) {
            for (let i = 0; i < this.state.basket.tetelek.length; i++) {
                termekek.push(
                    <CartElement
                        key={i}
                        product={JSON.parse(JSON.stringify(this.state.basket.tetelek[i]))}
                        onCheck={(value) => this.onDeleteCheck(value)}
                        onPickerValueChange={(id, value) => this.onPickerValueChange(id, value)}
                        onCounterButtonPress={(id, value) => this.onCounterButtonPress(id, value)}
                    />
                );
            }
        }

        return (
            <Container>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <HeaderComponent onMenuOpenPress={this.onMenuOpenPress.bind(this)} isMenuOpened={this.state.isMenuOpened} navigation={this.props.navigation} onPress={(value) => this.onPress('Home')} />
                    <View style={{ marginTop: 20 }}>
                        <SeparatorLine />
                    </View>
                </View>
                <ScrollView style={{
                    flex: 1,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 55,
                }}>
                    {termekek}
                </ScrollView>

                <ButtonContainer style={styles.upperButtonContainer}>
                    <TotalComponent text="Teljes összeg" sum={Math.round(this.state.vegosszeg)} />
                </ButtonContainer>

                <ButtonContainer>
                    <ButtonComponent onPress={(value) => this.onPress('WayOfReceiving')} text="Megerősítés" />
                </ButtonContainer>
            </Container>
        );
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.subs.forEach(sub => sub.remove());
    }

    onMenuOpenPress() {
        if (this.state.isMenuOpened) {
            this.setState(state => {
                state.isMenuOpened = false;
                return state;
            });
        }
        else {
            this.setState(state => {
                state.isMenuOpened = true;
                return state;
            });
        }
    }

    handleNavigateBack() {
        global.getData('basket').then(basket => {
            if (basket !== null) {
                this.setState({ basket: null });
            }
        });

        if (this.state.basket !== null) {
            var basket = JSON.parse(JSON.stringify(this.state.basket));

            basket.tetelek.forEach(tetel => {
                if (tetel.kiszereles !== null) {
                    var keresnikellMasikat = false;

                    tetel.kiszereles.forEach(kiszereles => {
                        if (kiszereles.megn === tetel.kivalasztottegyseg) {
                            if (tetel.mennyiseg % kiszereles.valtoszam !== 0) {
                                keresnikellMasikat = true;
                            }
                        }
                    });

                    if (keresnikellMasikat) {
                        tetel.kiszereles.reverse().forEach(kiszereles => {
                            if (kiszereles.megn !== tetel.kivalasztottegyseg && keresnikellMasikat) {
                                if (tetel.mennyiseg % kiszereles.valtoszam === 0) {
                                    tetel.kivalasztottegyseg = kiszereles.megn;
                                    tetel.kiszereles.reverse();
                                    keresnikellMasikat = false;
                                    global.storeData('basket', JSON.stringify(basket)).then(() => {
                                        this.setState({ basket: basket });
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }

    onChangeText(value, name) {
        this.setState(state => {
            state[name] = value;
            return state;
        });
    }

    onDeleteCheck(uid) {
        var basket = JSON.parse(JSON.stringify(this.state.basket));

        basket.tetelek.forEach(element => {
            if (element.uid === uid) {
                Alert.alert(
                    '',
                    'Biztosan törölni akarja?',
                    [
                        {
                            text: 'Igen', onPress: () => {
                                var tetelek = basket.tetelek.filter(elem => elem.uid !== uid);

                                basket.tetelek = tetelek;

                                this.setState({ basket: basket });

                                global.storeData('basket', JSON.stringify(basket)).then(() => {
                                    if (basket.tetelek.length === 0) {
                                        global.removeItemValue('basket').then(() => {
                                            this.props.navigation.navigate('EmptyBasket');
                                        });
                                    }
                                    else {
                                        this.setState({ basket: basket });
                                    }
                                });
                            },
                        },
                        { text: 'Nem', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            }
        });
    }

    onPickerValueChange(uid, value) {
        // We use this to get the right element from the basket.
        var chosenUid;

        var kedv_nettoear = null;

        var basket = JSON.parse(JSON.stringify(this.state.basket));

        basket.tetelek.forEach(termek => {
            if (termek.uid === uid) {
                var valtoszam = 1;
                var kezdetikiszereles = termek.kivalasztottegyseg;

                termek.kivalasztottegyseg = value;
                chosenUid = uid;

                this.setState({ basket: basket });
                basket = JSON.parse(JSON.stringify(this.state.basket));

                if (termek.kiszereles !== null) {
                    var kedvezmenyezettKiszerelesDarabszama;
                    var kedvezmenyezettKiszerelesID;

                    termek.kiszereles.forEach(kiszereles => {
                        if (kiszereles.egyseg_id === termek.kedv_kiszereles_id) {
                            kedvezmenyezettKiszerelesDarabszama = kiszereles.valtoszam;
                            kedvezmenyezettKiszerelesID = kiszereles.egyseg_id;
                        }
                    });

                    var kezdetiKiszerelesValtoszama;
                    var kovetkezoKiszerelesValtoszama;

                    termek.kiszereles.forEach(kiszereles => {
                        if (kiszereles.megn === termek.kivalasztottegyseg) {
                            kovetkezoKiszerelesValtoszama = kiszereles.valtoszam;
                        }
                        if (kiszereles.megn === kezdetikiszereles) {
                            kezdetiKiszerelesValtoszama = kiszereles.valtoszam;
                        }
                    });

                    if (kezdetiKiszerelesValtoszama) {
                        var dividend = kezdetiKiszerelesValtoszama / kovetkezoKiszerelesValtoszama;
                        termek.mennyiseg /= dividend;
                        this.setState({ basket: basket });
                    }

                    termek.kiszereles.forEach(kiszereles => {
                        // This part handles the discount.
                        if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama) {
                            var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
                            var firstCondition = termek.mennyiseg >= minimumKedvezmenyezettDarab;

                            if (firstCondition) {
                                termek.kedv_nettoear = termek.nettoear - ((termek.nettoear / 100) * parseInt(termek.kedv_engedmeny));
                                this.setState({ basket: basket });
                            }
                            else {
                                termek.kedv_nettoear = null;
                                this.setState({ basket: basket });
                            }
                        }
                        else if (!kedvezmenyezettKiszerelesDarabszama) {
                            termek.kedv_nettoear = null;
                            this.setState({ basket: basket });
                        }
                    });
                }
            }
        });

        global.storeData('basket', JSON.stringify(this.state.basket));
    }

    onCounterButtonPress(uid, value) {
        var basket = JSON.parse(JSON.stringify(this.state.basket));

        basket.tetelek.forEach(termek => {
            if (termek.uid === uid) {
                if (termek.kiszereles !== null) {
                    var kedvezmenyezettKiszerelesDarabszama;
                    var kedvezmenyezettKiszerelesID;

                    termek.kiszereles.forEach(kiszereles => {
                        if (kiszereles.egyseg_id === termek.kedv_kiszereles_id) {
                            kedvezmenyezettKiszerelesDarabszama = kiszereles.valtoszam;
                            kedvezmenyezettKiszerelesID = kiszereles.egyseg_id;
                        }
                        if (kiszereles.megn === termek.kivalasztottegyseg) {
                            value *= kiszereles.valtoszam;
                        }
                    });

                    termek.mennyiseg = Math.max(termek.min_mennyiseg, termek.mennyiseg += value);
                    this.setState({ basket: basket });

                    termek.kiszereles.forEach(kiszereles => {
                        // This part handles the discount.
                        if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama) {
                            var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
                            var firstCondition = termek.mennyiseg >= minimumKedvezmenyezettDarab;

                            if (firstCondition) {
                                termek.kedv_nettoear = termek.nettoear - ((termek.nettoear / 100) * parseInt(termek.kedv_engedmeny));
                                this.setState({ basket: basket });
                            }
                            else {
                                termek.kedv_nettoear = null;
                                this.setState({ basket: basket });
                            }
                        }
                        else if (!kedvezmenyezettKiszerelesDarabszama) {
                            termek.kedv_nettoear = null;
                            this.setState({ basket: basket });
                        }
                    });
                }
                else {
                    termek.mennyiseg = Math.max(termek.min_mennyiseg, termek.mennyiseg += value);
                    this.setState({ basket: basket });
                }
            }
        });

        global.storeData('basket', JSON.stringify(this.state.basket));
    }

    onAlertOpen() {
        Alert.alert(
            '',
            'Biztosan törölni akarja?',
            [
                { text: 'Igen', onPress: () => console.log('OK Pressed') },
                { text: 'Nem', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        );
    }

    onPress(value) {
        this.props.navigation.navigate(value);
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
            this.setState({ appState: nextAppState });
            AsyncStorage.setItem('maintainBasket', 'yes').then(() => {
                this.props.navigation.navigate('Login');
            });
        }
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

AppRegistry.registerComponent('OrderInProgress', () => OrderInProgress);

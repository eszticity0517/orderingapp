import React, { Component } from 'react';
import { Alert, AppState, ScrollView, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { HeaderComponent } from './sections/header-component';
import { ButtonComponent } from './common/button-component';
import { SeparatorLine } from './common/separator-line';
import { ProductElement } from './sections/product-element';
import { ButtonContainer } from './common/button-container';
import { Container } from './common/container';
import '../global.js';
import {Indicator} from './common/indicator';

export class Reorder extends Component
{
    static navigationOptions = {
        headerShown: false,
    };

    constructor()
    {
        super();
        this.state = {
            isReorderWanted: false,
            size: global.size,
            appState: AppState.currentState,
            loading: false,
            isMenuOpened: false,
            sum: 0,
            basket: null,
            orderwithdata: null,
            products: [],
            items: null,
            order: null,
        };
    }

    render()
    {
        return (
            <Container>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <HeaderComponent onMenuOpenPress={this.onMenuOpenPress.bind(this)} isMenuOpened={this.state.isMenuOpened} orderstatus={this.state.order ? this.state.order.nyitott : 0} orderdate={this.state.order ? this.state.order.kelt : null} total={this.state.sum} navigation={this.props.navigation} onPress={(value) => this.onPress('Home')} />
                    {this.renderCancelButton()}
                    <SeparatorLine />
                </View>
                <ScrollView style={{
                    flex: 1,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 55,
                }}>
                    {this.renderElemek()}
                </ScrollView>

                {this.renderReorderButton()}
                {this.renderBackButton()}
                {this.renderNewOrReorderContainer()}
                <Indicator transparent={false} visible={this.state.loading} />
            </Container>
        );
    }

    renderCancelButton()
    {
        var cancelbutton;

        if (this.state.isReorderWanted)
        {
            cancelbutton = (<View style={{ height: 30, width: '100%', marginTop: 20, marginBottom: 20 }}>
                <ButtonComponent onPress={this.onReorderPress.bind(this)} text="Mégsem" />
            </View>);
        }

        if (this.state.orderwithdata !== null && this.state.orderwithdata.items === null)
        {
            cancelbutton = null;
        }

        return cancelbutton;
    }

    renderNewOrReorderContainer()
    {
        var orderornewcontainer;

        if (this.state.isReorderWanted)
        {
            orderornewcontainer = (<ButtonContainer>
                <ButtonComponent onPress={(value) => this.onPress('OrderInProgress')} text="Kosárba" backgroundColor='#77D353' />
            </ButtonContainer>);
        }

        if (this.state.orderwithdata !== null && this.state.orderwithdata.items === null)
        {
            orderornewcontainer = null;
        }

        return orderornewcontainer;
    }

    renderBackButton()
    {
        var backbutton;

        if (!this.state.isReorderWanted)
        {
            backbutton = <ButtonContainer>
                <ButtonComponent onPress={() => this.onPress('Orders')} text="Vissza" backgroundColor="#989898" />
            </ButtonContainer>;
        }

        return backbutton;
    }

    renderReorderButton()
    {
        var reorderbutton;

        if (!this.state.isReorderWanted)
        {
            reorderbutton = (
            <ButtonContainer style={styles.upperbuttoncontainer}>
                <ButtonComponent onPress={this.onReorderPress.bind(this)} text="Újrarendelés másként" />
            </ButtonContainer>
            );
        }

        if (this.state.orderwithdata !== null && this.state.orderwithdata.items === null)
        {
            reorderbutton = null;
        }

        return reorderbutton;
    }

    renderElemek()
    {
        let elemek = [];

        for (let i = 0; i < this.state.products.length; i++)
        {
            elemek.push(
                <ProductElement
                    key={i}
                    product={JSON.parse(JSON.stringify(this.state.products[i]))}
                    onCheck={(value) => this.onDeleteCheck(value)}
                    onPickerValueChange={(id, value) => this.onPickerValueChange(id, value)}
                    onCounterButtonPress={(id, value) => this.onCounterButtonPress(id, value)}
                    hiddenbuttons={!this.state.isReorderWanted}
                />
            );
        }

        if (this.state.orderwithdata !== null && this.state.orderwithdata.items === null)
        {
            elemek = <View style={{ justifyContent: 'center', height: (this.state.size.height - 20 * 2) / 2 - 20 * 2, width: '100%' }}>
                <Text style={styles.welcomenomargin}>Az elemek nem tölthetők be.</Text>
            </View>;
        }
    }


    componentWillMount()
    {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentDidMount()
    {
        if (this.props.navigation.state.params)
        {
            this.setState({ items: this.props.navigation.state.params.order.items });
            this.setState({ order: this.props.navigation.state.params.order });
        }

        global.getData('partner_id').then(partnerId =>
        {
            global.getData('vendor').then(vendor =>
            {
                // Get order details

                var values = {
                    id: JSON.stringify({
                        vendor: vendor,
                        object: 'rshop',
                        method: 'szamla',

                        params: {
                            partner_id: parseInt(partnerId),
                            rendeles_id: parseInt(this.state.order.id),
                        },
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
                }).then((response) => response.json())
                    .then((responseJson) =>
                    {
                        this.setState({
                            loading: false,
                            orderwithdata: responseJson.success,
                        });

                        var sum = 0;

                        if (this.state.orderwithdata.items !== null)
                        {
                            for (let i = 0; i < this.state.orderwithdata.items.length; i++)
                            {
                                sum += this.state.orderwithdata.items[i].cikk.nettoear * this.state.orderwithdata.items[i].mennyiseg;
                            }

                            this.setState({ sum: sum });

                            // Get every element
                            var products = [];

                            for (let i = 0; i < this.state.items.length; i++)
                            {
                                var values = {
                                    id: JSON.stringify({
                                        vendor: vendor,
                                        object: 'rshop',
                                        method: 'getCikk',

                                        params: {
                                            cikk_id: this.state.items[i].cikk_id,
                                        },
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
                                }).then((response) => response.json())
                                    .then((item) =>
                                    {
                                        this.setState({ loading: false });
                                        var secondaryItem;
                                        var secondaryKivalasztottEgyseg;
                                        var secondaryValtoszam;
                                        var secondaryMennyiseg;

                                        item.kivalasztva = false;

                                        if (this.state.orderwithdata.items[i].cikk.kiszereles !== null)
                                        {
                                            var kivalasztottegyseg;
                                            var valtoszam;

                                            const dividend = parseFloat(this.state.orderwithdata.items[i].mennyiseg);

                                            this.state.orderwithdata.items[i].cikk.kiszereles.reverse().forEach(element =>
                                            {
                                                let divisor = parseFloat(element.valtoszam);

                                                if (dividend % divisor === 0 && !kivalasztottegyseg)
                                                {
                                                    valtoszam = element.valtoszam;
                                                    kivalasztottegyseg = element.megn;
                                                }
                                                else if (dividend % divisor !== 0 && !kivalasztottegyseg)
                                                {
                                                    if (Math.floor(dividend / divisor) >= 1)
                                                    {
                                                        valtoszam = element.valtoszam;
                                                        kivalasztottegyseg = element.megn;
                                                        secondaryMennyiseg = dividend % divisor;

                                                        const index = this.state.orderwithdata.items[i].cikk.kiszereles.map(e => e.uid).indexOf(element.uid);

                                                        for (let k = index + 1; k < this.state.orderwithdata.items[i].cikk.kiszereles.length - index; k++)
                                                        {
                                                            let element2 = this.state.orderwithdata.items[i].cikk.kiszereles[k];
                                                            let divisor = parseFloat(element2.valtoszam);

                                                            if (secondaryMennyiseg % divisor === 0 && !secondaryKivalasztottEgyseg)
                                                            {
                                                                secondaryKivalasztottEgyseg = element2.megn;
                                                                secondaryValtoszam = element2.valtoszam;
                                                            }
                                                        }
                                                    }
                                                }
                                            });

                                            this.state.orderwithdata.items[i].cikk.kiszereles.reverse();

                                            if (!kivalasztottegyseg)
                                            {
                                                item.kivalasztottegyseg = this.state.orderwithdata.items[i].cikk.egyseg;
                                                item.mennyiseg = parseInt(this.state.orderwithdata.items[i].mennyiseg);
                                            }
                                            else
                                            {
                                                item.kivalasztottegyseg = kivalasztottegyseg;
                                                item.mennyiseg = Math.floor(parseInt(this.state.orderwithdata.items[i].mennyiseg) / valtoszam);
                                            }
                                        }
                                        else
                                        {
                                            item.kivalasztottegyseg = this.state.orderwithdata.items[i].cikk.egyseg;
                                            item.mennyiseg = parseInt(this.state.orderwithdata.items[i].mennyiseg);
                                        }

                                        // We get this from _ordersWithData first

                                        item.kedv_nettoear = null;

                                        // Add exchange

                                        var valtoszam = 1;

                                        if (item.kiszereles !== null)
                                        {
                                            item.kiszereles.forEach(kiszereles =>
                                            {
                                                if (kiszereles.megn === item.kivalasztottegyseg)
                                                {
                                                    valtoszam = kiszereles.valtoszam;
                                                }
                                            });
                                        }

                                        item.mennyiseg *= valtoszam;

                                        item.uid = global.guidGenerator();
                                        products.push(item);

                                        if (secondaryKivalasztottEgyseg)
                                        {
                                            secondaryItem = JSON.parse(JSON.stringify(item));
                                            secondaryItem.uid = global.guidGenerator();

                                            secondaryItem.kivalasztottegyseg = secondaryKivalasztottEgyseg;
                                            secondaryItem.mennyiseg = secondaryMennyiseg / secondaryValtoszam;

                                            var valtoszam2 = 1;

                                            if (secondaryItem.kiszereles !== null)
                                            {
                                                secondaryItem.kiszereles.forEach(kiszereles =>
                                                {
                                                    if (kiszereles.megn === secondaryItem.kivalasztottegyseg)
                                                    {
                                                        valtoszam2 = kiszereles.valtoszam;
                                                    }
                                                });
                                            }

                                            secondaryItem.mennyiseg *= valtoszam2;
                                            products.push(secondaryItem);
                                        }

                                        this.setState({ products: products });
                                    })

                                    .catch((error) =>
                                    {
                                        this.setState({ loading: false });
                                        console.error(error);
                                    });
                            }
                        }
                    })

                    .catch((error) =>
                    {
                        this.setState({ loading: false });
                        console.error(error);
                    });

            });
        });
    }

    componentWillUnmount()
    {
        AppState.removeEventListener('change', this._handleAppStateChange);
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


    onPress(value)
    {
        if (value === 'OrderInProgress')
        {
            // We check the existence of the basket.
            global.getData('basket').then(basket =>
            {
                if (basket !== null)
                {
                    this.setState({ basket: JSON.parse(basket)});

                    for (let i = 0; i < this.state.products.length; i++)
                    {
                        let element = this.state.products[i];

                        var sikerultTalalni = false;

                        this.state.basket.tetelek.forEach(tetel =>
                        {
                            if (tetel.cikk_id === element.id)
                            {
                                tetel.mennyiseg += element.mennyiseg;
                                sikerultTalalni = true;
                            }
                        });

                        if (!sikerultTalalni)
                        {
                            var basket = JSON.parse(JSON.stringify(this.state.basket));

                            basket.tetelek.push({
                                cikk_id: element.id, // Termékek oldal
                                mennyiseg: element.mennyiseg, // Termékek oldal
                                nettoear: element.nettoear,
                                kiszereles: element.kiszereles,
                                megn: element.megn,
                                image: element.image,
                                kivalasztottegyseg: element.kivalasztottegyseg,
                                min_mennyiseg: element.min_mennyiseg,
                                tomeg: element.tomeg,
                                kedv_kiszereles_id: element.kedv_kiszereles_id,
                                kedv_mennyiseg: element.kedv_mennyiseg,
                                kedv_engedmeny: element.kedv_engedmeny,
                                kedv_nettoear: element.kedv_nettoear,
                                uid: element.uid,
                            });

                            this.setState({ basket: basket });
                        }
                    }

                    // We save the new product immediately.
                    global.storeData('basket', JSON.stringify(this.state.basket));
                }
                else
                {
                    // We did not create the basket yet.
                    if (this.state.basket === null)
                    {
                        var basket = {
                            partner_id: parseInt(this.state.partnerId), //Termékek oldal
                            atvetel_id: null, // Áruátvétel módja oldal
                            cim_id: null, // Áruátvétel módja oldal
                            megjegyzes: '', // Termékek oldal (csak most)
                            tomeg: null, // Termékek oldal
                            fuvardij: null, // Áruátvétel módja oldal
                            tetelek: [],
                        };

                        for (let i = 0; i < this.state.products.length; i++)
                        {
                            let element = this.state.products[i];

                            basket.tetelek.push({
                                cikk_id: element.id, // Termékek oldal
                                mennyiseg: element.mennyiseg, // Termékek oldal
                                nettoear: element.nettoear,
                                kiszereles: element.kiszereles,
                                megn: element.megn,
                                image: element.image,
                                kivalasztottegyseg: element.kivalasztottegyseg,
                                min_mennyiseg: element.min_mennyiseg,
                                tomeg: element.tomeg,
                                kedv_kiszereles_id: element.kedv_kiszereles_id,
                                kedv_mennyiseg: element.kedv_mennyiseg,
                                kedv_engedmeny: element.kedv_engedmeny,
                                kedv_nettoear: element.kedv_nettoear,
                                uid: element.uid,
                            });
                        }
                        // We save the new product immediately.
                        this.setState({ basket: basket });
                        global.storeData('basket', JSON.stringify(this.state.basket));
                    }
                }

                // Works on both iOS and Android
                Alert.alert(
                    '',
                    'A termékeket hozzáadtuk a kosárhoz.',
                    [
                        { text: 'Rendben', onPress: () => this.props.navigation.navigate(value) },
                    ],
                    { cancelable: false }
                );
            });
        }
        else
        {
            this.props.navigation.navigate(value);
        }
    }

    onCounterButtonPress(uid, value)
    {
        var products = this.state.products.slice();

        products.forEach(termek =>
        {
            if (termek.uid === uid)
            {
                this.setState({ products: products });
                products = this.state.products.slice();

                if (termek.kiszereles !== null)
                {
                    var kedvezmenyezettKiszerelesDarabszama;
                    var kedvezmenyezettKiszerelesID;

                    termek.kiszereles.forEach(kiszereles =>
                    {
                        if (kiszereles.egyseg_id === termek.kedv_kiszereles_id)
                        {
                            kedvezmenyezettKiszerelesDarabszama = kiszereles.valtoszam;
                            kedvezmenyezettKiszerelesID = kiszereles.egyseg_id;
                        }
                        if (kiszereles.megn === termek.kivalasztottegyseg)
                        {
                            value *= kiszereles.valtoszam;
                        }
                    });

                    termek.mennyiseg = Math.max(termek.min_mennyiseg, termek.mennyiseg += value);
                    this.setState({ products: products });

                    termek.kiszereles.forEach(kiszereles =>
                    {
                        // This part handles the discount.
                        if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama)
                        {
                            var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
                            var firstCondition = termek.mennyiseg >= minimumKedvezmenyezettDarab;

                            if (firstCondition)
                            {
                                termek.kedv_nettoear = termek.nettoear - ((termek.nettoear / 100) * parseInt(termek.kedv_engedmeny));
                                this.setState({ products: products });
                            }
                            else
                            {
                                termek.kedv_nettoear = null;
                                this.setState({ products: products });
                            }
                        }
                        else if (!kedvezmenyezettKiszerelesDarabszama)
                        {
                            termek.kedv_nettoear = null;
                            this.setState({ products: products });
                        }
                    });
                }
                else
                {
                    termek.mennyiseg = Math.max(termek.min_mennyiseg, termek.mennyiseg += value);
                    this.setState({ products: products });
                }
            }
        });
    }


    onDeleteCheck(uid)
    {
        var index = 0;

        var products = JSON.parse(JSON.stringify(this.state.basket));

        products.forEach(element =>
        {
            if (element.uid === uid)
            {
                Alert.alert(
                    '',
                    'Biztosan törölni akarja?',
                    [
                        {
                            text: 'Igen', onPress: () =>
                            {
                                var items = products.filter(elem => elem.uid !== uid);

                                products = items;

                                if (products.length === 0)
                                {
                                    this.props.navigation.navigate('Orders');
                                }
                                else
                                {
                                    this.setState({ products: products });
                                }
                            },
                        },
                        { text: 'Nem', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            }
            else
            {
                index++;
            }
        });
    }



    onPickerValueChange(uid, value)
    {
        // We use this to get the right element from the basket.
        var chosenUid;

        var kedv_nettoear = null;

        var products = this.state.products.slice();

        products.forEach(termek =>
        {
            if (termek.uid === uid)
            {
                var valtoszam = 1;
                var kezdetikiszereles = termek.kivalasztottegyseg;

                termek.kivalasztottegyseg = value;
                chosenUid = uid;

                this.setState({ products: products });
                products = this.state.products.slice();

                if (termek.kiszereles !== null)
                {
                    var kedvezmenyezettKiszerelesDarabszama;
                    var kedvezmenyezettKiszerelesID;

                    termek.kiszereles.forEach(kiszereles =>
                    {
                        if (kiszereles.egyseg_id === termek.kedv_kiszereles_id)
                        {
                            kedvezmenyezettKiszerelesDarabszama = kiszereles.valtoszam;
                            kedvezmenyezettKiszerelesID = kiszereles.egyseg_id;
                        }
                    });

                    var kezdetiKiszerelesValtoszama;
                    var kovetkezoKiszerelesValtoszama;

                    termek.kiszereles.forEach(kiszereles =>
                    {
                        if (kiszereles.megn === termek.kivalasztottegyseg)
                        {
                            kovetkezoKiszerelesValtoszama = kiszereles.valtoszam;
                        }
                        if (kiszereles.megn === kezdetikiszereles)
                        {
                            kezdetiKiszerelesValtoszama = kiszereles.valtoszam;
                        }
                    });

                    if (kezdetiKiszerelesValtoszama)
                    {
                        var dividend = kezdetiKiszerelesValtoszama / kovetkezoKiszerelesValtoszama;
                        termek.mennyiseg /= dividend;
                        this.setState({ products: products });
                    }

                    termek.kiszereles.forEach(kiszereles =>
                    {
                        // This part handles the discount.
                        if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama)
                        {
                            var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
                            var firstCondition = termek.mennyiseg >= minimumKedvezmenyezettDarab;

                            if (firstCondition)
                            {
                                termek.kedv_nettoear = termek.nettoear - ((termek.nettoear / 100) * parseInt(termek.kedv_engedmeny));
                                this.setState({ products: products });
                            }
                            else
                            {
                                termek.kedv_nettoear = null;
                                this.setState({ products: products });
                            }
                        }
                        else if (!kedvezmenyezettKiszerelesDarabszama)
                        {
                            termek.kedv_nettoear = null;
                            this.setState({ products: products });
                        }
                    });
                }
            }
        });
    }

    onReorderPress()
    {
        if (this.state.isReorderWanted)
        {
            this.setState({
                isReorderWanted: false,
            });
        }
        else
        {
            this.setState({
                isReorderWanted: true,
            });
        }
    }

    _handleAppStateChange = (nextAppState) =>
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
}

export const styles = StyleSheet.create({
    welcomeNoMargin: {
        fontSize: 20,
        textAlign: 'center',
    },
});
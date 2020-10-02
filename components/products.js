import React, { Component } from 'react';
import
{
    AppState,
    Keyboard,
    ScrollView,
    TextInput,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { FooterComponent } from './sections/footer-component';
import { SeparatorLine } from './common/separator-line';
import { SearchFieldContainer } from './sections/search-field-container';
import { ProductElement } from './sections/product-element';
import { DropdownComponent } from './sections/dropdown-component';
import '../global.js';
import { Indicator } from './common/indicator';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Container } from './common/container';
import AsyncStorage from '@react-native-community/async-storage';

export class Products extends Component
{
    static navigationOptions = {
        headerShown: false,
    };

    constructor()
    {
        super();
        this.state = {
            counter: 0,
            filter: '',
            buttonishidden: false,
            partnerId: null,
            isFocused: false,
            kivalasztottkategoria: null,
            kivalasztottalcsoport: null,
            kategoriak: [],
            alcsoportok: [],
            appState: AppState.currentState,
            loading: false,
            products: null,
            basket: null,
            kategoriakesalcsoportok: null,
        };
    }

    render()
    {
        return (
            <Container>
                <View style={styles.productViewContainer}>
                    <DropdownComponent
                        onPress={this.showKategoriakMenu}
                        title={this.state.kivalasztottkategoria}
                    />

                    <View style={{ marginTop: 20 / 2 }}>
                        <DropdownComponent
                            onPress={this.showAlcsoportokMenu}
                            title={this.state.kivalasztottalcsoport}
                        />
                    </View>

                    <SearchFieldContainer>
                        <TextInput underlineColorAndroid={'transparent'} value={this.state.filter} onChangeText={(value) => this.onChangeText(value, 'filter')} />
                        <View style={{ borderTopColor: 'black', borderBottomWidth: 1, flex: 1 }} />
                    </SearchFieldContainer>

                    <SeparatorLine />
                </View>

                <ScrollView
                    style={styles.scroller}
                    scrollEnabled={this.isScrollEnabled()}
                >
                    {this.renderTermekek()}
                </ScrollView>

                <FooterComponent hidden={this.state.buttonishidden} navigation={this.props.navigation} />
                <Indicator transparent={false} visible={this.state.loading} />

                <View>
                    <ActionSheet
                        ref={o => this.kategoriakMenu = o}
                        options={this.renderKategoriak()}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={this.state.kategoriak.length}
                        onPress={(index) =>
                        {
                            // Zero index is for the cancel button.
                            if (index !== 0)
                            {
                                this.onCategoryValueChange('', this.state.kategoriak[index - 1]);
                            }
                        }}
                    />
                </View>

                <View>
                    <ActionSheet
                        ref={o => this.alcsoportokMenu = o}
                        options={this.renderAlcsoportok()}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={this.state.alcsoportok.length}
                        onPress={(index) =>
                        {
                            // Zero index is the cancel button
                            if (index !== 0)
                            {
                                this.onGroupValueChange('', this.state.alcsoportok[index - 1]);
                            }
                        }}
                    />
                </View>
            </Container >
        );
    }

    renderAlcsoportok()
    {
        var alcsoportok = [];

        alcsoportok.push(<Text style={{ color: 'grey' }}>Vissza</Text>);

        for (let i = 0; i < this.state.alcsoportok.length; i++)
        {
            alcsoportok.push(<Text style={{ color: 'black' }}>{this.state.alcsoportok[i]}</Text>);
        }

        return alcsoportok;
    }

    renderKategoriak()
    {
        var kategoriak = [];

        kategoriak.push(<Text style={{ color: 'grey' }}>Vissza</Text>);

        for (let i = 0; i < this.state.kategoriak.length; i++)
        {
            kategoriak.push(<Text style={{ color: 'black' }}>{this.state.kategoriak[i]}</Text>);
        }

        return kategoriak;
    }

    isScrollEnabled()
    {
        return !(this.state.isCategoryOpen || this.state.isGroupOpen);
    }

    renderTermekek()
    {
        let termekek = [];

        if (this.state.products)
        {
            for (let i = 0; i < this.state.products.length; i++)
            {
                if (this.state.filter.length >= 3 && this.state.products[i].megn.toLowerCase().includes(this.state.filter.toLowerCase()) || this.state.filter.length < 3)
                {
                    termekek.push(
                        <ProductElement
                            key={i}
                            product={JSON.parse(JSON.stringify(this.state.products[i]))}
                            onCheck={(uid) => this.onProductCheck(uid)}
                            onPickerValueChange={(id, value) => this.onPickerValueChange(id, value)}
                            onCounterButtonPress={(id, value) => this.onCounterButtonPress(id, value)}
                            showPieces={true}
                        />
                    );
                }
            }
        }
    }

    componentDidMount()
    {
        AppState.addEventListener('change', this._handleAppStateChange);
        // This component mounts once hence it is the first component in the stacknavigator.
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.handleNavigateBack()),
            this.props.navigation.addListener('willBlur', () => console.log('blurred')),
        ];

        // global.getData('partner_id').then(partnerId =>
        // {
        //     this.setState(state =>
        //     {
        //         state.partnerId = partnerId;
        //         return state;
        //     });

        //     global.getData('vendor').then(vendor =>
        //     {
        //         var values = {
        //             id: JSON.stringify({
        //                 vendor: vendor,
        //                 object: 'rshop',
        //                 method: 'kategoriak',

        //                 params: {},
        //             }),
        //         };

        //         this.setState({ loading: true });
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
        //                 this.setState({
        //                     loading: false,
        //                     kategoriakesalcsoportok: responseJson,
        //                 });

        //                 let kategoriak = [];
        //                 let parentId;

        //                 for (let i = 0; i < this.state.kategoriakesalcsoportok.length; i++)
        //                 {
        //                     if (this.state.kategoriakesalcsoportok[i].parent_id === '0')
        //                     {
        //                         kategoriak.push(this.state.kategoriakesalcsoportok[i].megn);

        //                         if (!parentId)
        //                         {
        //                             parentId = this.state.kategoriakesalcsoportok[i].id;
        //                         }
        //                     }
        //                 }

        //                 let alcsoportok = [];

        //                 for (let i = 0; i < this.state.kategoriakesalcsoportok.length; i++)
        //                 {
        //                     if (this.state.kategoriakesalcsoportok[i].parent_id === parentId)
        //                     {
        //                         alcsoportok.push(this.state.kategoriakesalcsoportok[i].megn);
        //                     }
        //                 }

        //                 this.setState({
        //                     kategoriak: kategoriak,
        //                     kivalasztottkategoria: kategoriak[0],
        //                     alcsoportok: alcsoportok,
        //                     kivalasztottalcsoport: alcsoportok[0],
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
        if (this.state.kivalasztottalcsoport !== prevState.kivalasztottalcsoport)
        {
            this.setState({ products: null });

            // global.getData('vendor').then(vendor =>
            // {
            //     this.state.kategoriakesalcsoportok.forEach(element =>
            //     {
            //         if (element.megn === this.state.kivalasztottalcsoport)
            //         {

            //             var values = {
            //                 id: JSON.stringify({
            //                     vendor: vendor,
            //                     object: 'rshop',
            //                     method: 'kategoriaCikkek',

            //                     params: {
            //                         cikkcsoport_id: parseInt(element.id),
            //                     },
            //                 }),
            //             };

            //             var formBody = [];
            //             for (var property in values)
            //             {
            //                 var encodedKey = encodeURIComponent(property);
            //                 var encodedValue = encodeURIComponent(values[property]);
            //                 formBody.push(encodedKey + '=' + encodedValue);
            //             }

            //             formBody = formBody.join('&');
            //             fetch(global.baseUrl, {
            //                 method: 'POST',
            //                 headers: {
            //                     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            //                 },
            //                 body: formBody,
            //             }).then((response) => response.json())
            //                 .then((responseJson) =>
            //                 {
            //                     if (responseJson.success)
            //                     {
            //                         var products = [];

            //                         for (let i = 0; i < responseJson.success.length; i++)
            //                         {
            //                             if (responseJson.success[i].kiszereles === null)
            //                             {
            //                                 responseJson.success[i].kivalasztottegyseg = responseJson.success[i].egyseg;
            //                             }
            //                             else
            //                             {
            //                                 responseJson.success[i].kivalasztottegyseg = responseJson.success[i].kiszereles[0].megn;
            //                             }

            //                             responseJson.success[i].kivalasztottmennyiseg = responseJson.success[i].min_mennyiseg;
            //                             responseJson.success[i].kedv_nettoear = null;
            //                             responseJson.success[i].uid = global.guidGenerator();
            //                             products.push(responseJson.success[i]);
            //                         }

            //                        this.setState({ products: products });
            //                     }
            //                     else
            //                     {
            //                         console.log(responseJson.error);
            //                     }

            //                 })
            //                 .catch((error) =>
            //                 {
            //                     console.error(error);
            //                 });
            //         }

            //         return;
            //     });
            // });
        }
    }

    componentWillUnmount()
    {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.subs.forEach(sub => sub.remove());
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    showKategoriakMenu = () =>
    {
        this.kategoriakMenu.show();
    }

    showAlcsoportokMenu = () =>
    {
        this.alcsoportokMenu.show();
    }

    handleNavigateBack()
    {
        global.getData('basket').then(basket =>
        {
            if (basket === null)
            {
                var products = this.state.products.slice();

                products.forEach(element =>
                {
                    element.kivalasztottmennyiseg = element.min_mennyiseg;
                });

                this.setState({
                    products: products,
                    basket: null,
                });
            }
        });
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

    _keyboardDidShow()
    {
        this.setState(state =>
        {
            state.buttonishidden = true;
            return state;
        });
    }

    _keyboardDidHide()
    {
        this.setState(state =>
        {
            state.buttonishidden = false;
            return state;
        });
    }

    onProductCheck(uid)
    {
        this.state.products.forEach(element =>
        {
            // if (element.uid === uid && element.kivalasztottmennyiseg > 0)
            // {
            //     // We check the existence of the basket.
            //     global.getData('basket').then(basket =>
            //     {
            //         if (basket !== null)
            //         {
            //             this.setState({ basket: JSON.parse(basket) });

            //             // We should find another element with the same name to gain the quantity
            //             // Register te success in a boolean

            //             var sikerultTalalni = false;

            //             var basket = JSON.parse(JSON.stringify(this.state.basket));
            //             basket.tetelek.forEach(tetel =>
            //             {
            //                 if (tetel.cikk_id === element.id)
            //                 {
            //                     tetel.mennyiseg += element.kivalasztottmennyiseg;
            //                     sikerultTalalni = true;
            //                 }
            //             });

            //             if (!sikerultTalalni)
            //             {
            //                 basket.tetelek.push({
            //                     cikk_id: element.id, // Termékek oldal
            //                     mennyiseg: element.kivalasztottmennyiseg, // Termékek oldal
            //                     nettoear: element.nettoear,
            //                     egyseg: element.egyseg,
            //                     kiszereles: element.kiszereles,
            //                     megn: element.megn,
            //                     image: element.image,
            //                     kivalasztottegyseg: element.kivalasztottegyseg,
            //                     min_mennyiseg: element.min_mennyiseg,
            //                     tomeg: element.tomeg,
            //                     kedv_kiszereles_id: element.kedv_kiszereles_id,
            //                     kedv_mennyiseg: element.kedv_mennyiseg,
            //                     kedv_engedmeny: element.kedv_engedmeny,
            //                     kedv_nettoear: element.kedv_nettoear,
            //                     uid: element.uid,
            //                 });
            //             }


            //             Alert.alert(
            //                 '',
            //                 'A terméket hozzáadtuk a kosárhoz.',
            //                 [
            //                     {
            //                         text: 'Rendben', onPress: () =>
            //                         {
            //                             element.kivalasztottmennyiseg = 0;
            //                             element.kedv_nettoear = null;
            //                             this.setState({ basket: basket });
            //                         },
            //                     },
            //                 ],
            //                 { cancelable: false }
            //             );

            //             // We save the new product immediately.
            //             global.storeData('basket', JSON.stringify(basket));

            //         }
            //         else
            //         {
            //             // We did not create the basket yet.
            //             if (this.state.basket === null)
            //             {
            //                 var basket = {
            //                     partner_id: parseInt(this.state.partnerId), //Termékek oldal
            //                     atvetel_id: null, // Áruátvétel módja oldal
            //                     cim_id: null, // Áruátvétel módja oldal
            //                     megjegyzes: '', // Termékek oldal (csak most)
            //                     tomeg: null, // Termékek oldal
            //                     fuvardij: null, // Áruátvétel módja oldal
            //                     tetelek: [],
            //                 };

            //                 basket.tetelek.push({
            //                     cikk_id: element.id, // Termékek oldal
            //                     mennyiseg: element.kivalasztottmennyiseg, // Termékek oldal
            //                     nettoear: element.nettoear,
            //                     egyseg: element.egyseg,
            //                     kiszereles: element.kiszereles,
            //                     megn: element.megn,
            //                     image: element.image,
            //                     kivalasztottegyseg: element.kivalasztottegyseg,
            //                     min_mennyiseg: element.min_mennyiseg,
            //                     tomeg: element.tomeg,
            //                     kedv_kiszereles_id: element.kedv_kiszereles_id,
            //                     kedv_mennyiseg: element.kedv_mennyiseg,
            //                     kedv_engedmeny: element.kedv_engedmeny,
            //                     kedv_nettoear: element.kedv_nettoear,
            //                     uid: element.uid,
            //                 });

            //                 element.kivalasztottmennyiseg = 0;

            //                 Alert.alert(
            //                     '',
            //                     'A terméket hozzáadtuk a kosárhoz.',
            //                     [
            //                         {
            //                             text: 'Rendben', onPress: () =>
            //                             {
            //                                 element.kivalasztottmennyiseg = 0;
            //                                 element.kedv_nettoear = null;
            //                                 this.setState({ basket: basket });
            //                             },
            //                         },
            //                     ],
            //                     { cancelable: false }
            //                 );

            //                 // We save the new product immediately.
            //                 global.storeData('basket', JSON.stringify(basket));

            //             }
            //         }
            //     });
            // }
        });
    }

    onPress(value)
    {
        this.props.navigation.navigate(value);
    }

     onCounterButtonPress(uid, value)
    {
        var products = this.state.products.slice();

        products.forEach(termek =>
        {
            if (termek.uid === uid)
            {
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

                    termek.kivalasztottmennyiseg = Math.max(termek.min_mennyiseg, termek.kivalasztottmennyiseg += value);
                    this.setState({ products: products });

                    termek.kiszereles.forEach(kiszereles =>
                    {
                        // This part handles the discount.
                        if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama)
                        {
                            var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
                            var firstCondition = termek.kivalasztottmennyiseg >= minimumKedvezmenyezettDarab;

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
                    termek.kivalasztottmennyiseg = Math.max(termek.min_mennyiseg, termek.kivalasztottmennyiseg += value);
                    this.setState({ products: products });
                }
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
                        termek.kivalasztottmennyiseg /= dividend;
                        this.setState({ products: products });
                    }

                    termek.kiszereles.forEach(kiszereles =>
                    {
                        // This part handles the discount.
                        if (kiszereles.megn === termek.kivalasztottegyseg && kedvezmenyezettKiszerelesDarabszama)
                        {
                            var minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * termek.kedv_mennyiseg;
                            var firstCondition = termek.kivalasztottmennyiseg >= minimumKedvezmenyezettDarab;

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

    onChangeText(value, name)
    {
        this.setState(state =>
        {
            state[name] = value;
            return state;
        });
    }

    onCategoryValueChange(name, value)
    {
        let parentId;

        this.state.kategoriakesalcsoportok.forEach(element =>
        {
            if (element.megn === value)
            {
                parentId = element.id;
            }
        });

        var alcsoportok = [];

        if (parentId)
        {
            this.state.kategoriakesalcsoportok.forEach(element =>
            {
                if (element.parent_id === parentId)
                {
                    alcsoportok.push(element.megn);
                }
            });
        }

        this.setState(
            {
                kivalasztottkategoria: value,
                alcsoportok: alcsoportok,
                kivalasztottalcsoport: alcsoportok[0],
            });
    }

    onGroupValueChange(name, value)
    {
        this.setState(
            {
                kivalasztottalcsoport: value,
            });
    }

    onGroupDropdownClick(name, tobefalse)
    {
        if (this.state.isGroupOpen)
        {
            this.setState(
                {
                    isGroupOpen: false,
                });
        }
        else
        {
            this.setState(
                {
                    isGroupOpen: true,
                    isCategoryOpen: false,
                });
        }
    }
}

export const styles = StyleSheet.create({
    productViewContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop:20,
    },
    scroller: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 55,
    },
});

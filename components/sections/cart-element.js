import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

export class CartElement extends Component
{
    static propTypes = {
        product: PropTypes.object,
    }

    render()
    {
        let kiszereles = [];

        kiszereles.push(<Text style={{ color: 'grey' }}>Vissza</Text>);

        if (this.props.product.kiszereles !== null)
        {
            for (let i = 0; i < this.props.product.kiszereles.length; i++)
            {
                kiszereles.push(<Text style={{ color: 'black' }}>{this.props.product.kiszereles[i].megn}</Text>);
            }
        }
        else
        {
            kiszereles.push(<Text style={{ color: 'black' }}>{this.props.product.kivalasztottegyseg}</Text>);
        }

        // As you can see down there, "hiddenbuttons" is another property, not the part of "product".
        // Please do not modify this.
        let condition = this.props.hiddenbuttons === undefined || !this.props.hiddenbuttons;

        let source = require('../../Sources/Products/cart_over.png');

        var kedvezmenyezettKiszerelesValtoszam = 1;

        if (this.props.product.kiszereles !== null)
        {
            this.props.product.kiszereles.forEach(kiszereles =>
            {
                if (this.props.product.kivalasztottegyseg === kiszereles.megn)
                {
                    kedvezmenyezettKiszerelesValtoszam = kiszereles.valtoszam;
                }
            });
        }

        let mennyiseg = 0;

        if (this.props.product.mennyiseg !== undefined)
        {
            mennyiseg = this.props.product.mennyiseg / parseInt(kedvezmenyezettKiszerelesValtoszam);
            source = require('../../Sources/OrderInProgress/bin2.png');
        }
        else
        {
            mennyiseg = this.props.product.kivalasztottmennyiseg / parseInt(kedvezmenyezettKiszerelesValtoszam);
        }

        let checker = condition ? (<View style={{ flex: 0.1, height: 20 * 5, borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'center' }}>
            <TouchableOpacity style={
                {
                    backgroundColor: '#e4eef0',
                    height: 20 * 3.5,
                    width: '100%',
                    justifyContent: 'center',
                    borderLeftWidth: 1,
                    borderLeftColor: 'white',
                    alignItems: 'center',
                }} onPress={(uid) => this.props.onCheck(this.props.product.uid)}>
                <Image source={source} style={{ width: Math.round(20 / 1.5), height: Math.round(20 / 1.5), opacity: 0.5 }} />
            </TouchableOpacity>
        </View>) : undefined;

        let buttons = condition ? (<View style={{ flex: 0.3, height: 20 * 5, borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', height: 20 * 1.5, backgroundColor: '#e4eef0', borderBottomColor: 'white', borderBottomWidth: 1 }}>
                <TouchableOpacity onPress={(uid) => this.props.onCounterButtonPress(this.props.product.uid, -1)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>-</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 10 }}>{mennyiseg}</Text>
                </View>
                <TouchableOpacity onPress={(uid) => this.props.onCounterButtonPress(this.props.product.uid, 1)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.showActionSheet} style={{ backgroundColor: '#e4eef0', height: 20 * 2, flex: 0.6, justifyContent: 'center', alignItems: 'center' }} >
                <Text>{this.props.product.kivalasztottegyseg}</Text>
            </TouchableOpacity>
        </View>) : <View style={{ flex: 0.3, height: 20 * 5, borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'center' }} />;

        var ar;
        var kedvezmenyesAr;

        var nemKedvezmenyezettMennyiseg;
        var kedvezmenyezettMennyiseg;
        var kedvezmenyezettKiszerelesDarabszama;
        var minimumKedvezmenyezettDarab;
        var kedvezmenyezettKiszerelesNeve;
        var kedvezmenyezettKiszerelesValtoszam = 1;
        var kivalasztottEgysegValtoszam = 1;

        var egyseg = this.props.product.egyseg ? 'db' : 'db';

        if (this.props.product.kiszereles !== null)
        {
            this.props.product.kiszereles.forEach(kiszereles => {

                if (kiszereles.megn === this.props.product.kivalasztottegyseg)
                {
                    kivalasztottEgysegValtoszam = kiszereles.valtoszam;
                }
            });
        }

        if (this.props.product.kedv_nettoear !== null)
        {
            if (this.props.product.kiszereles !== null)
            {
                this.props.product.kiszereles.forEach(kiszereles => {
                    if (kiszereles.egyseg_id == this.props.product.kedv_kiszereles_id)
                    {
                        kedvezmenyezettKiszerelesDarabszama = kiszereles.valtoszam;
                        minimumKedvezmenyezettDarab = kedvezmenyezettKiszerelesDarabszama * this.props.product.kedv_mennyiseg;
                        kedvezmenyezettKiszerelesValtoszam = kiszereles.valtoszam;
                        kedvezmenyezettKiszerelesNeve = kiszereles.megn;
                    }
                });

                var firstCondition = this.props.product.mennyiseg >= minimumKedvezmenyezettDarab;

                if (firstCondition)
                {
                    var modulo = this.props.product.mennyiseg % kedvezmenyezettKiszerelesDarabszama;

                    if (modulo === 0)
                    {
                        kedvezmenyezettMennyiseg = this.props.product.mennyiseg / kedvezmenyezettKiszerelesValtoszam;
                        ar = undefined;
                    }
                    else {
                        nemKedvezmenyezettMennyiseg = modulo;
                        kedvezmenyezettMennyiseg = (this.props.product.mennyiseg - nemKedvezmenyezettMennyiseg) / kedvezmenyezettKiszerelesValtoszam;

                        ar = <Text style={[styles.thickerBlackText, {fontSize: 10}]}>{nemKedvezmenyezettMennyiseg / kivalasztottEgysegValtoszam} {this.props.product.kivalasztottegyseg} {this.props.product.nettoear} Ft.- / {egyseg}</Text>;
                    }

                    kedvezmenyesAr = <Text style={[styles.thickerBlackText, {color: 'red', fontSize: 10}]}>{kedvezmenyezettMennyiseg} {kedvezmenyezettKiszerelesNeve} {this.props.product.kedv_nettoear} Ft.- / {egyseg}</Text>;
                }
                else
                {
                    ar = <Text style={[styles.thickerBlackText, {fontSize: 10}]}>{nemKedvezmenyezettMennyiseg / kivalasztottEgysegValtoszam} {this.props.product.kivalasztottegyseg} {this.props.product.nettoear} Ft.- / {egyseg}</Text>;
                }
            }
            else
            {
               ar = <Text style={[styles.thickerBlackText, {fontSize: 10}]}>{this.props.product.mennyiseg / kivalasztottEgysegValtoszam} {this.props.product.kivalasztottegyseg}  {this.props.product.nettoear} Ft.- / {egyseg}</Text>;
            }
        }
        else
        {
            ar = <Text style={[styles.thickerBlackText, {fontSize: 10}]}>{this.props.product.mennyiseg / kivalasztottEgysegValtoszam} {this.props.product.kivalasztottegyseg}  {this.props.product.nettoear} Ft.- / {egyseg}</Text>;
        }

        let lebontas = <Text style={{ fontStyle: 'italic', fontSize: 10 }}>Összesen {this.props.product.mennyiseg} darab</Text>;
        let destructiveButtonIndex = this.props.product.kiszereles !== null ? this.props.product.kiszereles.length : 1;

        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.7, height: 20 * 5, borderBottomColor: 'black', borderBottomWidth: 1 }}>
                    <Text style={[styles.thickerGreenText, { marginTop: 20 / 2 }]}>{this.props.product.megn}</Text>

                    <View style={{ flexDirection: 'row', marginTop: 20 / 4 }}>
                        <View style={{ flex: 0.3 }}>
                            <Image source={{ uri: this.props.product.image }} style={{ width: 40, height: 30 }} />
                        </View>
                        <View style={{ flex: 0.7 }}>
                            {kedvezmenyesAr}
                            {ar}
                            {lebontas}
                        </View>
                    </View>
                </View>

                {buttons}
                {checker}

                <View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        // title={<Text style={{ color: '#000', fontSize: 18 }}>Átvétel módja</Text>}
                        options={kiszereles}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={destructiveButtonIndex}
                        onPress={(index) =>
                        {
                            // Zero index is the cancel button
                            if (index !== 0 && this.props.product.kiszereles !== null)
                            {
                                this.props.onPickerValueChange(this.props.product.uid, this.props.product.kiszereles[index - 1].megn);
                            }
                        }}
                    />
                </View>
            </View>
        );
    }

    showActionSheet = () =>
    {
        this.ActionSheet.show();
    }

    onChange(value, name)
    {
        this.setState(state =>
        {
            state[name] = value;
            return state;
        });
    }

    shouldComponentUpdate(nextProps)
    {
        if (
            nextProps.product.mennyiseg !== this.props.product.mennyiseg
            || nextProps.product.kivalasztottmennyiseg !== this.props.product.kivalasztottmennyiseg
            || nextProps.product.kivalasztottegyseg !== this.props.product.kivalasztottegyseg
            || nextProps.product.kivalasztva !== this.props.product.kivalasztva
            || nextProps.product.showPieces !== this.props.product.showPieces
            || nextProps.product.kedv_nettoear !== this.props.product.kedv_nettoear
            || nextProps.hiddenbuttons !== this.props.hiddenbuttons
        )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

export const styles = StyleSheet.create({
    thickerGreenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
    thickerBlackText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
});


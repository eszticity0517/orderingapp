import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { ProductElementChecker } from './components/product-element-checker';

export class ProductElement extends Component {
    static propTypes = {
        product: PropTypes.object,
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.3, height: 20 * 5, borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'center' }}>
                    <Image source={{ uri: this.props.product.image }} style={{ width: 30, height: 40 }} />
                </View>

                {this.renderArazas()}
                {this.renderButtons()}
                {this.renderChecker()}

                <View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={this.renderKiszereles()}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={this.renderDestructiveButtonIndex()}
                        onPress={(index) => {
                            // Zero index is the cancel button
                            if (index !== 0 && this.props.product.kiszereles !== null) {
                                this.props.onPickerValueChange(this.props.product.uid, this.props.product.kiszereles[index - 1].megn);
                            }
                        }}
                    />
                </View>
            </View>
        );
    }

    showActionSheet = () => {
        this.ActionSheet.show();
    }

    onChange(value, name) {
        this.setState(state => {
            state[name] = value;
            return state;
        });
    }

    areButtonsHidden() {
        return (!this.props.hiddenbuttons);
    }

    renderArazas() {
        var ar;
        var lebontas;

        if (this.props.total) {
            ar = <Text style={styles.thickerBlackText}>{Math.round(this.props.total)} Ft.-</Text>;
        }
        else if (!this.props.displayTotal) {

            if (this.props.product.kiszereles === null || this.props.showPieces) {
                ar = <Text style={styles.thickerBlackText}>{this.props.product.nettoear} Ft.- / {this.props.product.egyseg}</Text>;
            }
            else if (this.props.product.kiszereles !== null && !this.props.showPieces) {
                let valtoszam = 1;

                this.props.product.kiszereles.forEach(element => {
                    if (element.megn === this.props.product.kivalasztottegyseg) {
                        valtoszam = parseInt(element.valtoszam);
                    }
                });

                ar = <Text style={styles.thickerBlackText}>{Math.round(this.props.product.nettoear * valtoszam)} Ft.- / {this.props.product.kivalasztottegyseg}</Text>;
            }

            if (this.props.product.kivalasztottegyseg !== this.props.product.egyseg && this.props.product.kiszereles !== null) {
                let valtoszam = 1;

                this.props.product.kiszereles.forEach(element => {
                    if (element.megn === this.props.product.kivalasztottegyseg) {
                        valtoszam = parseInt(element.valtoszam);
                    }
                });

                lebontas = <Text style={{ fontSize: 10, fontFamily: 'italic' }}>{Math.round(valtoszam)} db / {this.props.product.kivalasztottegyseg}</Text>;
            }
        }

        return (
            <View style={{ flex: 0.5, height: 20 * 5, borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'center' }}>
                <Text style={styles.thickerBlackText}>{this.props.product.megn}</Text>
                {ar}
                {lebontas}
            </View>
        );
    }

    renderButtons() {
        let buttons = this.areButtonsHidden() ? (<View style={{ flex: 0.3, height: 20 * 5, borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', height: 20 * 1.5, backgroundColor: '#e4eef0', borderBottomColor: 'white', borderBottomWidth: 1 }}>
                <TouchableOpacity onPress={(uid) => this.props.onCounterButtonPress(this.props.product.uid, -1)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>-</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 10 }}>{this.renderMennyiseg()}</Text>
                </View>
                <TouchableOpacity onPress={(uid) => this.props.onCounterButtonPress(this.props.product.uid, 1)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.showActionSheet} style={{ backgroundColor: '#e4eef0', height: 20 * 2, flex: 0.6, justifyContent: 'center', alignItems: 'center' }} >
                <Text>{this.props.product.kivalasztottegyseg}</Text>
            </TouchableOpacity>
        </View>) : <View style={{ flex: 0.3, height: 20 * 5, borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'center' }} />;
    }

    renderChecker()
    {
        return (this.areButtonsHidden() ?
            (<ProductElementChecker
                product={this.props.product}
                onCheck={this.props.onCheck.bind(this)}
            />)
            :
            undefined
        );
    }

    renderKiszereles() {
        let kiszereles = [];

        kiszereles.push(<Text style={{ color: 'grey' }}>Vissza</Text>);

        if (this.props.product.kiszereles !== null) {
            for (let i = 0; i < this.props.product.kiszereles.length; i++) {
                kiszereles.push(<Text style={{ color: 'black' }}>{this.props.product.kiszereles[i].megn}</Text>);
            }
        }
        else {
            kiszereles.push(<Text style={{ color: 'black' }}>{this.props.product.kivalasztottegyseg}</Text>);
        }

        return kiszereles;
    }

    renderDestructiveButtonIndex() {
        return (this.props.product.kiszereles !== null ? this.props.product.kiszereles.length : 1);
    }

    renderMennyiseg() {
        var valtoszam = 1;

        if (this.props.product.kiszereles !== null) {
            this.props.product.kiszereles.forEach(kiszereles => {
                if (this.props.product.kivalasztottegyseg === kiszereles.megn) {
                    valtoszam = kiszereles.valtoszam;
                }
            });
        }

        let mennyiseg;

        if (this.props.product.mennyiseg) {
            mennyiseg = this.props.product.mennyiseg / parseInt(valtoszam);
        }
        else {
            mennyiseg = this.props.product.kivalasztottmennyiseg / parseInt(valtoszam);
        }

        return mennyiseg;
    }

    // As you can see down there, "hiddenbuttons" is another property, not the part of "product".
    // Please do not modify this.

    shouldComponentUpdate(nextProps) {
        if (
            nextProps.product.mennyiseg !== this.props.product.mennyiseg
            || nextProps.product.kivalasztottmennyiseg !== this.props.product.kivalasztottmennyiseg
            || nextProps.product.kivalasztottegyseg !== this.props.product.kivalasztottegyseg
            || nextProps.product.kivalasztva !== this.props.product.kivalasztva
            || nextProps.product.showPieces !== this.props.product.showPieces
            || nextProps.product.kedv_nettoear !== this.props.product.kedv_nettoear
            || nextProps.hiddenbuttons !== this.props.hiddenbuttons
        ) {
            return true;
        }

        return false;
    }
}

export const styles = StyleSheet.create({
    thickerBlackText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
    thickerGreenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
});


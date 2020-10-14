import React, { Component } from 'react';
import { View} from 'react-native';
import PropTypes from 'prop-types';
import { ProductElementChecker } from './components/product-element-checker';
import { ProductElementAmountSelector } from './components/product-element-amount-selector';
import { ProductImage } from './components/product-image';
import { ProductPackagingSelector } from './components/product-packaging-selector';
import { ProductPrice } from './components/product-price';

export class ProductElement extends Component {
    static propTypes = {
        product: PropTypes.object,
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <ProductImage product={this.props.product}/>
                <ProductPrice
                    total={this.props.total}
                    product={this.props.product}
                    displayTotal={this.props.displayTotal}
                />

                {this.renderButtons()}
                {this.renderChecker()}

                <ProductPackagingSelector product={this.props.product} onPickerValueChange={this.props.onPickerValueChange.bind(this)}/>
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

    renderButtons()
    {
        return (
            <ProductElementAmountSelector
                product={this.props.product}
                onCounterButtonPress={this.props.onCounterButtonPress.bind(this)}
                hidden={this.areButtonsHidden()} />
        );
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
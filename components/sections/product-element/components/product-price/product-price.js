import React, { Component } from 'react';
import { Text, View } from 'react-native';
import mainStyles from '../../../../../main-styles.scss';
import styles from './product-price.scss';

export class ProductPrice extends Component
{
    render()
    {
        return (
            <View style={styles.priceContainer}>
                <Text style={mainStyles.thickerBlackText}>{this.props.product.megn}</Text>
                {this.renderPrice()}
                {this.renderBreakdown()}
            </View>
        );
    }

    renderPrice()
    {
        if (this.props.total)
        {
            return (<Text style={mainStyles.thickerBlackText}>{Math.round(this.props.total)} Ft.-</Text>);
        }

        else if (!this.props.displayTotal)
        {
            if (this.props.product.kiszereles === null || this.props.showPieces)
            {
                return (<Text style={mainStyles.thickerBlackText}>{this.props.product.nettoear} Ft.- / {this.props.product.egyseg}</Text>);
            }
            else if (this.props.product.kiszereles !== null && !this.props.showPieces)
            {
                let valtoszam = 1;

                this.props.product.kiszereles.forEach(element => {
                    if (element.megn === this.props.product.kivalasztottegyseg)
                    {
                        valtoszam = parseInt(element.valtoszam);
                    }
                });

                return (<Text style={mainStyles.thickerBlackText}>{Math.round(this.props.product.nettoear * valtoszam)} Ft.- / {this.props.product.kivalasztottegyseg}</Text>);
            }
        }

        return undefined;
    }

    renderBreakdown()
    {
        var lebontas;

        if (!this.props.displayTotal) {

            if (this.props.product.kivalasztottegyseg !== this.props.product.egyseg && this.props.product.kiszereles !== null)
            {
                let valtoszam = 1;

                this.props.product.kiszereles.forEach(element => {
                    if (element.megn === this.props.product.kivalasztottegyseg)
                    {
                        valtoszam = parseInt(element.valtoszam);
                    }
                });

                lebontas = <Text style={styles.breakdownText}>{Math.round(valtoszam)} db / {this.props.product.kivalasztottegyseg}</Text>;
            }
        }

        return lebontas;
    }
}

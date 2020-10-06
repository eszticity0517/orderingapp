import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';

export class ProductPrice extends Component
{
    render()
    {
        return (
            <View style={styles.priceContainer}>
                <Text style={styles.thickerBlackText}>{this.props.product.megn}</Text>
                {this.renderPrice()}
                {this.renderBreakdown()}
            </View>
        );
    }

    renderPrice()
    {
        if (this.props.total)
        {
            return (<Text style={styles.thickerBlackText}>{Math.round(this.props.total)} Ft.-</Text>);
        }

        else if (!this.props.displayTotal)
        {
            if (this.props.product.kiszereles === null || this.props.showPieces)
            {
                return (<Text style={styles.thickerBlackText}>{this.props.product.nettoear} Ft.- / {this.props.product.egyseg}</Text>);
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

                return (<Text style={styles.thickerBlackText}>{Math.round(this.props.product.nettoear * valtoszam)} Ft.- / {this.props.product.kivalasztottegyseg}</Text>);
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

export const styles = StyleSheet.create({
    thickerBlackText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
    },
    thickerGreenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
    priceContainer: {
        flex: 0.5,
        height: 20 * 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    breakdownText: {
        fontSize: 10,
        fontFamily: 'italic',
    },
});


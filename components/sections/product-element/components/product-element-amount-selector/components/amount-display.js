import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class AmountDisplay extends Component
{
    render()
    {
        return (
            <View style={styles.counterActionsContainer}>
                <Text style={styles.amountText}>{this.renderMennyiseg()}</Text>
            </View>
        );
    }

    renderMennyiseg()
    {
        var valtoszam = 1;

        if (this.props.product.kiszereles !== null)
        {
            this.props.product.kiszereles.forEach(kiszereles => {

                if (this.props.product.kivalasztottegyseg === kiszereles.megn)
                {
                    valtoszam = kiszereles.valtoszam;
                }
            });
        }

        let mennyiseg;

        if (this.props.product.mennyiseg)
        {
            mennyiseg = this.props.product.mennyiseg / parseInt(valtoszam);
        }
        else
        {
            mennyiseg = this.props.product.kivalasztottmennyiseg / parseInt(valtoszam);
        }

        return mennyiseg;
    }
}

export const styles = StyleSheet.create({
    amountActionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amountText: {
        fontSize: 10,
    },
});

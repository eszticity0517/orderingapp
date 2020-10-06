import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

export class ProductPackagingSelector extends Component
{
    render()
    {
        return (
            <View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={this.renderKiszereles()}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={this.renderDestructiveButtonIndex()}
                    onPress={(index) => {
                        // Zero index is the cancel button.
                        if (index !== 0 && this.props.product.kiszereles !== null) {
                            this.props.onPickerValueChange(this.props.product.uid, this.props.product.kiszereles[index - 1].megn);
                        }
                    }}
                />
            </View>
        );
    }

    renderKiszereles()
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

        return kiszereles;
    }

    renderDestructiveButtonIndex()
    {
        return (this.props.product.kiszereles !== null ? this.props.product.kiszereles.length : 1);
    }
}
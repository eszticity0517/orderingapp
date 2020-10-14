import React, {Component} from 'react';
import { OrderElementContainer } from './components/order-element-container';
import { OrderElementDetails } from './components/order-element-details';
import { OrderElementIconButton } from './components/order-element-icon-button';

export class OrderElement extends Component
{
    constructor()
    {
        super();
        this.state = {
            isChecked: false,
        };
    }

    render()
    {
        return (
            <OrderElementContainer>
                <OrderElementDetails createDate={this.props.response.kelt} products={this.renderTermekek()} />
                <OrderElementIconButton onPress={this.onPress.bind(this)} />
            </OrderElementContainer>
        );
    }

    renderTermekek()
    {
        let termekek = '';

        for (let i = 0; i < this.props.response.items.length; i++)
        {
            termekek += this.props.response.items[i].megn;

            if (this.props.response.items.length - 1 !== i)
            {
                termekek += ', ';
            }
        }

        return termekek;
    }

    onPress(value)
    {
        this.props.navigation.navigate('Reorder', { order: this.props.response });
    }

    onCheck()
    {
        if (this.state.isChecked)
        {
            this.setState(state =>
            {
                state.isChecked = false;
                return state;
            });
        }
        else
        {
            this.setState(state =>
            {
                state.isChecked = true;
                return state;
            });
        }
    }
}
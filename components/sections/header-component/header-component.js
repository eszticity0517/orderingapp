import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';
import {HeaderMenuComponent} from './components/header-menu-component';
import '../../../global';
import { HeaderCloseButton } from './components/header-close-button';
import { HeaderMenuHandlerButton } from './components/header-menu-handler-button';
import mainStyles from '../../../main-styles.scss';

export class HeaderComponent extends Component
{
    static navigationOptions = {
        header: null,
    };

    constructor()
    {
        super();
        this.state = {
            partnerneve: '',
            size: global.size,
        };
    }

    componentDidMount()
    {
        global.getData('partnerneve').then(partnerneve =>
        {
            this.setState(state =>
            {
                state.partnerneve = partnerneve;
                return state;
            });
        });
    }

    render()
    {
        return (
            <View>
                {this.renderMenuComponent()}
                {this.renderSecondaryHeaderShape()}

                <View flexDirection="row" style={{ position: 'absolute', zIndex: 1 }}>
                    <HeaderCloseButton onPress={this.props.onPress.bind(this)}/>
                    <Text style={mainStyles.bigCenteredText}>Áttekintés</Text>
                    <HeaderMenuHandlerButton onMenuOpenPress={this.props.onMenuOpenPress.bind(this)} />
                </View>
                <View style={[styles.primaryHeaderShape, {
                    height: this.state.size.height / 3,
                    width: this.state.size.width - 40,
                }]}>
                    <View style={{ flex: 2, marginTop: this.state.size.height / 6 - 20 }}>
                        <Text>SZÁLLÍTÁS</Text>
                        <Text style={{ color: 'white' }}>{this.state.partnerneve}</Text>
                        <Text style={{ color: 'white' }}>{this.props.szallitasiadatok}</Text>
                        <Text>A RENDELÉS ADATAI:</Text>
                    </View>

                    {this.renderRendelesAdatok()}
                </View>
            </View>
        );
    }

    renderSecondaryHeaderShape()
    {
        var secondaryHeaderShapeStyle =
        {
            borderBottomLeftRadius: this.state.size.width,
            borderBottomRightRadius: this.state.size.width,
            width: (this.state.size.width),
            height: (this.state.size.width / 4),
            top: -(this.state.size.width / 12) + 20,
        };

        return (<View style={[styles.secondaryHeaderShape, secondaryHeaderShapeStyle]} />);
    }

    renderMenuComponent()
    {
        return (this.props.isMenuOpened ? <HeaderMenuComponent navigation={this.props.navigation} onMenuOpenPress={this.props.onMenuOpenPress.bind(this)}/> : undefined);
    }

    renderRendelesAdatok()
    {
        if (this.props.orderdate && this.props.total)
        {
            return (
            <View style={{ flex: 1, marginTop: this.state.size.height / 6 - 20 }}>
                <Text>{this.props.orderdate}</Text>
                <Text>{Math.round(this.props.total)} Ft.-</Text>
                <Text style={{ color: 'white' }}>{this.renderStatusz()}</Text>
            </View>
            );
        }

        return undefined;
    }

    renderStatusz()
    {
        return (this.props.orderstatus === 1) ? 'Nyitott' : 'Teljesített';
    }

    onPress(value)
    {
        // This could be useful p.es. in case of ReorderComponent state change on navigation.
        this.props.onPress();
        this.props.navigation.navigate(value);
    }
}

export const styles = StyleSheet.create({
    secondaryHeaderShape: {
        position: 'absolute',
        zIndex: 1,
        left: -20,
        backgroundColor: 'white',
    },
    primaryHeaderShape: {
        flexDirection: 'row',
        backgroundColor: '#77D353',
        padding: 20,
    },
});

AppRegistry.registerComponent('HeaderComponent', () => HeaderComponent);

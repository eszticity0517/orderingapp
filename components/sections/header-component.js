import React, {Component} from 'react';
import {AppRegistry, Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {MenuComponent} from './menu-component';
import '../../global';

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
                <View style={{
                    position: 'absolute',
                    zIndex: 1,
                    width: (this.state.size.width),
                    height: (this.state.size.width / 4),
                    top: -(this.state.size.width / 12) + 20,
                    left: -20,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: this.state.size.width,
                    borderBottomRightRadius: this.state.size.width,
                }} />
                <View flexDirection="row" style={{ position: 'absolute', zIndex: 1 }}>
                    <TouchableOpacity style={{ flex: 1, height: 50 }} onPress={this.props.onPress.bind(this)}>
                        <Image
                            style={{ width: 20, height: 20, margin: 10, marginLeft: 5 }}
                            source={require('../../Sources/Headermenu/closeMenu_over.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.welcome}>Áttekintés</Text>
                    <TouchableOpacity style={{ flex: 1, height: 50 }} onPress={this.props.onMenuOpenPress.bind(this)}>
                        <Image
                            style={{ width: 20, height: 20, margin: 10, position: 'absolute', right: 0 }}
                            source={require('../../Sources/Headermenu/openMenu_over.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: "#77D353", padding: 20, height: this.state.size.height / 3, width: this.state.size.width - 40 }}>
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

    renderMenuComponent()
    {
        return (this.props.isMenuOpened ? <MenuComponent navigation={this.props.navigation} onMenuOpenPress={this.props.onMenuOpenPress.bind(this)}/> : undefined);
    }

    renderRendelesAdatok()
    {
        if (this.props.orderdate && this.props.total)
        {
            return (<View style={{ flex: 1, marginTop: this.state.size.height / 6 - 20 }}>
                <Text>{this.props.orderdate}</Text>
                <Text>{Math.round(this.props.total)} Ft.-</Text>
                <Text style={{ color: 'white' }}>{this.renderStatusz()}</Text>
            </View>);
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

AppRegistry.registerComponent('HeaderComponent', () => HeaderComponent);

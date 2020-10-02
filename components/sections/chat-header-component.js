import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {HeaderMenuComponent} from './header-component/components/header-menu-component';

export class ChatHeaderComponent extends Component
{
    render()
    {
        return (
            <View>
                {this.renderMenuComponent()}
                <View style={{ paddingLeft: 20 / 2, flexDirection: 'row', height: 20 * 2, width: '100%', backgroundColor: "#77D353", alignSelf: 'stretch' }}>
                    <View style={{ flex: 0.9, justifyContent: 'center', height: 20 * 2 }}>
                        <Text style={styles.welcomeSmallNoTextAlign}>Chat</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', height: 20 * 2 }} onPress={this.props.onMenuOpenPress.bind(this)}>
                        <Image
                            style={{ width: 20, height: 20 * 0.75, marginRight: 20 / 2 }}
                            source={require('../../Sources/Chat/openMenu_over.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderMenuComponent()
    {
        return (this.props.isMenuOpened ? <HeaderMenuComponent navigation={this.props.navigation} onMenuOpenPress={this.props.onMenuOpenPress.bind(this)} /> : undefined);
    }
}



export const styles = StyleSheet.create({
    welcomeSmallNoTextAlign: {
        fontSize: 15,
        color: 'white',
    },
});


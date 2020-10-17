import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {HeaderMenuComponent} from '../header-component/components/header-menu-component';
import styles from './chat-header-component.scss';

export class ChatHeaderComponent extends Component
{
    render()
    {
        return (
            <View>
                {this.renderMenuComponent()}
                <View style={styles.innerContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.welcomeSmallNoTextAlign}>Chat</Text>
                    </View>
                    <TouchableOpacity style={styles.imageContainer} onPress={this.props.onMenuOpenPress.bind(this)}>
                        <Image
                            style={styles.image}
                            source={require('../../../Sources/Chat/openMenu_over.png')}
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
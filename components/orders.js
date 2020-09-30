import React, {Component} from 'react';
import {AppState, AsyncStorage, Text, View} from 'react-native';

export class Orders extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    //#region

    constructor() {
        super();
        this.state = {
            isChecked: false,
            rendelesek: [],
            appState: AppState.currentState,
            loading: false,
            orders: null,
        };
    }

    render() {
        return (
            <View />
        );
    }
}

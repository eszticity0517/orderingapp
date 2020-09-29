import React, {Component} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

export class ButtonContainer extends Component
{
    render()
    {
        let container = null;
        let style= this.props.style ? [styles.buttonContainer, this.props.style] : styles.buttonContainer;

        if (!this.props.hidden || this.props.hidden === false)
        {
            container = (<View style={style}>{this.props.children}</View>);
        }

        return (container);
    }
}

export const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        backgroundColor: "white",
        height: 50,
        flexDirection: "row",
        bottom: 0,
        flex: 1,
        alignSelf: 'stretch',
        right: 0,
        left: 0,
        zIndex: 1,
        paddingLeft: 20,
        paddingRight: 20
    }
});

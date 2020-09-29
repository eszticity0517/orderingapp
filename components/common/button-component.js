import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export class ButtonComponent extends Component
{
    render()
    {
        var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : "#323232";

        if (this.props.type && this.props.type === "stretch")
        {
            return (
                <View style={{ height: 60, width: "100%" }}>
                    <TouchableOpacity onPress={this.props.onPress.bind(this)} style={styles.touchableHighlightStyle}>
                        <View style={{ backgroundColor: backgroundColor, alignItems: "center", justifyContent: "center", height: 30, borderRadius: 3 }}>
                            <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else
        {
            return (
                <TouchableOpacity onPress={this.props.onPress.bind(this)} style={styles.touchableHighlightStyle}>
                    <View style={{ backgroundColor: backgroundColor, alignItems: "center", justifyContent: "center", height: 30, borderRadius: 3 }}>
                        <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

export const styles = StyleSheet.create({
    touchableHighlightStyle: {
        flex: 1,
        alignSelf: 'stretch'
    },
    buttonText: {
        color: "white",
        fontWeight: "300"
    }
});


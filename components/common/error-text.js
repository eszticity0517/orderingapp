import React, {Component} from 'react';
import {Text} from 'react-native';

export class ErrorText extends Component
{
    render()
    {
        return (
          <Text style={{ color: "red" }}>{" " + this.props.text}</Text>
        );
    }
}

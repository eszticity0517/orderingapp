import React, {Component} from 'react';
import * as styles from "./container.scss";

export class Container extends Component
{
    render()
    {
        return(
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});
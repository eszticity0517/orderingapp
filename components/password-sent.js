import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container } from './common/container';
import { ScrollComponent } from './common/scroll-component';
import { ButtonComponent } from './common/button-component';
import { ButtonContainer } from './common/button-container';
import { CarouselComponent } from './sections/carousel-component';
import '../global.js';

export class PasswordSent extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor() {
        super();
        this.state = {
            size: global.size,
        };
    }

    render() {
        return (
            <Container>
                <ScrollComponent>
                    <CarouselComponent />
                    <Text style={styles.welcome}>Az új jelszót elküldtük.</Text>
                </ScrollComponent>

                <ButtonContainer>
                    <ButtonComponent onPress={this.onPress.bind(this)} text="Vissza a bejelentkezéshez" />
                </ButtonContainer>
            </Container>
        );
    }

    onPress() {
        this.props.navigation.navigate('Login');
    }
}

export const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

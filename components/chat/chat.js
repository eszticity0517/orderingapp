import React, {Component} from 'react';
import {AppState, View} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {ChatHeaderComponent} from '../sections/chat-header-component';
import '../../global.js';
import {Indicator} from '../common/indicator';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './chat.scss';

export class Chat extends Component
{
    intervalHandler;

    static navigationOptions = {
        headerShown: false,
    };

    constructor()
    {
        super();
        this.state = {
            messages: [],
            appState: AppState.currentState,
            isMenuOpened: false,
            partnerId: null,
            vendor: null,
            loading: false,
        };
    }

    render()
    {
        return (
            <View style={styles.chatContainer}>
                <ChatHeaderComponent navigation={this.props.navigation} onMenuOpenPress={this.onMenuOpenPress.bind(this)} isMenuOpened={this.state.isMenuOpened}/>
                <GiftedChat
                    renderBubble={this.renderBubble}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 0,
                    }}
                />
                <Indicator  transparent={false} visible={this.state.loading}/>
            </View>
        );
    }

    componentDidMount()
    {
        AppState.addEventListener('change', this.handleAppStateChange);

        // global.getData('partner_id').then(partnerId =>
        // {
        //     global.getData('vendor').then(vendor =>
        //     {
        //         this.setState({
        //             partnerId: partnerId,
        //             vendor: vendor,
        //         });

        //         var values = {
        //             id: JSON.stringify({
        //                 vendor: vendor,
        //                 object: 'rshop',
        //                 method: 'chatGet',

        //                 params: {
        //                     partner_id: parseInt(partnerId),
        //                 },
        //             }),
        //         };

        //         var formBody = [];
        //         for (var property in values)
        //         {
        //             var encodedKey = encodeURIComponent(property);
        //             var encodedValue = encodeURIComponent(values[property]);
        //             formBody.push(encodedKey + '=' + encodedValue);
        //         }

        //         formBody = formBody.join('&');
        //         this.setState({loading: true});
        //         fetch(global.baseUrl, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //             },
        //             body: formBody,
        //         }).then((response) => response.json())
        //             .then((responseJson) =>
        //             {
        //                 this.setState({loading: false});

        //                 if (responseJson.success)
        //                 {
        //                     let messages = [];

        //                     for (let i = 0; i < responseJson.success.length; i++)
        //                     {
        //                         messages.push({
        //                             _id: i,
        //                             text: responseJson.success[i].uzenet,
        //                             createdAt: responseJson.success[i].datum,
        //                             user: {
        //                                 _id: responseJson.success[i].ki,
        //                                 name: responseJson.success[i].nev,
        //                             },
        //                         });
        //                     }

        //                     if (this.state.messages.length !== messages.length)
        //                     {
        //                         this.setState(state =>
        //                         {
        //                             state.messages = messages.reverse();
        //                             return state;
        //                         });
        //                     }
        //                 }
        //             })
        //             .catch((error) =>
        //             {
        //                 this.setState({loading: false});
        //                 console.error(error);
        //             });

        //     });
        // });

        // this.setState(previousState => ({
        //     messages: GiftedChat.append(previousState.messages, this.state.messages),
        // }));
    }

    componentWillUnmount()
    {
        AppState.removeEventListener('change', this.handleAppStateChange);
        clearInterval(this.intervalHandler);
    }

    onMenuOpenPress()
    {
        if (this.state.isMenuOpened)
        {
            this.setState(state =>
            {
                state.isMenuOpened = false;
                return state;
            });
        }
        else
        {
            this.setState(state =>
            {
                state.isMenuOpened = true;
                return state;
            });
        }
    }

    _startInterval()
    {
        this.intervalHandler = setInterval(() =>
        {
            global.getData('partner_id').then(partnerId =>
            {
                if (partnerId !== null)
                {
                    global.getData('vendor').then(vendor =>
                    {
                        if (vendor !== null)
                        {
                            var values = {
                                id: JSON.stringify({
                                    vendor: vendor,
                                    object: 'rshop',
                                    method: 'chatGet',

                                    params: {},
                                }),
                            };

                            var formBody = [];
                            for (var property in values)
                            {
                                var encodedKey = encodeURIComponent(property);
                                var encodedValue = encodeURIComponent(values[property]);
                                formBody.push(encodedKey + '=' + encodedValue);
                            }

                            formBody = formBody.join('&');
                            this.setState({loading: true});
                            fetch(global.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                },
                                body: formBody,
                            }).then((response) => response.json())
                                .then((responseJson) =>
                                {
                                    this.setState({loading: false});

                                })
                                .catch((error) =>
                                {
                                    this.setState({loading: false});
                                    console.error(error);
                                });
                        }
                    });
                }
            });
        }, 5000);
    }

    onSend(messages = [])
    {
        var values = {
            id: JSON.stringify({
                vendor: this.state.vendor,
                object: 'rshop',
                method: 'chatSend',

                params: {
                    partner_id: this.state.partnerId,
                    uzenet: messages[messages.length - 1].text,
                },
            }),
        };

        var formBody = [];
        for (var property in values)
        {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(values[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }

        formBody = formBody.join('&');
        this.setState({loading: true});
        fetch(global.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formBody,
        }).then((response) => response.json())
            .then((responseJson) =>
            {
                this.setState({loading: false});
                let messages = [];

                if (responseJson.success)
                {
                    for (let i = 0; i < responseJson.success.length; i++)
                    {
                        messages.push({
                            _id: i,
                            text: responseJson.success[i].uzenet,
                            createdAt: responseJson.success[i].datum,
                            user: {
                                _id: responseJson.success[i].ki,
                                name: responseJson.success[i].nev,
                            },
                        });
                    }
                }
            })
            .catch((error) =>
            {
                this.setState({loading: false});
                console.error(error);
            });

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    renderBubble(props)
    {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#77D353',
                    },
                }}
            />
        );
    }

    handleAppStateChange = (nextAppState) =>
    {
        if (nextAppState.match(/inactive|background/) && this.state.appState === 'active')
        {
            this.setState({ appState: nextAppState });

            AsyncStorage.setItem('maintainBasket', 'yes').then(() => {
                this.props.navigation.navigate('Login');
            });
        }
    }
}

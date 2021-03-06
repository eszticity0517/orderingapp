import React, {Component} from 'react';
import {Text, View} from 'react-native';
import '../../../global';
import mainStyles from '../../main-styles.scss';
import styles from './summary-component.scss';

export class SummaryComponent extends Component
{
    constructor()
    {
        super();
        this.state = {
            uzenetekSzama: 0,
            nyitottRendelesek: 0,
            teljesitettRendelesek: 0,
        };
    }

    componentDidMount()
    {
        // global.getData('partner_id').then(partnerId =>
        // {
        //     global.getData('vendor').then(vendor =>
        //     {
        //         // GET MESSAGE DATA
        //         var values = {
        //             id: JSON.stringify({
        //                 vendor: vendor,
        //                 object: 'rshop',
        //                 method: 'push',

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
        //         fetch(global.baseUrl, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //             },
        //             body: formBody,
        //         }).then((response) => response.json())
        //             .then((responseJson) =>
        //             {
        //                 if (responseJson.success)
        //                 {
        //                     for (let i = 0; i < responseJson.success.length; i++)
        //                     {
        //                         this.setState(state =>
        //                         {
        //                             state.uzenetekSzama++;
        //                             return state;
        //                         });
        //                     }
        //                 }
        //             })
        //             .catch((error) =>
        //             {
        //                 console.error(error);
        //             });

        //             // GET ORDER DATA

        //             var values = {
        //                 id: JSON.stringify({
        //                     vendor: vendor,
        //                     object: 'rshop',
        //                     method: 'szamlak',

        //                     params: {
        //                         partner_id: parseInt(partnerId),
        //                     },
        //                 }),
        //             };

        //             var formBody = [];
        //             for (var property in values)
        //             {
        //                 var encodedKey = encodeURIComponent(property);
        //                 var encodedValue = encodeURIComponent(values[property]);
        //                 formBody.push(encodedKey + '=' + encodedValue);
        //             }

        //             formBody = formBody.join('&');
        //             fetch(global.baseUrl, {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //                 },
        //                 body: formBody,
        //             }).then((response) => response.json())
        //                 .then((responseJson) =>
        //                 {
        //                     if (responseJson.success)
        //                     {
        //                         var nyitott = 0;
        //                         var teljesitett = 0;

        //                         for (let i = 0; i < responseJson.success.length; i++)
        //                         {
        //                             if (responseJson.success[i].nyitott === 0)
        //                             {
        //                                 teljesitett++;
        //                             }
        //                             else if (responseJson.success[i].nyitott === 1)
        //                             {
        //                                 nyitott++;
        //                             }
        //                         }

        //                         this.setState(state => {
        //                             state.nyitottRendelesek = nyitott;
        //                             state.teljesitettRendelesek = teljesitett;
        //                             return state;
        //                         });
        //                     }
        //                 })
        //                 .catch((error) =>
        //                 {
        //                     console.error(error);
        //                 });
        //     });
        // });
    }

    render()
    {
        return (
            <View style={styles.summaryComponent}>
                <View style={styles.blockWithBorder}>
                    <Text style={mainStyles.thickerGreenText}>{this.state.nyitottRendelesek}</Text>
                    <Text>nyitott</Text>
                </View>
                <View style={styles.blockWithBorder}>
                    <Text style={mainStyles.thickerGreenText}>{this.state.teljesitettRendelesek}</Text>
                    <Text>teljesített</Text>
                </View>
                <View style={styles.blockWithoutBorder}>
                    <Text style={mainStyles.thickerGreenText}>{this.state.uzenetekSzama}</Text>
                    <Text>üzenet</Text>
                </View>
            </View>
        );
    }
}


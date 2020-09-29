import {Dimensions, AsyncStorage} from 'react-native';

global.baseUrl = "valami";
global.size =  Dimensions.get('window');


global.getData = async (key) =>
{
    var item = await AsyncStorage.getItem(key);
    return item;
}


global.storeData = async (name, data) =>
{
    try
    {
        await AsyncStorage.setItem(name, data);
    } catch (error)
    {
        console.log(error);
    }
}

global.guidGenerator = function()
{
    var S4 = function ()
    {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

global.removeItemValue = async (key) =>
{
    try
    {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (exception)
    {
        return false;
    }
}

global.numberWithSpaces = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

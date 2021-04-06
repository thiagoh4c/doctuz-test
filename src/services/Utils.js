import { Platform, StatusBar } from "react-native";

const Utils = {};

Utils.mask = (input, mask) => {
    let output = '';
    input = input.replace(/\D+/gmi, '').split('');
    if (input) {
        for (let i = 0; i < mask.length; i++) {
            let char = mask[i];
            if (input.length) {
                if (char != '#')
                    output += char;
                else
                    output += input.shift();
            }
        }
    }

    return output;
}

Utils.setStatusBarColor = (color, content = 'light-content') => {
    if (Platform.OS == 'android') {
        StatusBar.setBarStyle(content);
        StatusBar.setBackgroundColor(color);
    }
}

Utils.timeSice = (date) => {

    date = new Date(date);

    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " anos";
    }

    interval = Math.floor(seconds / 2592000);

    if (interval > 1) {
        return interval + " meses";
    }

    interval = Math.floor(seconds / 86400);

    if (interval > 1) {
        return interval + " dias";
    }

    interval = Math.floor(seconds / 3600);

    if (interval > 1) {
        return interval + " horas";
    }

    interval = Math.floor(seconds / 60);

    if (interval > 1) {
        return interval + " minutos";
    }

    return Math.floor(seconds) + " segundos";
};


export default Utils;
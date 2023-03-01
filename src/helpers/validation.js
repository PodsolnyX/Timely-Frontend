export const validator = (f, state, setState, ...names) => {
    return function () {
        const err = names[0] + "Error";
        names = names.map(name => state[name]);
        const check = f(...names);
        if (!check[0]) {
            setState(err, check[1]);
            return false;
        }
        else setState(err, "");
        return true;
    }
}

export const checkPassword = (password) => {
    if (password.length && !password.match(/^[a-zA-Z0-9\-_!@#№$%^&?*+=(){}[\]<>~]+$/)) {
        return [false, "Недопустимые символы"];
    }
    else if (!password.match(/[\-_!@#№$%^&?*+=(){}[\]<>~]/)) {
        return [false, "Пароль должен содержать спецсимволы"]
    }
    else if (!password.match(/[0-9]/)) {
        return [false, "Пароль должен содержать цифры"]
    }
    else if (!password.match(/[A-Z]/)) {
        return [false, "Пароль должен содержать заглавные латинские символы"]
    }
    else if (password.length < 8 || password.length > 64) {
        return [false, "Длина пароля от 8 до 64 символов"];
    }
    return [true];
}

export const checkPasswordRepeat = (password, passwordRepeat) => {
    if (passwordRepeat != password) {
        return [false, "Пароли не совпадают"];
    }
    return [true];
}

export const checkEmail = (email) => {
    if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
        return [false, "Некорректный email"];
    }
    return [true];
}

export const checkFullName = (fullName) => {
    if (!fullName.length || !fullName.match(/^([A-ZА-ЯЁ][a-zа-яё]+[\s]?){2,3}$/)) {
        return [false, "ФИО должно состоять из 2-3 слов, начинаться с заглавной буквы и содержать только латиницу, кириллицу, пробелы"];
    }
    else if (fullName.length > 64) {
        return [false, "Длина ФИО не должна превышать 64 символа"]
    }
    return [true];
}

export const checkEmpty = (value) => {
    if (!value) return [false, "Поле обязательно"];
    return [true];
}
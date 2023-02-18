export const validator = (f, state, setState, ...names) => {
    return function () {
        const err = names[0] + "Error";
        names = names.map(name => state[name]);
        const check = f(...names);
        if (!check[0]) {
            setState(state => ({ ...state, [err]: check[1] }));
            return false;
        }
        else setState(state => ({ ...state, [err]: "" }));
        return true;
    }
}

export const checkPassword = (password) => {
    if (password.length && !password.match(/^[а-яА-ЯёЁa-zA-Z0-9\-_!@#№$%^&?*+=(){}[\]<>~]+$/)) {
        return [false, "Недопустимые символы"];
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
    if (fullName.length && !fullName.match(/^[а-яА-ЯёЁa-zA-Z\-_ ]+$/)) {
        return [false, "Недопустимые символы"];
    }
    else if (fullName.length < 5 || fullName.length > 128) {
        return [false, "Длина имени от 5 до 128 символов"];
    }
    return [true];
}

export const checkEmpty = (value) => {
    if (!value) return [false, "Поле обязательно"];
    return [true];
}
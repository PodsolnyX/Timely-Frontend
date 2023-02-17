export const validator = (f, state, setState, name) => {
    return function () {
        const check = f(state[name]);
        const err = name + "Error";
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

export const checkEmail = (email) => {
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        return [false, "Некорректный email"];
    }
    return [true];
}
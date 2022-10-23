let regex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

function isPasswordValid(password) {
    if (!password)
        return false;

    if(password.length>20)
        return false;

    let valid = regex.test(password);
    if(!valid)
        return false;

    return true;
}

module.exports = isPasswordValid;
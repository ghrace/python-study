function identity(value, message) {
    console.log(value + ": " + typeof (value));
    console.log(message + ": " + typeof (message));
    var identities = {
        value: value,
        message: message
    };
    return identities;
}
console.log(identity(68, "Semlinker"));

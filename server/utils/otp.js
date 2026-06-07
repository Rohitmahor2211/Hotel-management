const otp = () => {
    const generated_otp = Math.floor(
        100000 + Math.random() * 900000
    );
    return generated_otp
}

module.exports = otp; 
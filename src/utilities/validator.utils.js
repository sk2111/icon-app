export const isValidMail = (email) => {
    const charLength = (email.match(/@/g) || []).length;
    const isSolitonMail = email.includes('@solitontech.com')
    return charLength && isSolitonMail;
};
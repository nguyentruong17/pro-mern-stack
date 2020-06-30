// eslint-disable-next-line import/prefer-default-export
export const isEmptyObject = obj => Object.keys(obj).length === 0 && obj.constructor === Object;
export const replaceNullByEmptyString = obj => Object.keys(obj).forEach(key => {
    if (obj[key] == null) {
        obj[key] = ""
    }
});
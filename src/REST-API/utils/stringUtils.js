export const REGEXP_ID = '\\d+';

export const toCamel = (s) => s.replace(/([-_][a-z])/gi, ($1) => $1
  .toUpperCase()
  .replace('-', '')
  .replace('_', ''));

const toSnake = (s) => s
  .replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`)
  .toLowerCase();

export const isObject = (o) => o === Object(o) && !Array.isArray(o) && typeof o !== 'function';

export const keysToCamel = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } if (Array.isArray(o)) {
    return o.map((i) => keysToCamel(i));
  }

  return o;
};

export const keysToSnake = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toSnake(k)] = keysToSnake(o[k]);
    });

    return n;
  } if (Array.isArray(o)) {
    return o.map((i) => keysToSnake(i));
  }

  return o;
};

export const addressObjToString = (addressObj) => {
  let addressStr = '';
  if (isObject(addressObj)) {
    addressStr += addressObj.country ? `${addressObj.country}, ` : '';
    addressStr += addressObj.city ? `${addressObj.city} - ` : '';
    addressStr += addressObj.premise ? `${addressObj.premise}, ` : '';
    addressStr += addressObj.street ? `${addressObj.street}` : '';
  }
  return addressStr;
};

export const isValidURL = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?'
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
      + '((\\d{1,3}\\.){3}\\d{1,3}))'
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
      + '(\\?[;&a-z\\d%_.~+=-]*)?'
      + '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(str);
};

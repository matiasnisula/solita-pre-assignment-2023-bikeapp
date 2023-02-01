const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

const isDate = (date: unknown): boolean => {
  if (!date || !isString(date) || Boolean(Date.parse(date)) === false) {
    return false;
  }
  return true;
};

const isNumber = (number: unknown): boolean => {
  if (!number || isNaN(Number(number))) {
    return false;
  }
  return true;
};

const isInteger = (number: unknown): boolean => {
  if (!number || !Number.isInteger(number)) {
    return false;
  }
  return true;
};

const isUndefinedOrNumber = (number: unknown): boolean => {
  if (number && isNaN(Number(number))) {
    return false;
  }
  return true;
};

const isUndefinedOrIntegerGreaterThanZero = (number: unknown) => {
  if ((number && !isInteger(number)) || Number(number) < 0) {
    return false;
  }
  return true;
};

const isUndefinedOrString = (str: unknown): boolean => {
  if (str && !isString(str)) {
    return false;
  }
  return true;
};

const isValidId = (id: unknown): boolean => {
  if (!isInteger(id) || Number(id) < 0) {
    return false;
  }
  return true;
};

export {
  isString,
  isDate,
  isNumber,
  isUndefinedOrNumber,
  isUndefinedOrIntegerGreaterThanZero,
  isUndefinedOrString,
  isValidId,
};

/* eslint-disable no-restricted-syntax */
export const makeFormData = (obj) => {
  const formdata = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    formdata.append(key, value);
  }

  return formdata;
};

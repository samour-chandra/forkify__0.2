import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const json = fetch(url);
    const res = await Promise.race([timeout(TIMEOUT_SEC), json]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status}(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

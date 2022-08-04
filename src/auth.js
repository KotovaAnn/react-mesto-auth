export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(
      new Error(`Ошибка ${res.status}: ${res.statusText}`)
    );
  };

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then((res) => checkResponse(res));
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then((res) => checkResponse(res));
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then((res) => checkResponse(res));
}
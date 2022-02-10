import { User } from '../types/auth.types';

export function setUserToLocalStorage(key: string, user: User): void {
  window.localStorage.setItem(key, JSON.stringify(user));
}

export function getUserFromLocalStorage(key: string): User {
  const user: User = JSON.parse(window.localStorage.getItem(key));
  return user;
}

export function setDataToLocalStorage(key: string, data: string): void {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLocalStorage(key: string): string {
  const data: 'string' = JSON.parse(window.localStorage.getItem(key));
  return data;
}

export function removeDataFromLocalStorage(key: string): void {
  window.localStorage.removeItem(key);
}

export function setDataToSessionStorage(key: string, data: string): void {
  window.sessionStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromSessionStorage(key: string): string {
  const data: 'string' = JSON.parse(window.sessionStorage.getItem(key));
  return data;
}

export function removeDataFromSessionStorage(key: string): void {
  window.sessionStorage.removeItem(key);
}

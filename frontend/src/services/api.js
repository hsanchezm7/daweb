import { instance, instanceAuth, instancePrivate } from './apiFacade';

// api pública
export const api = instance;

// api autenticada
export const apiPrivate = instancePrivate;

// api para autenticación
export const apiAuth = instanceAuth;

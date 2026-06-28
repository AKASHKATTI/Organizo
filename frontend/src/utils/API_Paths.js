// src/utils/API_Paths.js

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/register`;
export const PROFILE = `${BASE_URL}/auth/get-profile`;
export const LOGOUT = `${BASE_URL}/auth/logout-user`;

export const CREATE_TASK = `${BASE_URL}/tasks/create-task`;
export const GET_ALL_TASKS = `${BASE_URL}/tasks/get-all-tasks`;
export const GET_TASK = (slug) => `${BASE_URL}/tasks/get-task/${slug}`;
export const UPDATE_TASK = (slug) => `${BASE_URL}/tasks/update-task/${slug}`;
export const DELETE_TASK = (slug) => `${BASE_URL}/tasks/delete-task/${slug}`;
export const DRAG_AND_DROP_TASK = (slug) => `${BASE_URL}/tasks/drag-and-drop-task/${slug}`;


export const DAILY_STATS = `${BASE_URL}/stats/get-daily-stats`;
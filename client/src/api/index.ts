import axios from 'axios';

const url = process.env.REACT_APP_SERVER_URL;

export const postImage = (image: string) => axios.post(`${url}/process-image/`, { image });
export const postFeedback = (feedback: string) => axios.post(`${url}/submit-feedback/`, { feedback });
export const getFeedback = () => axios.get(`${url}/fetch-feedback/`);

// api request to check server health
export const getHealth = () => axios.get(`${url}/health/`);
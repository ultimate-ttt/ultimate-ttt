const createApi = process.env.REACT_APP_CREATE_API ?? '';
const connectApi = process.env.REACT_APP_CONNECT_API ?? '';
const moveApi = process.env.REACT_APP_MOVE_API ?? '';
const realtimeApi = process.env.REACT_APP_REALTIME_API ?? '';
const realtimeToken = process.env.REACT_APP_REALTIME_TOKEN ?? '';
const realtimeFilter = process.env.REACT_APP_REALTIME_FILTER ?? '';
// TODO const apiSave = process.env.API_SAVE;

const environment = {
  createApi,
  connectApi,
  moveApi,
  realtimeApi,
  realtimeToken,
  realtimeFilter,
};

export default environment;

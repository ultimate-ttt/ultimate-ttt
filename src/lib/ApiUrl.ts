// TODO move this to .env / .env.example
export const getApiUrl = () => {
  const host = window.location.host;
  if (host.includes('localhost') || host.includes('deploy')) {
    return 'https://ultimatettt-test.azurewebsites.net/api/SaveGameFinishedData';
  }

  return 'https://ultimatettt.azurewebsites.net/api/SaveGameFinishedData';
};

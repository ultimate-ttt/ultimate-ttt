import { apiCreate } from './environment';

export type CreateGameResponse = {
  shortId: string;
  playerId: string;
};
export async function fetchCreateGame(): Promise<CreateGameResponse> {
  const response = await window.fetch(apiCreate, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(''),
  });

  const data: CreateGameResponse = await response.json();
  if (response.ok && data !== undefined) {
    return data;
  } else {
    return Promise.reject(`${response.status}: ${response.statusText}`);
  }
}

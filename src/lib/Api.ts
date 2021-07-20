import { environment, Point } from './index';

const POST = 'POST';
const postHeaders = {
  'content-type': 'application/json;charset=UTF-8',
};

export type CreateGameResponse = {
  shortId: string;
  playerId: string;
};

export type ConnectGameResponse = {
  playerId: string;
};

export type MoveResponse = {};

export async function createGame(): Promise<CreateGameResponse> {
  const response = await window.fetch(environment.createApi, {
    method: POST,
    headers: postHeaders,
  });

  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(`${response.status}: ${response.statusText}`);
  }
}

export async function connectGame(id: string): Promise<ConnectGameResponse> {
  const response = await window.fetch(environment.connectApi, {
    method: POST,
    headers: postHeaders,
    body: JSON.stringify({ shortId: id }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(`${response.status}: ${response.statusText}`);
  }
}

export async function move(
  gameId: string,
  playerId: string,
  board: Point,
  tile: Point,
): Promise<MoveResponse> {
  const response = await window.fetch(environment.moveApi, {
    method: POST,
    headers: postHeaders,
    body: JSON.stringify({
      gameId: gameId,
      playerId: playerId,
      boardX: board.x,
      boardY: board.y,
      tileX: tile.x,
      tileY: tile.y,
    }),
  });

  if (response.ok) {
    return {};
  } else {
    return Promise.reject(`${response.status}: ${response.statusText}`);
  }
}

import { GameStat } from '../model/GameStat';

const BASE_ENDPOINT = `https://www.mocky.io/v2`;

export const GameStatService = {
  getStats() {
    return fetch(BASE_ENDPOINT + '/5cd04a20320000442200fc10')
      .then(res => res.json())
      .then(data => GameStat.fromArray(data));
  }
};

import moment from 'moment';

export class GameStat {
  constructor(timestamp, game, revenue, impressions) {
    this.timestamp = timestamp;
    this.game = game;
    this.revenue = revenue;
    this.impressions = impressions;
    this._timestamp = new Date(this.timestamp).getTime();
    this._momentTime = new moment(this._timestamp);
  }

  getECPM() {
    return (this.revenue * 1000.0) / this.impressions;
  }

  /**
   * @param {any[]} data
   */
  static fromArray(data) {
    return data.map(
      ({ timestamp, game, revenue, impressions }) =>
        new GameStat(timestamp, game, revenue, impressions)
    );
  }
}

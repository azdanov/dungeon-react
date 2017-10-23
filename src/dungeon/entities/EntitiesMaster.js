// @flow
import { random, head } from 'lodash';
import Player from './creatures/Player';
import Enemy from './creatures/Enemy';
import { PLAYER_S } from '../map/mapSymbols';

class EntitiesMaster {
  rooms: { [number]: { x: number, y: number, width: number, height: number } };
  entities: {
    player: ?Player,
    enemies: ?Array<Enemy>,
  };
  constructor(rooms: {
    [number]: { x: number, y: number, width: number, height: number },
  }) {
    this.entities = {
      player: null,
      enemies: [],
    };
    this.rooms = rooms;
    this.init();
  }
  init() {
    this.createPlayer();
  }
  createPlayer() {
    this.entities.player = new Player('Player', PLAYER_S, 100, 10);
    this.pickLocation(PLAYER_S);
  }
  pickLocation(entityType: string) {
    const roomNames = Object.keys(this.rooms);
    const firstRoom = Number.parseInt(head(roomNames), 10);
    // const lastRoom = roomNames.length;
    // const randomRoom = _.random(firstRoom, lastRoom);

    let x;
    let y;
    switch (entityType) {
      case PLAYER_S:
        x = random(
          this.rooms[firstRoom].x,
          this.rooms[firstRoom].x + this.rooms[firstRoom].width - 1,
        );
        y = random(
          this.rooms[firstRoom].y,
          this.rooms[firstRoom].y + this.rooms[firstRoom].height - 1,
        );
        if (this.entities.player) {
          this.entities.player.location = { x, y };
          this.entities.player.prevLocation = { x, y };
        }
        break;
      default:
        break;
    }
  }
}
export default EntitiesMaster;

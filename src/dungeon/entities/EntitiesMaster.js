// @flow
import Player from './creatures/Player';
import Enemy from './creatures/Enemy';

class EntitiesMaster {
  entities: {
    player: ?Player,
    enemies: ?Array<Enemy>,
  };
  constructor() {
    this.entities = {
      player: null,
      enemies: [],
    };
    this.init();
  }
  init() {
    this.createPlayer();
  }
  createPlayer() {
    this.entities.player = new Player('Player');
  }
}
export default EntitiesMaster;

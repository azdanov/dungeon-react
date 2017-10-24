// @flow
import MapKeeper from './map/MapKeeper';
import EntitiesMaster from './entities/EntitiesMaster';
import { ENEMY_S, WALL_S } from './map/mapSymbols';
// TODO: Place exit point

class DungeonMaster {
  mapKeeper: MapKeeper;
  entitiesMaster: Object;

  constructor() {
    this.mapKeeper = new MapKeeper();
    this.entitiesMaster = new EntitiesMaster(this.mapKeeper.rooms);
    this.mapKeeper.updateMap(this.entitiesMaster.entities);
  }

  movePlayer(direction: { x: number, y: number }) {
    const { player } = this.entitiesMaster.entities;
    switch (this.mapKeeper.isOccupied(player, direction)) {
      case ENEMY_S:
        return;
      case WALL_S:
        return;
      default:
        player.move(direction);
        break;
    }
    this.mapKeeper.updateMap(this.entitiesMaster.entities);
  }
}

export default DungeonMaster;

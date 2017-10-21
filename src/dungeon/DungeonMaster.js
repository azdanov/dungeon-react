// @flow
import MapKeeper from './map/MapKeeper';
import EntitiesMaster from './entities/EntitiesMaster';
// TODO: Place entry point && player on top
// TODO: Place exit point

class DungeonMaster {
  mapKeeper: {
    dungeon: Array<Array<number | string>>,
    width: number,
    height: number,
    minRoomSize: number,
    maxRoomSize: number,
  };
  entitiesMaster: Object;
  constructor() {
    this.mapKeeper = new MapKeeper();
    console.log(this.mapKeeper.lastRoom);
    this.entitiesMaster = new EntitiesMaster();
  }
}

export default DungeonMaster;

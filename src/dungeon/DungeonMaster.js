// @flow
import MapKeeper from './map/MapKeeper';
import EntitiesMaster from './entities/EntitiesMaster';
// TODO: Place entry point && player on top
// TODO: Place exit point

class DungeonMaster {
  mapKeeper: MapKeeper;
  entitiesMaster: Object;

  constructor() {
    this.mapKeeper = new MapKeeper();
    this.entitiesMaster = new EntitiesMaster();
  }
}

export default DungeonMaster;

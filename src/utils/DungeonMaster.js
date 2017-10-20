// @flow
import { NewDungeon } from 'random-dungeon-generator';

const dungeon = NewDungeon({
  width: 50,
  height: 40,
  minRoomSize: 5,
  maxRoomSize: 20,
});

// TODO: Place entry point && player on top
// TODO: Place exit point

export default dungeon;

import { GameLogic } from "./GameLogic";

import FBInstant = require("fb-instant-games");

console.log(FBInstant.player);

let GL:GameLogic = new GameLogic();
GL.Run();
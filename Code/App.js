import { GameLogic } from "./GameLogic";

if(FBInstant.player) console.log(FBInstant.player.getName());

let GL = new GameLogic();
GL.Run();
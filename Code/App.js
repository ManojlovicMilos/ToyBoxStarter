import { GameLogic } from "./GameLogic";

FBInstant.initializeAsync()
.then(function()
{
    FBInstant.setLoadingProgress(5);
    //let GL = new GameLogic();
    //GL.Run();
});

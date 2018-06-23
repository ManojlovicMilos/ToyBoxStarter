import * as TBX from "engineer-js";

import { GameLogic } from "./GameLogic";

TBX.FB = true;

if(TBX.FB)
{
    FBInstant.initializeAsync()
    .then(function()
    {
        FBInstant.setLoadingProgress(10);
        let GL = new GameLogic();
    });
}
else
{
    let GL = new GameLogic();
    GL.Run();
}

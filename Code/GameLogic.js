export { GameLogic };

import * as TBX from "engineer-js";

import { SoundManager } from "./SoundManager";
import { MenuScene } from "./UIScenes/MenuScene";
import { SettingsScene } from "./UIScenes/SettingsScene";
import { CreditsScene } from "./UIScenes/CreditsScene";
import { GameOverScene } from "./UIScenes/GameOverScene";
import { GameScene } from "./Game/GameScene";
import { SceneLoader } from "./SceneLoader";

class GameLogic
{
    constructor(Old)
    {
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Init();
        }
    }
    Init()
    {
        FBInstant.setLoadingProgress(11);
        TBX.Settings.GlobalFontFamily = "Segoe UI";
        this._Game = new TBX.Game();
        this._Game.Name = "ToyBox Starter";
        let SM = new SoundManager();
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0));
        FBInstant.setLoadingProgress(12);
        this._Game.Attach(new MenuScene());
        FBInstant.setLoadingProgress(13);
        this._Game.Attach(new SettingsScene());
        FBInstant.setLoadingProgress(14);
        this._Game.Attach(new CreditsScene());
        FBInstant.setLoadingProgress(15);
        this._Game.Attach(new GameScene());
        FBInstant.setLoadingProgress(16);
        this._Game.Attach(new GameOverScene());
        if(TBX.FB)
        {
            let SL = new SceneLoader();
            FBInstant.setLoadingProgress(17);
            SL.Load();
        }
    }
    Run()
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}
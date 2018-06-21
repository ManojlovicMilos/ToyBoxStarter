export { GameLogic };

import * as TBX from "engineer-js";

import { SoundManager } from "./SoundManager";
import { MenuScene } from "./UIScenes/MenuScene";
import { SettingsScene } from "./UIScenes/SettingsScene";
import { CreditsScene } from "./UIScenes/CreditsScene";
import { GameOverScene } from "./UIScenes/GameOverScene";
import { GameScene } from "./Game/GameScene";

class GameLogic
{
    private _Game:TBX.Game;
    private _Runner:TBX.Runner;
    public constructor()
    {
        TBX.Settings.GlobalFontFamily = "Segoe UI";
        this._Game = new TBX.Game();
        this._Game.Name = "ToyBox Starter";
        let SM:SoundManager = new SoundManager();
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0));
        this._Game.Attach(new MenuScene());
        this._Game.Attach(new SettingsScene());
        this._Game.Attach(new CreditsScene());
        this._Game.Attach(new GameScene());
        this._Game.Attach(new GameOverScene());
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}
export { LoadingScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene";
import { MenuScene } from "./MenuScene";
import { SettingsScene } from "./SettingsScene";
import { CreditsScene } from "./CreditsScene";
import { GameOverScene } from "./GameOverScene";
import { GameScene } from "../Game/GameScene";

class LoadingScene extends UIScene
{
    constructor(Old)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitLoadingScene();
        }
    }
    InitLoadingScene()
    {
        this.Name = "Loading";
        this.BackColor = TBX.Color.Black;
        this.CreateBackground("Dark");
        this._Title.Text = TBX.Runner.Current.Game.Name;
        this._Title.TextSize = 70;
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Progress = new TBX.ProgressBar();
        this._Progress.ChangeTargetScene(MenuScene.Current);
        this._Progress.Indicator.Paint = TBX.Color.FromRGBA(244,208,63,255);
        this.Attach(this._Progress);
        MenuScene.Current.Events.LoadComplete.push(this.LoadMenuSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Menu");
    }
    LoadMenuSceneFinished()
    {
        this._Progress.ChangeTargetScene(SettingsScene.Current);
        SettingsScene.Current.Events.LoadComplete.push(this.LoadSettingsSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Settings");
    }
    LoadSettingsSceneFinished()
    {
        this._Progress.ChangeTargetScene(CreditsScene.Current);
        CreditsScene.Current.Events.LoadComplete.push(this.LoadCreditsSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Credits");
    }
    LoadCreditsSceneFinished()
    {
        this._Progress.ChangeTargetScene(GameOverScene.Current);
        GameOverScene.Current.Events.LoadComplete.push(this.LoadGameOverSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("GameOver");
    }
    LoadGameOverSceneFinished()
    {
        this._Progress.ChangeTargetScene(GameScene.Current);
        GameScene.Current.Events.LoadComplete.push(this.LoadGameSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Game");
    }
    LoadGameSceneFinished()
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}
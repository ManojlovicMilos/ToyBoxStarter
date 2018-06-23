export { SceneLoader }

import { MenuScene } from "./UIScenes/MenuScene";
import { SettingsScene } from "./UIScenes/SettingsScene";
import { CreditsScene } from "./UIScenes/CreditsScene";
import { GameOverScene } from "./UIScenes/GameOverScene";
import { GameScene } from "./Game/GameScene";

class SceneLoader
{
    constructor() { }
    Load()
    {
        this.LoadScenes();
    }
    LoadScenes()
    {
        MenuScene.Current.Events.LoadComplete.push(this.LoadMenuSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Menu");
    }
    LoadMenuSceneFinished()
    {
        FBInstant.setLoadingProgress(10);
        this._Progress.ChangeTargetScene(SettingsScene.Current);
        SettingsScene.Current.Events.LoadComplete.push(this.LoadSettingsSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Settings");
    }
    LoadSettingsSceneFinished()
    {
        FBInstant.setLoadingProgress(20);
        this._Progress.ChangeTargetScene(CreditsScene.Current);
        CreditsScene.Current.Events.LoadComplete.push(this.LoadCreditsSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Credits");
    }
    LoadCreditsSceneFinished()
    {
        FBInstant.setLoadingProgress(30);
        this._Progress.ChangeTargetScene(GameOverScene.Current);
        GameOverScene.Current.Events.LoadComplete.push(this.LoadGameOverSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("GameOver");
    }
    LoadGameOverSceneFinished()
    {
        FBInstant.setLoadingProgress(40);
        this._Progress.ChangeTargetScene(GameScene.Current);
        GameScene.Current.Events.LoadComplete.push(this.LoadGameSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Game");
    }
    LoadGameSceneFinished()
    {
        FBInstant.setLoadingProgress(100);
        this.RunGame();
        //FBInstant.startGameAsync().then(this.RunGame);
    }
    RunGame()
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}
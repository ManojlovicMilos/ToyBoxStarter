export { MenuScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene";

class MenuScene extends UIScene
{
    public static Current:MenuScene;
    private _Play:TBX.Button;
    private _Settings:TBX.Button;
    private _Scores:TBX.Button;
    private _Credits:TBX.Button;
    public constructor(Old?:MenuScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitMenuScene();
            MenuScene.Current = this;
        }
    }
    private InitMenuScene() : void
    {
        this.Name = "Menu";
        this.CreateBackground("Dark");
        this._Title.Text = TBX.Runner.Current.Game.Name;
        this._Title.TextSize = 70;
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Play = this.CreateButton("Play", 0);
        this._Play.Events.Click.push(this.PlayClick);
        this._Settings = this.CreateButton("Settings", 1);
        this._Settings.Events.Click.push(this.SettingsClick);
        this._Scores = this.CreateButton("Scores", 2);
        this._Scores.Events.Click.push(this.ScoresClick);
        this._Credits = this.CreateButton("Credits", 3);
        this._Credits.Events.Click.push(this.CreditsClick);
    }
    private PlayClick() : void
    {
        TBX.Runner.Current.SwitchScene("Game");
    }
    private SettingsClick() : void
    {
        TBX.Runner.Current.SwitchScene("Settings");
    }
    private ScoresClick() : void
    {
        TBX.Runner.Current.SwitchScene("Scores");
    }
    private CreditsClick() : void
    {
        TBX.Runner.Current.SwitchScene("Credits");
    }
}
export { MenuScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene";

class MenuScene extends UIScene
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
            this.InitMenuScene();
            MenuScene.Current = this;
        }
    }
    InitMenuScene()
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
        this._Credits = this.CreateButton("Credits", 2);
        this._Credits.Events.Click.push(this.CreditsClick);
    }
    PlayClick()
    {
        TBX.Runner.Current.SwitchScene("Game");
    }
    SettingsClick()
    {
        TBX.Runner.Current.SwitchScene("Settings");
    }
    CreditsClick()
    {
        TBX.Runner.Current.SwitchScene("Credits");
    }
}
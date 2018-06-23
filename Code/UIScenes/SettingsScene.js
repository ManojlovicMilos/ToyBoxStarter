export { SettingsScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene";
import { SoundManager } from "./../SoundManager";

class SettingsScene extends UIScene
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
            this.InitSettingsScene();
            SettingsScene.Current = this;
        }
    }
    InitSettingsScene()
    {
        this.Name = "Settings";
        this._Title.Text = "Settings";
        this.CreateBackground("Dark");
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._MasterVolume = this.CreateSlider("Master Volume", SoundManager.MasterVolume, 0);
        this._MasterVolume.Change.push(this.UpdateMasterVolume);
        this._MusicVolume = this.CreateSlider("Music Volume", SoundManager.MusicVolume, 1);
        this._MusicVolume.Change.push(this.UpdateMusicVolume);
        this._SoundVolume = this.CreateSlider("Effect Volume", SoundManager.SoundVolume, 2);
        this._SoundVolume.Change.push(this.UpdateSoundVolume);
        this._Back = this.CreateButton("Back", 3);
        this._Back.Events.Click.push(this.BackClick);
    }
    UpdateMasterVolume(Value)
    {
        SoundManager.MasterVolume = Value;
    }
    UpdateMusicVolume(Value)
    {
        SoundManager.MusicVolume = Value;
    }
    UpdateSoundVolume(Value)
    {
        SoundManager.SoundVolume = Value;
    }
    BackClick()
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}
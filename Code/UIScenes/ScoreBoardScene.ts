export { ScoreBoardScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene";

class ScoreBoardScene extends UIScene
{
    
    public static Current:ScoreBoardScene;
    private _Back:TBX.Button;
    public constructor(Old?:ScoreBoardScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitCreditsScene();
            ScoreBoardScene.Current = this;
        }
    }
    private InitCreditsScene() : void
    {
        this.Name = "Scores";
        this._Title.Text = "High Scores";
        this.CreateBackground("Dark");
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Back = this.CreateButton("Back", 3);
        this._Back.Events.Click.push(this.BackClick);
    }
    private BackClick() : void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}
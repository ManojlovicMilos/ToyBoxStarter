export { GameOverScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene";
import { GameScene } from "./../Game/GameScene";

class GameOverScene extends UIScene
{
    private _Back:TBX.Button;
    private _Retry:TBX.Button;
    private _ScoreLabel:TBX.Label;
    public constructor(Old?:GameOverScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitGameOverScene();
            console.log(this);
        }
    }
    protected InitGameOverScene() : void
    {
        this.Name = "GameOver";
        this._Title.Text = "Game Over";
        this.CreateBackground("Dark");
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._ScoreLabel = this.CreateLabel("Your score is 0 points!", 0);
        this._Retry = this.CreateButton("Retry", 2);
        this._Retry.Events.Click.push(this.RetryClick);
        this._Back = this.CreateButton("Menu", 3);
        this._Back.Events.Click.push(this.BackClick);
    }
    private BackClick() : void
    {
        GameScene.Current.Reset();
        TBX.Runner.Current.SwitchScene("Menu");
    }
    private RetryClick() : void
    {
        GameScene.Current.Reset();
        TBX.Runner.Current.SwitchScene("Game");
    }
    public OnSwitch() : void
    {
        //Override
        super.OnSwitch();
        this._ScoreLabel.Text = "Your score is " + GameScene.Current.Score + " points!";
        this._ScoreLabel.Update();
    }
}
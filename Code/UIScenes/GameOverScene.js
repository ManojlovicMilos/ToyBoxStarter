export { GameOverScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene";
import { GameScene } from "./../Game/GameScene";

class GameOverScene extends UIScene
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
            this.InitGameOverScene();
            GameOverScene.Current = this;
        }
    }
    InitGameOverScene()
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
        this.Events.KeyDown.push(this.KeyDown.bind(this));
    }
    KeyDown(Game, Args)
    {
        if(Args.KeyCode == 32)
        {
            this.RetryClick();
        }
    }
    BackClick()
    {
        GameScene.Current.Reset();
        TBX.Runner.Current.SwitchScene("Menu");
    }
    RetryClick()
    {
        GameScene.Current.Reset();
        TBX.Runner.Current.SwitchScene("Game");
    }
    OnSwitch()
    {
        //Override
        super.OnSwitch();
        this._ScoreLabel.Text = "Your score is " + GameScene.Current.Score + " points!";
        this._ScoreLabel.Update();
    }
}
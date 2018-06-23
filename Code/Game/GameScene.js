export { GameScene };

import * as TBX from "engineer-js";

import { Level } from "./Elements/Level";
import { Player } from "./Elements/Player";

class GameScene extends TBX.Scene2D
{
    get Score() { return this._Score; }
    constructor(Old)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitGameScene();
            GameScene.Current = this;
        }
    }
    InitGameScene()
    {
        this.Name = "Game";
        this.CreateBackground("Light");
        this.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Events.KeyUp.push(this.KeyUp.bind(this));
        this.Events.Update.push(this.Update.bind(this));
        this._Level = new Level(null, this);
        this._Player = new Player(null, this);
        this._Score = 0;
        this._ScoreLabel = this.CreateLabel("0");
    }
    Reset()
    {
        this._ScoreLabel.Text = "0";
        this._Player.Reset();
        this._Level.Reset();
    }
    Update()
    {
        this._Player.Update();
        this._Score = Math.floor((-this.Trans.Translation.X) / 400);
        this._ScoreLabel.Text = this._Score.toString();
        this._ScoreLabel.Update();
    }
    KeyDown(Game, Args)
    {
        if(Args.KeyCode == 32)
        {
            this._Player.Jump();
        }
    }
    KeyUp(Game, Args)
    {
        //TOFILL
    }
    CreateBackground(Name)
    {
        let Back = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/"+Name+".png"], new TBX.Vertex(960,540), new TBX.Vertex(1920, 1080, 1));
        Back.Fixed = true;
        this.Attach(Back);
    }
    CreateLabel(Text)
    {
        let Label = new TBX.Label(null, Text);
        Label.Size = new TBX.Vertex(800, 80);
        Label.TextSize = 60;
        Label.Position = new TBX.Vertex(960, 100, 0.2);
        Label.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        Label.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
}
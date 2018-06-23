export { Player }

import * as TBX from "engineer-js";

class Player extends TBX.Tile
{
    constructor(Old, Scene)
    {
        super(Old);
        this._Scene = Scene;
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Init();
        }
    }
    Init()
    {
        this.Size = new TBX.Vertex(60,60,1);
        this.Position = new TBX.Vertex(200,400,0.4);
        this.Paint = TBX.Color.FromRGBA(23,38,49,255);
        this._Scene.Attach(this);
        this._Velocity = new TBX.Vertex();
    }
    Reset()
    {
        this.Position = new TBX.Vertex(200,400,0.4);
        this._Velocity = new TBX.Vertex();
        this._Scene.Trans.Translation.X = 0;
    }
    Update()
    {
        this._Velocity.Y -= 1;
        this.Position.Add(this._Velocity.Copy().Scalar(-1));
        this.Position.X += 2;
        this._Scene.Trans.Translation.X -= 2;
        if(this.Position.Y > 1110)
        {
            this.GameOver();
        }
        TBX.CollisionUtil.Check(this, this._Scene);
        if(this.Collision.Result.Collision)
        {
            this.GameOver();
        }
    }
    Jump()
    {
        this._Velocity.Y = 20;
    }
    GameOver()
    {
        TBX.Runner.Current.SwitchScene("GameOver");
    }
}
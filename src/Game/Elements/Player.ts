export { Player }

import * as TBX from "toybox-engine";

class Player extends TBX.Sprite {
    private _Scene: TBX.Scene2D;
    private _Velocity: TBX.Vertex;

    public constructor(Scene?: TBX.Scene2D) {
        super();
        this._Scene = Scene;
        this.Init();
    }

    private Init(): void {
        this.Size = new TBX.Vertex(60, 60, 1);
        this.Position = new TBX.Vertex(200, 400, 0.4);
        this.Collection = new TBX.SpriteSetCollection(null, [
            new TBX.SpriteSet(null, ["./Textures/Backgrounds/Dark.png"], "default")
        ]);
        this.SetSpriteSet(0);
        this._Scene.Attach(this);
        this._Velocity = new TBX.Vertex();
    }

    public Reset(): void {
        this.Position = new TBX.Vertex(200, 400, 0.4);
        this._Velocity = new TBX.Vertex();
        this._Scene.Trans.Translation.X = 0;
    }

    public Update(): void {
        this._Velocity.Y -= 1;
        this.Position.Add(this._Velocity.Copy().Scalar(-1));
        this.Position.X += 2;
        this._Scene.Trans.Translation.X -= 2;
        if (this.Position.Y > 1110) {
            this.GameOver();
        }
        TBX.CollisionUtil.Check(this, this._Scene);
        if (this.Collision.Result.Collision) {
            this.GameOver();
        }
    }

    public Jump(): void {
        this._Velocity.Y = 20;
    }

    private GameOver(): void {
        TBX.Runner.Current.SwitchScene("GameOver");
    }
}

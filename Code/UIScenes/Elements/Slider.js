export { Slider }

import * as TBX from "engineer-js";

class Slider extends TBX.Tile
{
    get Change() { return this._OnChange; }
    constructor(Old, Text, Value)
    {
        super(Old);
        this._OnChange = [];
        if(Old)
        {
            //TODO
        }
        else
        {
            this._Percent = 0.5;
            this.Init(Text, Value);
        }
    }
    Init(Text, Value)
    {
        this._Percent = Value;
        this.Size = new TBX.Vertex(800, 50, 1);
        this.Paint = TBX.Color.FromString("#444444");
        this._Pointer = TBX.SceneObjectUtil.CreateTile("SliderPointer", null, new TBX.Vertex(), new TBX.Vertex(800, 50, 1));
        this._Pointer.Paint = TBX.Color.FromRGBA(244,208,63,255);
        this.Events.Click.push(this.Click.bind(this));
        this._Label = new TBX.Label(null, Text);
        this._Label.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        this._Label.Size = new TBX.Vertex(960, 45);
        this._Label.TextSize = 30;
        this._Label.Border.Width = 0;
    }
    OnAttach(Args)
    {
        this._Label.Position.Y = this.Position.Y - 60;
        this.UpdatePointer();
        Args.Scene.Attach(this._Pointer);
        Args.Scene.Attach(this._Label);
    }
    UpdatePointer()
    {
        this._Pointer.Size.X = this._Percent * this.Size.X;
        this._Pointer.Position = this.Position.Copy();
        this._Pointer.Position.X = this.Position.X - this.Size.X / 2 + this._Percent * (this.Size.X / 2);
    }
    Toggle(Toggled)
    {
        this.Active = Toggled;
        this._Pointer.Active = Toggled;
        this._Label.Active = Toggled;
    }
    Click(G, Args)
    {
        let Value = Args.Location.X;
        Value -= this.Position.X - this.Size.X / 2;
        Value /= this.Size.X;
        this._Percent = Value;
        this.UpdatePointer();
        for(let i in this._OnChange)
        {
            this._OnChange[i](Value);
        }
    }
}
export { UIScene }; 

import * as TBX from "engineer-js";

import { Slider } from "./Elements/Slider";

class UIScene extends TBX.Scene2D 
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
            this.InitUIScene(); 
        }
    } 
    InitUIScene()
    { 
        this.Name = "UI";
        this._OverColor = TBX.Color.Black;
        this._Title = new TBX.Label(null, "Title");
        this._Title.Size = new TBX.Vertex(1920,200,1);
        this._Title.Position = new TBX.Vertex(960,300);
        this._Title.BackColor = TBX.Color.FromRGBA(255,255,255,0);
        this._Title.Border.Width = 0;
        this._Title.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        this._Title.TextSize = 60;
        this.Attach(this._Title);
    }
    CreateBackground(Name)
    {
        let Back = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/"+Name+".png"], new TBX.Vertex(960,540), new TBX.Vertex(1920, 1080, 1));
        this.Attach(Back);
    }
    CreateButton(Text, Order)
    {
        let Button = new TBX.Button(null, Text);
        Button.Name = Text;
        Button.Position = new TBX.Vertex(960, 500 + 120 * Order, 0.2);
        Button.Padding = 0;
        Button.ForeColor = this._OverColor;
        Button.BackColor = TBX.Color.FromRGBA(244,208,63,255);
        Button.Border.Width = 0;
        Button.Border.Radius = 2;
        this.Attach(Button);
        return Button;
    }
    CreateLabel(Text, Order)
    {
        let Label = new TBX.Label(null, Text);
        Label.Name = Text;
        Label.Size = new TBX.Vertex(800, 50);
        Label.TextSize = 30;
        Label.Position = new TBX.Vertex(960, 400 + 60 * Order, 0.2);
        Label.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        Label.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
    CreateSlider(Text, Value, Order)
    {
        let NewSlider = new Slider(null, Text, Value);
        NewSlider.Name = Text;
        NewSlider.Position = new TBX.Vertex(960, 500 + 120 * Order, 0.2);
        this.Attach(NewSlider);
        return NewSlider;
    }
}
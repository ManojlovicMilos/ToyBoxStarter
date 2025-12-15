export { CreditsScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene";

class CreditsScene extends UIScene {
    public static Current: CreditsScene;
    private _Back: TBX.UI.Button;
    
    public constructor() {
        super();
        this.Name = "Credits";
        this._Title.Text = "Credits";
        this.CreateBackground("Dark");
        this._OverColor = TBX.Color.FromRGBA(23, 38, 49, 255);
        this.CreateLabel("Johann Kraus", 0);
        this.CreateLabel("Benjamin Daimio", 1);
        this.CreateLabel("Elizabeth Sherman", 2);
        this.CreateLabel("Anung Un Rama", 3);
        this.CreateLabel("Langdon Everett Caul", 4);
        this.CreateLabel("special thanks to Roger", 5);
        this._Back = this.CreateButton("Back", 3);
        this._Back.Events.Click.push(this.BackClick);
        CreditsScene.Current = this;
    }

    private BackClick(): void {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}

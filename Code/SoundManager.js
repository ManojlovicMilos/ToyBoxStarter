export { SoundManager }

import * as TBX from "engineer-js";

const VOLUME_FACTOR = 100;
const DEFAULT_MASTER_VOLUME = 1.0;
const DEFAULT_MUSIC_VOLUME = 0.8;
const DEFAULT_SOUND_VOLUME = 0.8;

class SoundManager
{
    get MasterVolume() { return this._MasterVolume; }
    set MasterVolume(Value) { this._MasterVolume = Value; this.UpdateVolumes(); }
    static get MasterVolume() { return this.Current._MasterVolume; }
    static set MasterVolume(Value) { this.Current._MasterVolume = Value; this.Current.UpdateVolumes(); }
    get MusicVolume(){ return this._MusicVolume; }
    set MusicVolume(Value) { this._MusicVolume = Value; this.UpdateVolumes(); }
    static get MusicVolume() { return this.Current._MusicVolume; }
    static set MusicVolume(Value) { this.Current._MusicVolume = Value; this.Current.UpdateVolumes(); }
    get SoundVolume() { return this._SoundVolume; }
    set SoundVolume(Value) { this._SoundVolume = Value; this.UpdateVolumes(); }
    static get SoundVolume() { return this.Current._SoundVolume; }
    static set SoundVolume(Value) { this.Current._SoundVolume = Value; this.Current.UpdateVolumes(); }
    constructor(Old)
    {
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Init();
            SoundManager.Current = this;
        }
    }
    Init()
    {
        this._MasterVolume = DEFAULT_MASTER_VOLUME;
        this._MusicVolume = DEFAULT_MUSIC_VOLUME;
        this._SoundVolume = DEFAULT_SOUND_VOLUME;
        this._Music = new TBX.SoundObject("Resources/Sounds/Music.mp3");
        this._Music.Volume = VOLUME_FACTOR * DEFAULT_MUSIC_VOLUME;
        this._Music.Looped = true;
        this._Music.Play();
        this._SoundsPaths = 
        [
            { Name:"Special", File:"Special.wav" }
        ];
        this._Sounds = {};
        for(let i in this._SoundsPaths)
        {
            let Sound = new TBX.SoundObject("Resources/Sounds/"+this._SoundsPaths[i].Path);
            Sound.Autoplay = !!this._SoundsPaths[i].Autoplay;
            Sound.Looped = !!this._SoundsPaths[i].Looped;
            Sound.Volume = this._SoundsPaths[i].Volume || VOLUME_FACTOR * DEFAULT_SOUND_VOLUME;
            this._Sounds[this._SoundsPaths[i].Name] = Sound;
        }
    }
    Play(SoundName)
    {
        this._Sounds[SoundName].Play();
    }
    static Play(SoundName)
    {
        this.Current.Play(SoundName);
    }
    UpdateVolumes()
    {
        this._Music.Volume = this._MasterVolume * this._MusicVolume;
        console.log(this._Music.Volume);
        for(let i in this._SoundsPaths)
        {
            this._Sounds[this._SoundsPaths[i].Name].Volume = this._MasterVolume * this._SoundVolume;
        }
    }
}
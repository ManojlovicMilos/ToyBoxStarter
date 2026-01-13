export { SoundManager }

import * as TBX from "toybox-engine";

const VOLUME_FACTOR = 100;
const DEFAULT_MASTER_VOLUME = 1.0;
const DEFAULT_MUSIC_VOLUME = 0.8;
const DEFAULT_SOUND_VOLUME = 0.8;
const SOUND_SETTINGS_KEY = 'tbx_sound_settings';

type VolumeValuesObject = {
    Master?: number;
    Music?: number;
    Sound?: number;
}

type SoundSettings = {
    Name: string;
    File: string;
    Volume?: number;
    Looped?: boolean;
    Autoplay?: boolean;
};

class SoundManager {
    public static Current: SoundManager;

    private _Sounds: SoundSettings[];
    private _SoundObjectss: { [key: string]: TBX.SoundObject };
    private _Music: TBX.SoundObject;
    private _MasterVolume: number;
    private _MusicVolume: number;
    private _SoundVolume: number;

    public get MasterVolume(): number { return this._MasterVolume; }
    public set MasterVolume(Value: number) { this._MasterVolume = Value; this.UpdateVolumes(); }
    public static get MasterVolume(): number { return this.Current._MasterVolume; }
    public static set MasterVolume(Value: number) { this.Current._MasterVolume = Value; this.Current.UpdateVolumes(); }
    public get MusicVolume(): number { return this._MusicVolume; }
    public set MusicVolume(Value: number) { this._MusicVolume = Value; this.UpdateVolumes(); }
    public static get MusicVolume(): number { return this.Current._MusicVolume; }
    public static set MusicVolume(Value: number) { this.Current._MusicVolume = Value; this.Current.UpdateVolumes(); }
    public get SoundVolume(): number { return this._SoundVolume; }
    public set SoundVolume(Value: number) { this._SoundVolume = Value; this.UpdateVolumes(); }
    public static get SoundVolume(): number { return this.Current._SoundVolume; }
    public static set SoundVolume(Value: number) { this.Current._SoundVolume = Value; this.Current.UpdateVolumes(); }

    public constructor() {
        this.Init();
        SoundManager.Current = this;
    }

    private Init(): void {
        const LoadedVolumes = this.LoadVolume();
        this._MasterVolume = LoadedVolumes?.Master || DEFAULT_MASTER_VOLUME;
        this._MusicVolume = LoadedVolumes?.Music || DEFAULT_MUSIC_VOLUME;
        this._SoundVolume = LoadedVolumes?.Sound || DEFAULT_SOUND_VOLUME;
        this._Music = new TBX.SoundObject("Sounds/Music.mp3");
        this._Music.Volume = VOLUME_FACTOR * this._MasterVolume * this._MusicVolume;
        this._Music.Looped = true;
        this._Music.Autoplay = true;
        this._Sounds =
            [
                { Name: "Whoosh", File: "Whoosh.wav" }
            ];
        this._SoundObjectss = {};
        for (let i in this._Sounds) {
            let Sound: TBX.SoundObject = new TBX.SoundObject("Sounds/" + this._Sounds[i].File);
            Sound.Autoplay = !!this._Sounds[i].Autoplay;
            Sound.Looped = !!this._Sounds[i].Looped;
            Sound.Volume = this._Sounds[i].Volume || VOLUME_FACTOR * DEFAULT_SOUND_VOLUME;
            this._SoundObjectss[this._Sounds[i].Name] = Sound;
        }
    }

    public Play(SoundName: string): void {
        this._SoundObjectss[SoundName].Play();
    }
    
    public static Play(SoundName: string): void {
        this.Current.Play(SoundName);
    }

    private UpdateVolumes(): void {
        this._Music.Volume = this._MasterVolume * this._MusicVolume;
        for (let i in this._Sounds) {
            this._SoundObjectss[this._Sounds[i].Name].Volume = this._MasterVolume * this._SoundVolume;
        }
        this.SaveVolume({
            Master: this._MasterVolume,
            Music: this._MusicVolume,
            Sound: this._SoundVolume,
        });
    }

    private LoadVolume(): VolumeValuesObject | null {
        const Value = localStorage.getItem(SOUND_SETTINGS_KEY);
        if (Value) {
            const ParsedObject = JSON.parse(Value);
            if (ParsedObject) {
                return ParsedObject as VolumeValuesObject;
            }
        }
        return null;
    }

    private SaveVolume(VolumeData: VolumeValuesObject): void {
        localStorage.setItem(SOUND_SETTINGS_KEY, JSON.stringify(VolumeData));
    }
}

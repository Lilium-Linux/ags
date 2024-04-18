import GLib from "gi://GLib?version=2.0";

const themePath = '${App.configDir}/services/style/colors.json';
const defaultThemePath = '${App.configDir}/services/style/Default.json';



const json = Utils.readFile(`${App.configDir}/services/style/colors.json`);

class ColorLoader {
    private getPathByName = ( name: string) => `${App.configDir}/services/style/palettes/${name}.json`;
    private _paletteName: string;
    private _palettePath: string;
    constructor(paletteName: string) {
        this._paletteName = this.getPalette(paletteName);
        this._palettePath = this.getPathByName(this._paletteName);
    }

    private getPalette(name: string){
        const exist = GLib.file_test(this.getPathByName(name), GLib.FileTest.EXISTS);
        return  exist ? name : "Default";
    }


}
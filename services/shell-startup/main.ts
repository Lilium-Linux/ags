import "resources/Global"
import { BarView } from "../../mvvm/views/bar/bar-view";
import GLib from "gi://GLib?version=2.0"
import * as styleController from "services/style/sass-controller"
import { PaletteManager } from "../configuration-system/palette-manager";
import { ConfigLoader } from "../configuration-system/config-loader";


const content = Utils.readFile(`${App.configDir}/services/style/palettes/Default.json`);
const data = JSON.parse(content.toString());


await ConfigLoader.load();


App.config({
    style: styleController.SassController.LoadCss(),
    gtkTheme: GLib.getenv("GTK_THEME")!,
    cursorTheme: GLib.getenv("XCURSOR_THEME")!,
    windows: [
        BarView.BuildBar(0),
        BarView.BuildBar(1),
    ]
})
import "resources/Global"
import { BarView } from "../../mvvm/views/bar/bar-view";
import GLib from "gi://GLib?version=2.0"
import * as styleController from "services/style/sass-controller"
import { ConfigLoader } from "../configuration-system/config-loader";
import { GlobalWidget } from "../../Contracts/Widgets/GlobalWidget";
import { CairoCorner, CornerPosition } from "../../controls/screen-corners/cairoCorner";

await ConfigLoader.load();


App.config({
    style: styleController.SassController.LoadCss(),
    gtkTheme: GLib.getenv("GTK_THEME")!,
    cursorTheme: GLib.getenv("XCURSOR_THEME")!,
    windows: [
        ...GlobalWidget.getWindowsForMonitors(new BarView()),
        ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.TopRight)),
        ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.TopLeft)),
    ]
})
import "resources/Global"
import { BarView } from "../../mvvm/views/bar/bar-view";
import GLib from "gi://GLib?version=2.0"

App.config({
    gtkTheme: "Adwaita-dark",
    cursorTheme: GLib.getenv("XCURSOR_THEME")!,
    windows: [
        BarView.BuildBar(0),
        BarView.BuildBar(1),
    ]
})
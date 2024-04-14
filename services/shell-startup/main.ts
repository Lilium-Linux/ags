import "resources/Global"
import { BarView } from "../../mvvm/views/bar/bar-view";

App.config({
    gtkTheme: "Adwaita-dark",
    cursorTheme: "GoogleDot-Black",
    windows: [
        BarView.BuildBar(0),
        BarView.BuildBar(1),
    ]
})
import Gtk from "gi://Gtk?version=3.0";
import { GlobalWidget } from "../../../Contracts/Widgets/GlobalWidget";

export class AppLauncherView {
    public static getName() { return `launcher`}
    public getWindow() { return this.window; }

    private window: Gtk.Window = Widget.Window({
        visible: false,
        name: AppLauncherView.getName(),
        heightRequest: 200,
        widthRequest: 200,
        child: Widget.Label({
            label: `Launcher Demo!`
        })
    });


}
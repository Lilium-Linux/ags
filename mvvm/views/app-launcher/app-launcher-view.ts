import Gtk from "gi://Gtk?version=3.0";
import { GlobalWidget } from "../../../Contracts/Widgets/GlobalWidget";

export class AppLauncherView extends GlobalWidget{

    buildWindow(monitor: number): Gtk.Window {
        return Widget.Window({
            visible: false,
            name: AppLauncherView.getName(monitor),
            heightRequest: 200,
            widthRequest: 200,
            child: Widget.Label({
                label: "Launcher Demo!"
            })
        })
    }

    public static getName(monitorId: number) { return `launcher-${monitorId}`}
    private window: Gtk.Window = Widget.Window();
}
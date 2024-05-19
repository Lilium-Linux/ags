import Gtk from "gi://Gtk?version=3.0";
import { GlobalWidget } from "../../../Contracts/Widgets/GlobalWidget";
import { LayoutManager } from "../../../services/layout-manager/LayoutManager";

export class AppLauncherView {
    public static getName() { return `launcher`}
    public getWindow() { return this.window; }

    private window: Gtk.Window = Widget.Window({
        visible: false,
        name: AppLauncherView.getName(),
        heightRequest: 200,
        widthRequest: 200,
        keymode: 'exclusive',
        // @ts-ignore
        anchor: LayoutManager.getAnchor().pop(),
        child: Widget.Entry({

        })
    });


}
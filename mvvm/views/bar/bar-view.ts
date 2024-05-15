import { BarViewModel } from "../../view-models/bar/bar-view-model";
import { LayoutManager } from "../../../services/layout-manager/LayoutManager";
import { GlobalWidget } from "../../../Contracts/Widgets/GlobalWidget";
import Gtk from "@girs/gtk-3.0";
import { CairoCorner, CornerPosition } from "../../../controls/screen-corners/cairoCorner";

export class BarView extends GlobalWidget{

    public static corners: Gtk.Window[] = [];
    protected static Left(){
        return Widget.Box({
            spacing: 8,
            children: [
                BarViewModel.getLauncherButton()
            ],
        })
    }
    protected static Center(){
        return Widget.Box({
            spacing: 8,
            children: [
                BarViewModel.getWorkspaces()
            ],
        })
    }
    protected static Right(){
        return Widget.Box({
            hpack: "end",
            spacing: 8,
            children: [
                BarViewModel.getSystemTray(),
                BarViewModel.getClock()
            ],
        })
    }
    buildWindow(monitor: number): Gtk.Window {
        let window = Widget.Window({
            monitor,
            name: `bar${monitor}`,
            class_name: BarViewModel.getBarStyleClass(),
            anchor: LayoutManager.getAnchor(),
            margins: LayoutManager.getMenuMargins(), //[20, 20, 0, 20],
            exclusivity: "exclusive",
            child: Widget.CenterBox({
                class_name: BarViewModel.getBarStyleClass(),
                start_widget: BarView.Left(),
                center_widget: BarView.Center(),
                end_widget: BarView.Right()
            }),
        });

        this.addCorners(window, monitor);
        return window
    }

    private static addCorners(parent: Gtk.Window, monitor: number) {
        const corner = new CairoCorner().getWindow(monitor, CornerPosition.BottomLeft, parent);
        this.corners.push(corner);
    }
}
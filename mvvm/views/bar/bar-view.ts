import { BarViewModel } from "../../view-models/bar/bar-view-model";
import { LayoutManager } from "../../../services/layout-manager/LayoutManager";
import { GlobalWidget } from "../../../Contracts/Widgets/GlobalWidget";
import Gtk from "@girs/gtk-3.0";

export class BarView extends GlobalWidget{
    protected static Left(){
        return Widget.Box({
            spacing: 8,
            vertical: LayoutManager.isVertical(),
            children: [
                BarViewModel.getLauncherButton(),
                BarViewModel.getWorkspaces(),
            ],
        })
    }
    protected static Center(){
        return Widget.Box({
            spacing: 8,
            vertical: LayoutManager.isVertical(),
            children: [
                //BarViewModel.getWorkspaces()
            ],
        })
    }
    protected static Right(){
        return Widget.Box({
            hpack: LayoutManager.isVertical() ? "center" : "end",
            vpack: LayoutManager.isVertical() ? "end" : "center",
            spacing: 8,
            vertical: LayoutManager.isVertical(),
            children: [
                BarViewModel.getSystemTray(),
                BarViewModel.getClock()
            ],
        })
    }
    buildWindow(monitor: number): Gtk.Window {
        return Widget.Window({
            monitor,
            name: `bar${monitor}`,
            class_name: BarViewModel.getBarStyleClass(),
            anchor: LayoutManager.getAnchor(),
            margins: LayoutManager.getBarMargins(),
            exclusivity: "exclusive",
            child: Widget.CenterBox({
                vertical: LayoutManager.isVertical(),
                class_name: BarViewModel.getBarStyleClass(),
                start_widget: BarView.Left(),
                center_widget: BarView.Center(),
                end_widget: BarView.Right()
            }),
        })
    }
}
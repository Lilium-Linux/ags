import {BarViewModel} from "../../view-models/bar/bar-view-model";
import { LayoutManager } from "../../../services/layout-manager/LayoutManager";



export class BarView {
    private static Left(){
        return Widget.Box({
            spacing: 8,
            children: [
                BarViewModel.getLauncherButton()
            ],
        })
    }

    private static Center(){
        return Widget.Box({
            spacing: 8,
            children: [
                BarViewModel.getWorkspaces()
            ],
        })
    }

    private static Right(){
        return Widget.Box({
            hpack: "end",
            spacing: 8,
            children: [
                BarViewModel.getClock()
            ],
        })
    }

    public static BuildBar(monitor = 0){
        return Widget.Window({
            name: `bar-${monitor}`,
            class_name: 'bar',
            monitor,
            anchor: LayoutManager.getAnchor(),
            exclusivity: "exclusive",
            child: Widget.CenterBox({
                start_widget: this.Left(),
                center_widget: this.Center(),
                end_widget: this.Right()
            })
        })
    }
}
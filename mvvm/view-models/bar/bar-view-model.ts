import * as model from "../../models/bar/bar-model";
import { LayoutManager } from "../../../services/layout-manager/LayoutManager";
import { PaletteManager } from "../../../services/configuration-system/palette-manager";

export class BarViewModel{

    public static getClock(){
        let labelWidget = Widget.Label();
        labelWidget.class_name = "clock";
        labelWidget.bind("label", model.date, "value");

        return labelWidget;
    }

    public static getWorkspaces(){
        const activeWorkspaceId = model.hyprlandService.active.workspace.bind("id");

        const workspaceButtons = model.hyprlandService.bind("workspaces").as(workspaces => {
            return workspaces.map(workspace => {
                const { id } = workspace;

                const buttonProps = {
                    on_clicked: () => model.hyprlandService.messageAsync(`dispatch workspace ${id}`),
                    child: Widget.Label(`${id}`),
                    class_name: activeWorkspaceId.as(activeId => `${activeId === id ? "focused" : ""}`),
                };

                return Widget.Button(buttonProps);
            });
        });

        return Widget.Box({
            class_name: "workspaces",
            children: workspaceButtons,
        })
    }

    public static getSystemTray() {
        const trayItems = model.tray.bind("items").as(items => {
            return items.map(item => {
                // Define button properties
                const buttonProps = {
                    child: Widget.Icon({ icon: item.bind("icon") }),
                    on_primary_click: (_, event) => item.activate(event),
                    on_secondary_click: (_, event) => item.openMenu(event),
                    tooltip_markup: item.bind("tooltip_markup"),
                };
                // Create and return the button widget
                return Widget.Button(buttonProps);
            });
        });

        // Create a box widget to contain the tray items
        return Widget.Box({
            children: trayItems,
        });
    }

    public static getLauncherButton(){
        return Widget.Button({
            class_name: "logo-button",
            on_clicked: async ()=> await Utils.execAsync("wofi --show drun"),
            child: Widget.Icon({
                class_name: "logo-icon",
                size: 30,
                icon: PaletteManager.Palette["$is-dark-theme"] ? model.liliumLogoLight : model.liliumLogoDark,
            }),
        })
    }
}
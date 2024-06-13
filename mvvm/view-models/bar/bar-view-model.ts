import * as model from "../../models/bar/bar-model";
import { AppLauncherController } from "../../controllers/app-launcher/app-launcher-controller";
import { LayoutManager } from "../../../services/layout-manager/LayoutManager";

export class BarViewModel{

    //TODO: MAKE CUSTOM CALENDAR WINDOW
    private static spawnCalendar(){
        const calendarWindow = Widget.Window({
            name: "calendar",
            child: Widget.Calendar(),
        });

        if (!App.getWindow("calendar")){
            App.addWindow(calendarWindow);
        }
    };

    public static getClock(){
        let timeLabel = Widget.Label();
        let dateButton = Widget.Button();

        timeLabel.bind("label", model.time, "value");
        dateButton.bind("label", model.date, "value");
        timeLabel.class_name = "time";
        dateButton.class_name = "date";
        dateButton.vpack = "center";
        dateButton.on_clicked = this.spawnCalendar;

        return Widget.Box({
            class_name: "clock",
            vertical: LayoutManager.isVertical(),
            children: [
                dateButton,
                timeLabel,
            ]
        });
    }

    public static getWorkspaces(){
        const dispatch = ws => model.hyprlandService.messageAsync(`dispatch workspace ${ws}`);
        const activeWorkspaceId = model.hyprlandService.active.workspace.bind("id");
        return Widget.Box({
            spacing: 10,
            class_name: "workspace-box",
            vertical: LayoutManager.isVertical(),
            child: Widget.Box({
                vertical: LayoutManager.isVertical(),
                children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
                    attribute: i,
                    vpack: "center",
                    class_name: activeWorkspaceId.as(activeId => `${activeId === i ? "workspace-focused" : "workspace"}`),
                    onClicked: () => dispatch(i),
                })),

                // remove this setup hook if you want fixed number of buttons
                setup: self => self.hook(model.hyprlandService,
                    () => self.children.forEach(btn => {
                        btn.visible = model.hyprlandService.workspaces.some(ws => ws.id === btn.attribute);
                    })),
            }),
        })
    }

    public static getSystemTray() {
        const trayItems = model.tray.bind("items").as(items => {
            return items.map(item => {
                // Define button properties
                const buttonProps = {
                    child: Widget.Icon({ icon: item.bind("icon"), size: 20 }),
                    on_primary_click: (_, event) => item.activate(event),
                    on_secondary_click: (_, event) => item.openMenu(event),
                    tooltip_markup: item.bind("tooltip_markup"),
                    //class_name: "tray-icon",
                };
                // Create and return the button widget
                let button = Widget.Button(buttonProps);
                button.vpack = "fill";
                return button;
            });
        });

        // Create a box widget to contain the tray items
        return Widget.Box({
            vertical: LayoutManager.isVertical(),
            spacing: 8,
            children: trayItems,
        });
    }

    public static getBarStyleClass = () => model.barStyleClass();

    public static getLauncherButton(){
        return Widget.Button({
            class_name: "logo-button",
            on_clicked: () => AppLauncherController.tryToggle(),
            child: Widget.Icon({
                class_name: "logo-icon",
                size: 30,
                icon: model.getLiliumLogo(),
            }),
        })
    }
}
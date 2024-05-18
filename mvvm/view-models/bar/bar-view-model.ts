import * as model from "../../models/bar/bar-model";

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
            children: [
                dateButton,
                timeLabel,
            ]
        });
    }

    public static getWorkspaces(){
        const activeWorkspaceId = model.hyprlandService.active.workspace.bind("id");

        const workspaceButtons = model.hyprlandService.bind("workspaces").as(workspaces => {
            return workspaces.map(workspace => {
                const { id } = workspace;

                const buttonProps = {
                    on_clicked: () => model.hyprlandService.messageAsync(`dispatch workspace ${id}`),
                    class_name: activeWorkspaceId.as(activeId => `${activeId === id ? "workspace-focused" : "workspace"}`),
                };
                const button = Widget.Button(buttonProps);
                button.hpack = "fill";
                button.vpack = "center";
                return button
            });
        });

        return Widget.Box({
            spacing: 10,
            class_name: "workspace-box",
            children: workspaceButtons,
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
            spacing: 8,
            children: trayItems,
        });
    }

    public static getBarStyleClass = () => model.barStyleClass();

    //TODO: MAKE APP LAUNCHER
    public static getLauncherButton(){
        return Widget.Button({
            class_name: "logo-button",
            on_clicked: async ()=> await Utils.execAsync("wofi --show drun"),
            child: Widget.Icon({
                class_name: "logo-icon",
                size: 30,
                icon: model.getLiliumLogo(),
            }),
        })
    }
}
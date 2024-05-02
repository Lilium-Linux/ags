import * as model from "../../models/bar/bar-model";

export class BarViewModel{
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
        let dateLabel = Widget.Button();

        timeLabel.bind("label", model.time, "value");
        dateLabel.bind("label", model.date, "value");
        timeLabel.class_name = "time";
        dateLabel.class_name = "date";

        dateLabel.on_clicked = this.spawnCalendar;

        return Widget.Box({
            class_name: "clock",
            children: [
                dateLabel,
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
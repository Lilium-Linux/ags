import { AppLauncherView } from "../../views/app-launcher/app-launcher-view";


export class AppLauncherController{
    public static tryToggle(){
        let window= App.getWindow(AppLauncherView.getName());
        if (window == undefined){
            window = new AppLauncherView().getWindow();
            App.addWindow(window);
        }

        window.set_visible(!window.visible)
        //App.toggleWindow(AppLauncherView.getName());
        console.log(`Launcher toggled: ${AppLauncherView.getName()}`);
    }
}
import { AppLauncherView } from "../../views/app-launcher/app-launcher-view";


export class AppLauncherController{
    public static tryClose(){

    }

    public static tryOpen(){

    }

    public static tryToggle(){
        const currentMonitor = 0;
        App.toggleWindow(AppLauncherView.getName(0));
    }
}
import { AppLauncherView } from "../../views/app-launcher/app-launcher-view";


export class AppLauncherController{
    public static tryClose(){

    }

    public static tryOpen(){

    }

    public static tryToggle(){
        if(App.getWindow(AppLauncherView.getName()) == null) App.addWindow(new AppLauncherView().window);
        App.toggleWindow(AppLauncherView.getName());
    }
}
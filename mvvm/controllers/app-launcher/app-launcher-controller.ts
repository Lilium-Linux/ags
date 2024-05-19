import { AppLauncherView } from "../../views/app-launcher/app-launcher-view";


export class AppLauncherController{

    public static async tryToggle() {
        // Wrap the synchronous call in a promise
        const window = await new Promise<any>((resolve) => {
            const win = App.getWindow(AppLauncherView.getName());
            resolve(win);
        });

        if (window == null) {
            await new Promise<void>((resolve) => {
                App.addWindow(new AppLauncherView().getWindow());
                resolve();
            });
        }

        await new Promise<void>((resolve) => {
            App.toggleWindow(AppLauncherView.getName());
            resolve();
        });

        console.log(`Launcher toggled: ${AppLauncherView.getName()}`);
    }

}
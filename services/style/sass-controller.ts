export class SassController {

    private static scss = `${App.configDir}/services/style/main.scss`;
    private static css = `${App.configDir}/services/style/compiled-main.css`;
    public static LoadCss(){
        this.applyScss();
        Utils.monitorFile(this.css, this.applyScss);
        return this.css;
    }
    private static applyScss(){
        Utils.exec(`sass ${this.scss} ${this.css}`);
        console.log("SCSS compiled");

        App.resetCss();
        console.log("CSS restarted");

        App.applyCss(this.css);
        console.log("CSS applied");
    }
}
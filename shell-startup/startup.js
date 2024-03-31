import GLib from "gi://GLib"

const outFile = "/tmp/ags/main.js"
const entry = `${App.configDir}/shell-startup/main.ts`
const bundler = GLib.getenv("AGS_BUNDLER") || "bun"

const version = {ags: pkg.version?.split(".").map(Number) || [], expect: [1, 8, 0],}
if (version.ags[1] < version.expect[1] || version.ags[2] < version.expect[2]) {
    print(`You need to update GJS to v${version.expect.join(".")}, yours is v${version.ags.join(".")}`)
    App.quit()
}


try {
    if (bundler === "bun") {
        await Utils.execAsync([
            "bun", "build", entry,
            "--outfile", outFile,
            "--external", "resource://*",
            "--external", "gi://*",
            "--external", "file://*",
        ]);
    } else if (bundler === "esbuild") {
        await Utils.execAsync([
            "esbuild", "--bundle", entry,
            "--format=esm",
            `--outfile=${outFile}`,
            "--external:resource://*",
            "--external:gi://*",
            "--external:file://*",
        ]);
    } else throw `"${bundler}" is not a valid bundler`

    await import(`file://${outFile}`)
} catch (error) {
    console.error(error);
    App.quit()
}

export { }
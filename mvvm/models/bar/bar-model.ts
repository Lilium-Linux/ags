export const applications = await Service.import("applications");
export const tray = await Service.import("systemtray");
export const hyprlandService = await Service.import("hyprland");
export const date = Variable("", {poll: [1000, 'date "+%H:%M:%S %b %e"']})

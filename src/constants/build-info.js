const buildMode = 'WEB';
const isWebBuild = true;
const isAppBuild = false;
const isPluginBuild = false;
const isExtnBuild = false;

const isProdBuild = process.env.NODE_ENV === "production";
const isDevBuild = !isProdBuild;

function redirectToRoute(route) {
    document.location.href = getRouteUrl(route);
}

function getRouteUrl(route) {
    route = route || '/';
    return route;
}

export { isWebBuild, isAppBuild, isExtnBuild, isPluginBuild, buildMode, isProdBuild, isDevBuild, redirectToRoute, getRouteUrl };

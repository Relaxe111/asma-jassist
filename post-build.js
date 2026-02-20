const fs = require('fs-extra');
const path = require('path');
process.env.NODE_ENV = 'production';

const appDirectory = fs.realpathSync(process.cwd());
const buildDir = path.resolve(appDirectory, 'build');
const resolveBuildPath = (...relativePath) => path.resolve(buildDir, ...relativePath);
const browsersList = ["chrome", "edge", "opera", "firefox", "firefox_selfhost"];

cleanupForWebApp(false);
cleanupBrowserFolders();

if (fs.existsSync(resolveBuildPath('index.html'))) {
    fs.copyFileSync(resolveBuildPath('index.html'), resolveBuildPath('404.html'));
}

function getFiles(path, files) {
    fs.readdirSync(path).forEach(function (file) {
        const subpath = `${path}/${file}`;
        if (fs.lstatSync(subpath).isDirectory()) {
            getFiles(subpath, files);
        } else {
            files.push(`${path}/${file}`);
        }
    });
}

function deleteUnnecessaryFiles(allFilesList, printLogs) {
    const deleteFileTypes = /([.]txt|[.]svg)$/;
    // Delete all the txt and svg files which are unnecessary
    deleteAllFiles(allFilesList.filter(f => deleteFileTypes.test(f)), printLogs);
}

function deleteAllFiles(filesList, printLogs) {
    filesList.forEach(f => {
        if (printLogs) {
            console.log(`Deleting file ${f}`);
        }
        fs.unlinkSync(f);
    });
}

function cleanupForWebApp(printLogs) {
    console.log("Post build cleanup action for webapp");
    const allFilesList = [];
    getFiles(buildDir, allFilesList);

    deleteUnnecessaryFiles(allFilesList, printLogs);
}

function cleanupBrowserFolders() {
    browsersList.forEach(folder => {
        folder = resolveBuildPath(folder);
        if (fs.existsSync(folder)) {
            fs.emptyDirSync(folder);
            fs.rmdirSync(folder);
        }
    });

    ['content.js', 'api-pollyfill.js', 'menu.html'].forEach(file => {
        const filePath = resolveBuildPath(file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
}
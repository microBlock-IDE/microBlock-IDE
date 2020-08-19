
let vFSTree = { };

let fileWrite = (path, content) => {
    let nextPoint = vFSTree;
    let pathSplit = path.split("/");
    for (let i=0;i<pathSplit.length;i++) {
        subPath = pathSplit[i];
        if (subPath.length === 0) continue;

        if (typeof nextPoint[subPath] === "undefined") {
            nextPoint[subPath] = { };
        }
        if (pathSplit.length == i + 1) {
            nextPoint[subPath] = content;
        } else {
            nextPoint = nextPoint[subPath];
        }
    }
}

let listFileFolder = (path) => {
    let nextPoint = vFSTree;
    let pathSplit = path.split("/");
    if (pathSplit.length == 0) {
        return vFSTree;
    }
    for (let i=0;i<pathSplit.length;i++) {
        subPath = pathSplit[i];
        if (subPath.length === 0) continue;

        if (typeof nextPoint[subPath] === "undefined") {
            return [];
        }
        
        nextPoint = nextPoint[subPath];
    }

    let list = [];
    for (const [key] of Object.entries(nextPoint)) {
        list.push(key);
    }
    return list;
}

let fileRead = (path) => {
    let nextPoint = vFSTree;
    let pathSplit = path.split("/");
    for (let i=0;i<pathSplit.length;i++) {
        subPath = pathSplit[i];
        if (subPath.length === 0) continue;

        if (typeof nextPoint[subPath] === "undefined") {
            return undefined;
        }
        if (pathSplit.length == i + 1) {
            return nextPoint[subPath];
        } else {
            nextPoint = nextPoint[subPath];
        }
    }
    return undefined;
}

let pathDelete = (path) => {
    let nextPoint = vFSTree;
    let pathSplit = path.split("/");
    for (let i=0;i<pathSplit.length;i++) {
        subPath = pathSplit[i];
        if (subPath.length === 0) continue;

        if (typeof nextPoint[subPath] === "undefined") {
            return true;
        }
        if (pathSplit.length == i + 1) {
            delete nextPoint[subPath];
        } else {
            nextPoint = nextPoint[subPath];
        }
    }
    return undefined;
}

let walk = (path) => {
    let nextPoint = vFSTree;
    let pathSplit = path.split("/");
    for (let i=0;i<pathSplit.length;i++) {
        subPath = pathSplit[i];
        if (subPath.length === 0) continue;

        if (typeof nextPoint[subPath] === "undefined") {
            return [ ];
        }
        nextPoint = nextPoint[subPath];
    }

    walkObject = (basePath, objTree) => {
        let list = [ ];
        for (const [key, value] of Object.entries(objTree)) {
            if (typeof value === "object") {
                let list1 = walkObject(basePath + "/" + key, value);
                list = list.concat(list1);
            } else {
                list.push(basePath + "/" + key);
            }
        }
        return list;
    }
    return walkObject("", nextPoint);
}

let fs = {
    write: fileWrite,
    read: fileRead,
    remove: pathDelete,
    ls: listFileFolder,
    walk: walk
};

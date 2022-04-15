const CACHE_NAME = 'static-cache-v2-6-0';

const FILES_TO_CACHE = [
    "/index.html",
    "/manifest.json",
    "/favicon.ico",

    "/js/install.js",

    "/blockly/blockly_compressed.js",
    "/blockly/blocks_compressed.js",
    "/blockly/python_compressed.js",
    "/blockly/msg/js/en.js",
    "/blockly/blocks/procedures.js",
    "/js/jquery-3.5.1.min.js",

    "/notiflix/notiflix-2.3.3.min.css",
    "/notiflix/notiflix-2.3.3.min.js",

    "/tippyjs/popper.min.js",
    "/tippyjs/tippy-bundle.umd.min.js",

    "/xterm.js/xterm.css",
    "/xterm.js/xterm.js",
    "/xterm.js/xterm-addon-fit.js",

    "/monaco-editor/min/vs/editor/editor.main.css",

    "/fontawesome/css/all.min.css",

    "/css/animate.min.css",

    "/css/style.css",


    "/monaco-editor/min/vs/loader.js",
    "/monaco-editor/min/vs/editor/editor.main.nls.js",
    "/monaco-editor/min/vs/editor/editor.main.js",

    "/blocks/blocks_pin.js",
    "/blocks/blocks_controls.js",
    "/blocks/blocks_operators.js",
    "/blocks/blocks_variables.js",
    "/blocks/blocks_advanced.js",
    "/blocks/blocks_text_code.js",

    "/blocks/generators_pin.js",
    "/blocks/generators_controls.js",
    "/blocks/generators_avanced.js",
    "/blocks/generators_text_code.js",

    "/js/code2block.js",

    "/js/Notify.js",

    "/js/Base64.js",
    "/js/vFS.js",
    "/js/GitHubAPI.js",

    "/blocksTree.js",
    "/js/mode.js",
    "/js/serial.js",
    "/js/terminal.js",
    "/js/dialog.js",
    "/js/extension.js",

    "/js/app.js",
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    // console.log('[ServiceWorker] Fetch', evt.request.url);
    // CODELAB: Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.match('index.html');
                });
            })
    );
});
var CACHE_NAME = "kszalai-github-io-cache-v1";
var urlsToCache = [
    '/index.html',
    '/sw.js',
    '/styles/styles.css',
    '/fonts/font-awesome/css/font-awesome.css',
    '/fonts/font-awesome/css/font-awesome.min.css',
    '/fonts/font-awesome/fonts/fontawesome-webfont.eot',
    '/fonts/font-awesome/fonts/fontawesome-webfont.svg',
    '/fonts/font-awesome/fonts/fontawesome-webfont.ttf',
    '/fonts/font-awesome/fonts/fontawesome-webfont.woff',
    '/fonts/font-awesome/fonts/fontawesome-webfont.woff2',
    '/fonts/font-awesome/fonts/FontAwesome.otf',
    '/fonts/devicon/devicon-colors.css',
    '/fonts/devicon/devicon.css',
    '/fonts/devicon/devicon.min.css',
    '/fonts/devicon/fonts/devicon.eot',
    '/fonts/devicon/fonts/devicon.svg',
    '/fonts/devicon/fonts/devicon.ttf',
    '/fonts/devicon/fonts/devicon.woff',
    '/images/GitHub-Mark-32px.png',
    '/images/GitHub-Mark-64px.png',
    '/images/GitHub-Mark-Light-32px.png',
    '/images/GitHub-Mark-Light-64px.png',
    '/images/In-Black-34px-TM.png',
    '/images/In-White-34px-TM.png',
    '/images/nxt-controller_1.png',
    '/images/profile_pic.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME) //Open a cache with the given name
            .then((cache) => {
                console.log("Cache opened");
                return cache.addAll(urlsToCache); //Add all the contents to the cache
            })
    );
});

self.addEventListener('activate', (event) => {
    var cacheWhitelist = ['kszalai-github-io-cache-v1'];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    var requestUrl = new URL(event.request.url);

    if(requestUrl.origin == location.origin){ //Local Resource Calls
        event.respondWith(
            caches.match(event.request).then((response) => { //Check to see if resource is in cache
                if(response)
                    console.log("Cached Resource:",response);
                else
                    console.log("No Local Resource Found. Requesting from network");
                return response || fetch(event.request); //If it is respond with it, or get it from the network
            })
        );
    }

    else{
        event.respondWith(
            caches.open('kszalai-github-io-dynamic').then((cache) => { //Open dynamic cache
                return fetch(event.request).then((response) => { //Get the network response
                    cache.put(event.request, response.clone()); //Store it in the dynamic cache
                    return response; //Return the response
                })
            })
        );
    }
});
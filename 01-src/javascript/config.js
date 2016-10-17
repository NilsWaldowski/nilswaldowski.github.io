require.config({
    // root path to use for all module lookups
    baseUrl: '/dist/javascript/',

    // vendor modules
    paths: {
        'domReady': '../vendor/requirejs-domready/domReady',
        'svg4everybody': '../vendor/svg4everybody/dist/svg4everybody'
    },

    // main object
    'deps': ['main'],

    // shims
    'shim': {

    }
});

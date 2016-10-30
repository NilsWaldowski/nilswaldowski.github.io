require.config({
    // root path to use for all module lookups
    baseUrl: '/dist_prod/javascript/',

    // vendor modules
    paths: {
        'domReady': '../vendor/requirejs-domready/domReady'
    },

    // main object
    'deps': ['main'],

    // shims
    'shim': {

    }
});

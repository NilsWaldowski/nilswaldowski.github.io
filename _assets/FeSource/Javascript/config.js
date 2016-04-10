/**
 * Require config
 */
require.config({
    baseUrl: '/Dist/Javascript/',
    paths: {
        'jquery': '../Vendor/jquery/dist/jquery',
        'modernizr': 'Build/modernizr.custom',
        'svg4everybody': '../Vendor/svg4everybody/dist/svg4everybody',
        'magnific-popup.core': '../Vendor/magnific-popup/src/js/core',
        'magnific-popup.inline': '../Vendor/magnific-popup/src/js/inline',
        'magnific-popup.gallery': '../Vendor/magnific-popup/src/js/gallery',
        'magnific-popup.image': '../Vendor/magnific-popup/src/js/image'
    },
    'deps': [
        'modernizr',
        'main'
    ]
});

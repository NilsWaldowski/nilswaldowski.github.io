(function(w){
    'use strict';

    // if the cookie is already set, we're good and adding the loading-class.
    if (cookie('fonts-loaded') !== null) {
        document.documentElement.className += ' fonts-loaded';
        return;
    }

    var myFont = new FontFaceObserver('Roboto'),
        myFontBold = new FontFaceObserver('Kanit');

    w.Promise
    .all([myFont.load(), myFontBold.load()])
    .then(function() {
        cookie('fonts-loaded', 'true', 7);
        w.document.documentElement.className += ' fonts-loaded';
    });
}(this));

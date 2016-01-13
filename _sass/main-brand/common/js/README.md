# About the Common Design System JavaScript

There's a certain amount of JavaScript that is necessary to set up a project in order to use the Design System that is outside of any particular component.

This is mainly:

- *Modernizr* to allow for feature detection (mostly for the Sass although it is also useful for componenets to know that feature detection is available).
    - Modernizr should always be customised for production (for performance). Our customised version can be seen/updated here: [our custom build - please update this link if you change our custom build](https://modernizr.com/download/?applicationcache-audio-backgroundsize-canvas-cookies-cssanimations-flexbox-hashchange-history-indexeddb-inlinesvg-input-inputtypes-localstorage-postmessage-sessionstorage-smil-svg-svgclippaths-touchevents-video-webgl-websockets-websqldatabase-webworkers-addtest-domprefixes-hasevent-prefixed-prefixes-setclasses-shiv-testallprops-testprop-teststyles "our custom build - please update this link if you change our custom build").
- *IE polyfills* which are always needed for all projects for eg. ClassList so that we know that IE9 can manipulate classes in JavaScript without having to write lots of workaround/defensive code in each component that is only needed by IE9.

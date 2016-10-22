define(["require", "exports", './HashNavigator', './books/Bookworm'], function (require, exports, HashNavigator_1, Bookworm_1) {
    "use strict";
    var bookNames = [
        'I-CLIO',
        'II-EUTERPE',
        'III-THALIA',
        'IV-MELPOMENE',
        'V-TERPSICHORE',
        'VI-ERATO',
        'VII-POLYMNIA',
        'VIII-URANIA',
        'IX-CALLIOPE'
    ];
    var hashNavigatorElement = document.querySelector('#hash-navigator');
    var hashNavigator = new HashNavigator_1.default({
        element: hashNavigatorElement,
        links: bookNames.map(function (bookName) { return ({
            name: bookName.replace('-', ' '),
            uri: '#' + bookName
        }); })
    });
    var bookDestination = document.querySelector('#book-destination');
    var firstNavigation = true;
    var bookworm = new Bookworm_1.default({
        bookNames: bookNames,
        root: 'histories',
        defaultBook: 'I-CLIO',
        extension: 'txt',
        destination: bookDestination,
        onBookChange: function (bookElement) {
            if (!firstNavigation)
                window.scrollTo(window.scrollX, bookDestination.offsetTop);
            firstNavigation = false;
            hashNavigatorElement.setAttribute('data-active', 'false');
        }
    });
});

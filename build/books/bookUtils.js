define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Parse text into a book object.
     */
    function parseBook(text) {
        // Ascertain the book name and numeral.
        var _a = text.split('--------'), header = _a[0], raw = _a[1];
        var firstLine = header.split('\n')[0];
        var _b = firstLine.split('–')[1].trim().split(' '), numeral = _b[0], name = _b[1];
        // Parse passages from the raw text.
        var passages = raw.split('[')
            .filter(function (t) { return /\]/.test(t); })
            .map(function (passage) {
            var _a = passage.split(']'), id = _a[0], text = _a[1];
            text = text.trim();
            return { id: id, text: text };
        });
        console.log("\n" + numeral + " " + name + "\n - " + passages.length + " passages");
        return { numeral: numeral, name: name, passages: passages };
    }
    exports.parseBook = parseBook;
    /**
     * Load and parse a book from a URI.
     */
    function loadBook(uri) {
        // Fetch the book.
        return fetch(uri)
            .then(function (response) { return response.text(); })
            .then(parseBook);
    }
    exports.loadBook = loadBook;
});

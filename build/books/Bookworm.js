define(["require", "exports", './bookUtils'], function (require, exports, bookUtils_1) {
    "use strict";
    /**
     * Bookworm loads and displays books on demand.
     */
    var Bookworm = (function () {
        /**
         * Create a new bookworm.
         */
        function Bookworm(options) {
            var _this = this;
            /** True when busy. Books cannot be summoned while we're still busy. */
            this.busy = false;
            // Accept options.
            this.root = options.root;
            this.bookNames = options.bookNames;
            this.defaultBookName = options.defaultBook;
            this.extension = options.extension;
            this.destination = options.destination;
            this.onBookChange = options.onBookChange || (function () { });
            // Handle hash change events.
            window.addEventListener("hashchange", function () { return _this.summonBookBasedOnHash(); });
            // Handle the initial hash state.
            this.summonBookBasedOnHash();
        }
        /**
         * Handle the change of location hash.
         */
        Bookworm.prototype.summonBookBasedOnHash = function () {
            var hash = window.location.hash.replace(/^#/, "");
            var bookName = this.bookNames.find(function (bookName) { return bookName === hash; }) || this.defaultBookName;
            this.summonBook(bookName);
        };
        /**
         * Load, parse, and display a book.
         */
        Bookworm.prototype.summonBook = function (bookName) {
            var _this = this;
            // Bail out if we're already busy.
            if (this.busy) {
                console.log("Cannot summon book while already busy.");
                return Promise.resolve();
            }
            // Start being busy.
            this.busy = true;
            // Put together the URI to the book.
            var uri = this.root + "/" + bookName + "." + this.extension;
            // Load up the book.
            return bookUtils_1.loadBook(uri)
                .then(formatBookElement)
                .then(function (bookElement) {
                // Clear the destination.
                while (_this.destination.firstChild)
                    _this.destination.removeChild(_this.destination.firstChild);
                // Insert the book.
                _this.destination.appendChild(bookElement);
                return bookElement;
            })
                .then(function (bookElement) { return _this.onBookChange(bookElement); })
                .then(function () { _this.busy = false; });
        };
        return Bookworm;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Bookworm;
    /**
     * Format a book into a nice HTML section element.
     */
    function formatBookElement(book) {
        var section = document.createElement('section');
        section.className = 'book';
        var paragraphs = '<p>'
            + book.passages.map(function (passage) {
                var idTag = "<em class=\"passage-id\">[" + passage.id + "]</em>";
                var text = passage.text.replace(/\n/g, '<br/>');
                return idTag + " " + text;
            }).join('</p><p>')
            + '</p>';
        section.innerHTML = ("<h1><span class=\"numeral\">" + book.numeral + "</span> " + book.name + "</h1>") + paragraphs;
        return section;
    }
});

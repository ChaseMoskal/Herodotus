"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const crochet_1 = require("crochet");
/**
 * Parse herodotus history books out of the markdown file.
 */
function parseBooksFromMarkdown(markdown) {
    markdown = markdown.split(/[=]{3,}/m)[1].trim();
    const bookParse = markdown.split(/^([\w\s]+)(?:\r\n|\n)^[-]{3,}/m)
        .map(chapter => chapter.trim())
        .filter(chapter => !!chapter);
    const bookTitles = bookParse.filter((chapter, index) => index % 2 === 0);
    const bookContents = bookParse.filter((chapter, index) => index % 2 !== 0);
    const historyBooks = bookTitles.map((title, index) => ({
        title,
        name: title.toLowerCase().replace(/\s/, "-"),
        content: bookContents[index]
    }));
    return historyBooks.map(book => (__assign({ navigation: historyBooks.map(({ title, name }) => ({
            title,
            name,
            href: `../${name}/`
        })) }, book)));
}
/**
 * Immediately invoked function expression which generates the website.
 */
(function generateWebsite() {
    return __awaiter(this, void 0, void 0, function* () {
        // Read the HTML template file.
        const templateFile = yield crochet_1.read("source/history-book.crochet.html");
        // Read the entire histories in one go.
        const sourceTextFile = yield crochet_1.read("source/herodotus-histories.md");
        // Parse the histories.
        const histories = parseBooksFromMarkdown(sourceTextFile.content);
        // Render histories.
        const fileWriteMandates = yield Promise.all(histories.map(function (book) {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    path: `build/${book.name}/index.html`,
                    content: yield crochet_1.evaluate(templateFile.content, book)
                };
            });
        }));
        // Write histories.
        yield crochet_1.writeAll(fileWriteMandates);
        // Copy index file and stylesheet.
        yield crochet_1.copy("source/index.html", "build/index.html");
        yield crochet_1.copy("source/style.css", "build/style.css");
    });
})()
    .catch(error => { console.error(error); throw error; });

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//// INPUT INFORMATION
var sources = [
    'histories/1-CLIO.txt',
    'histories/2-EUTERPE.txt',
    'histories/3-THALIA.txt',
    'histories/4-MELPOMENE.txt',
    'histories/5-TERPSICHORE.txt',
    'histories/6-ERATO.txt',
    'histories/7-POLYMNIA.txt',
    'histories/8-URANIA.txt',
    'histories/9-CALLIOPE.txt'
];
// Destination element to append history sections.
var historyDestination = document.querySelector('#herodotus');
/**
 * Parse text contents into a history book object.
 */
function parseHistoryBook(text) {
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
    console.log("\n" + numeral + " " + name + "\n  - " + passages.length + " passages");
    return { numeral: numeral, name: name, passages: passages };
}
/**
 * Format a history book into an HTML history section.
 */
function formatHistorySection(book) {
    var section = document.createElement('section');
    var paragraphs = '<p>'
        + book.passages.map(function (passage) {
            var idTag = "<em class=\"passage-id\">[" + passage.id + "]</em>";
            var text = passage.text.replace(/\n/g, '<br/>');
            return idTag + " " + text;
        }).join('</p><p>')
        + '</p>';
    section.innerHTML = ("<h1><span class=\"numeral\">" + book.numeral + "</span> " + book.name + "</h1>") + paragraphs;
    section.className = 'passage';
    return section;
}
/**
 * Load an HTML history section from the provided URI.
 */
function loadHistorySection(uri) {
    // Fetch the book.
    return fetch(uri)
        .then(function (response) { return response.text(); })
        .then(parseHistoryBook)
        .then(formatHistorySection);
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////// ACTION
// Load all history sections.
Promise.all(sources.map(loadHistorySection))
    .then(function (books) { return books.forEach(function (book) { return historyDestination.appendChild(book); }); });

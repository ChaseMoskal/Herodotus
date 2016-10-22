define(["require", "exports"], function (require, exports) {
    "use strict";
    var HashNavigator = (function () {
        function HashNavigator(_a) {
            var element = _a.element, links = _a.links;
            var button = document.createElement('button');
            var div = document.createElement('div');
            links.forEach(function (link) {
                var a = document.createElement('a');
                a.href = link.uri;
                a.textContent = link.name;
                div.appendChild(a);
            });
            element.setAttribute('data-active', 'false');
            button.textContent = 'Book';
            element.appendChild(button);
            element.appendChild(div);
            button.addEventListener('click', function () {
                if (element.getAttribute('data-active') === 'false')
                    element.setAttribute('data-active', 'true');
                else
                    element.setAttribute('data-active', 'false');
            });
        }
        return HashNavigator;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = HashNavigator;
});

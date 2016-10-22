
import HashNavigator from './HashNavigator'
import Bookworm from './books/Bookworm'

const bookNames = [
  'I-CLIO',
  'II-EUTERPE',
  'III-THALIA',
  'IV-MELPOMENE',
  'V-TERPSICHORE',
  'VI-ERATO',
  'VII-POLYMNIA',
  'VIII-URANIA',
  'IX-CALLIOPE'
]

const hashNavigatorElement = <HTMLElement>document.querySelector('#hash-navigator');

const hashNavigator = new HashNavigator({
  element: hashNavigatorElement,
  links: bookNames.map(bookName => ({
    name: bookName.replace('-', ' '),
    uri: '#' + bookName
  }))
})

const bookDestination = <HTMLElement>document.querySelector('#book-destination');

let firstNavigation = true

const bookworm = new Bookworm({
  bookNames,
  root: 'histories',
  defaultBook: 'I-CLIO',
  extension: 'txt',
  destination: bookDestination,
  onBookChange: bookElement => {
    if (!firstNavigation) window.scrollTo(window.scrollX, bookDestination.offsetTop)
    firstNavigation = false
    hashNavigatorElement.setAttribute('data-active', 'false')
  }
})

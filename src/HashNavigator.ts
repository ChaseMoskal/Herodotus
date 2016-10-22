
export interface HashNavigatorOptions {
  element: HTMLElement
  links: {
    name: string
    uri: string
  }[]
}

export default class HashNavigator {

  constructor({element, links}: HashNavigatorOptions) {
    const button = document.createElement('button')
    const div = document.createElement('div')

    links.forEach(link => {
      const a = document.createElement('a')
      a.href = link.uri
      a.textContent = link.name
      div.appendChild(a)
    })

    element.setAttribute('data-active', 'false')
    button.textContent = 'Book'

    element.appendChild(button)
    element.appendChild(div)

    button.addEventListener('click', () => {
      if (element.getAttribute('data-active') === 'false')
        element.setAttribute('data-active', 'true')
      else
        element.setAttribute('data-active', 'false')
    })
  }
}

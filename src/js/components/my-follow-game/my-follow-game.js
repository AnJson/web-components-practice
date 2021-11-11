import './lib/my-follow-game-board/'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
    }
  </style>
  <my-follow-game-board></my-follow-game-board>
`

customElements.define('my-follow-game',
  class extends HTMLElement {
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  })

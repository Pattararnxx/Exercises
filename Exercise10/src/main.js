import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './script.js'

document.querySelector('#app').innerHTML = `
  
`

setupCounter(document.querySelector('#counter'))

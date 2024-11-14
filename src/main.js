import Lenis from 'lenis'

import homeCursor from './pages/home/home-cursor'
import homeScroll from './pages/home/home-scroll'
import loadGrid from './pages/home/load-grid'
import pixelImage from './pages/home/pixelImage'
import './styles/style.css'
function scroll() {
  const lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}

scroll()

const isHome = document.querySelector('body').classList.contains('body--home')
const isWork = document.querySelector('body').classList.contains('body--work')
if (isHome) {
  homeScroll()
  pixelImage()
  homeCursor()
  loadGrid()
}
if (isWork) {
  loadGrid()
}

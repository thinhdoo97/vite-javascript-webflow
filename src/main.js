import Lenis from 'lenis'

import homeScroll from './pages/home/home-scroll'
import pixelImage from './pages/home/pixelImage'

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
if (isHome) {
  homeScroll()
  pixelImage()
}

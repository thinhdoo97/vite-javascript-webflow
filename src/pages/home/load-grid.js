import gsap from 'gsap'
import jQuery from 'jquery'
const $ = jQuery // Alias cho jQuery

gsap.to('.load_grid-item', {
  opacity: 0,
  duration: 0.001,
  stagger: { amount: 0.5, from: 'random' },
  onComplete: () => {
    gsap.set('.load_grid', { display: 'none' })
  },
})

function loadGrid() {
  $(document).ready(function () {
    // Sử dụng $
    $('a').on('click', function (e) {
      e.preventDefault()
      // eslint-disable-next-line no-unused-vars
      let destination = $(this).attr('href')
      gsap.set('.load_grid', { display: 'grid' })
      gsap.fromTo(
        '.load_grid-item',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.001,
          stagger: { amount: 0.5, from: 'random' },
          onComplete: () => {
            window.location = destination
          },
        }
      )
    })
  })
}

export default loadGrid

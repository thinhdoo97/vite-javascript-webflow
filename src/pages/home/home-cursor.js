import gsap from 'gsap'

function homeCursor() {
  /* Tracking position of cursor */
  let cursor = document.querySelector('.cursor')

  gsap.set('.cursor', { xPercent: -50, yPercent: -50 })

  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      duration: 0.5,
      x: e.clientX,
      y: e.clientY,
    })
  })

  /* Display cursor when hover projects */

  let homeProjectSection = document.querySelector('.section-home-project')
  let homeProjectHoverTl = gsap.timeline({ paused: true }).to('.cursor', {
    opacity: 1,
    ease: 'easeInOut',
    duration: 0.5,
    scale: 1,
  })

  homeProjectSection.addEventListener('mouseenter', () => {
    homeProjectHoverTl.play()
  })

  homeProjectSection.addEventListener('mouseleave', () => {
    homeProjectHoverTl.reverse()
  })

  /* let contactTitle = document.querySelector('.cursor')

  let contactTitleHover = gsap.timeline({ paused: true }).from(cursor, {
    opacity: 0,
    scale: 0,
    duration: 0.4,
    ease: 'Quart.easeInOut',
  })

  contactTitle.addEventListener('mouseenter', () => {
    contactTitleHover.play()
  })
  contactTitle.addEventListener('mouseleave', () => {
    contactTitleHover.reverse()
  }) */
}

export default homeCursor

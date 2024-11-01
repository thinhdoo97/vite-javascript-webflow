import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

function homeScroll() {
  gsap.registerPlugin(ScrollTrigger)

  let homeProjects = document.querySelectorAll('.home-projects_cl-item')

  homeProjects.forEach((item) => {
    gsap.to(item.querySelector('.home-projects_cl-images'), {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

export default homeScroll

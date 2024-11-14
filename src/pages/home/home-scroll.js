import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

function homeScroll() {
  gsap.registerPlugin(ScrollTrigger)

  /* Title Parallax*/
  gsap.to('.home-hero_title-parallax', {
    y: '2rem',
    ease: 'none',
    scrollTrigger: {
      trigger: '.home-hero_wrapper',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  /* Project Parallax*/
  let homeProjects = document.querySelectorAll('.home-projects_cl-item')

  homeProjects.forEach((item) => {
    gsap.to(item.querySelector('.home-projects_cl-images'), {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  gsap.to('.home-cta_image', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.home-cta_image-wrapper',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export default homeScroll

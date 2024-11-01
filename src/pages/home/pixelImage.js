// ------- Osmo [https://osmo.supply/] ------- //
import gsap from 'gsap'

function pixelImage() {
  // ------- Osmo [https://osmo.supply/] ------- //

  document.addEventListener('DOMContentLoaded', function () {
    const animationStepDuration = 0.3 // Adjust this value to control the timing
    const gridSize = 7 // Number of pixels per row and column (adjustable)
    // Calculate pixel size dynamically
    const pixelSize = 100 / gridSize // Calculate the size of each pixel as a percentage
    // Select all cards
    const cards = document.querySelectorAll('[data-pixelated-image-reveal]')
    // Detect if device is touch device
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    // Loop through each card
    cards.forEach((card) => {
      const pixelGrid = card.querySelector('[data-pixelated-image-reveal-grid]')
      const activeCard = card.querySelector(
        '[data-pixelated-image-reveal-active]'
      )
      // Remove any existing pixels with the class 'pixelated-image-card__pixel'
      const existingPixels = pixelGrid.querySelectorAll(
        '.pixelated-image-card__pixel'
      )
      existingPixels.forEach((pixel) => pixel.remove())
      // Create a grid of pixels dynamically based on the gridSize
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const pixel = document.createElement('div')
          pixel.classList.add('pixelated-image-card__pixel')
          pixel.style.width = `${pixelSize}%` // Set the pixel width dynamically
          pixel.style.height = `${pixelSize}%` // Set the pixel height dynamically
          pixel.style.left = `${col * pixelSize}%` // Set the pixel's horizontal position
          pixel.style.top = `${row * pixelSize}%` // Set the pixel's vertical position
          pixelGrid.appendChild(pixel)
        }
      }
      const pixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel')
      const totalPixels = pixels.length
      const staggerDuration = animationStepDuration / totalPixels // Calculate stagger duration dynamically
      let isActive = false // Variable to track if the card is active
      let delayedCall
      const animatePixels = (activate) => {
        isActive = activate
        gsap.killTweensOf(pixels) // Reset any ongoing animations
        if (delayedCall) {
          delayedCall.kill()
        }
        gsap.set(pixels, { display: 'none' }) // Make all pixels invisible instantly
        // Show pixels randomly
        gsap.to(pixels, {
          display: 'block',
          duration: 0,
          stagger: {
            each: staggerDuration,
            from: 'random',
          },
        })
        // After animationStepDuration, show or hide the activeCard
        delayedCall = gsap.delayedCall(animationStepDuration, () => {
          if (activate) {
            activeCard.style.display = 'block'
            // **Set pointer-events to none so clicks pass through activeCard**
            activeCard.style.pointerEvents = 'none'
          } else {
            activeCard.style.display = 'none'
          }
        })
        // Hide pixels randomly
        gsap.to(pixels, {
          display: 'none',
          duration: 0,
          delay: animationStepDuration,
          stagger: {
            each: staggerDuration,
            from: 'random',
          },
        })
      }
      if (isTouchDevice) {
        // For touch devices, use click event
        card.addEventListener('click', () => {
          animatePixels(!isActive)
        })
      } else {
        // For non-touch devices, use mouseenter and mouseleave
        card.addEventListener('mouseenter', () => {
          if (!isActive) {
            animatePixels(true)
          }
        })
        card.addEventListener('mouseleave', () => {
          if (isActive) {
            animatePixels(false)
          }
        })
      }
    })
  })
}

export default pixelImage

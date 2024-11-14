// ------- Osmo [https://osmo.supply/] ------- //
import gsap from 'gsap'

function pixelImage() {
  document.addEventListener('DOMContentLoaded', function () {
    const animationStepDuration = 0.3
    const gridSize = 20

    const cards = document.querySelectorAll('[data-pixelated-image-reveal]')

    function updatePixelGridSize(card) {
      const pixelGrid = card.querySelector('[data-pixelated-image-reveal-grid]')
      const activeCard = card.querySelector(
        '[data-pixelated-image-reveal-active]'
      )

      const pixelWidth = pixelGrid.offsetWidth / gridSize
      const pixelHeight = pixelGrid.offsetHeight / gridSize

      // Xóa các pixel cũ nếu có
      pixelGrid.innerHTML = ''

      // Tạo grid pixel mới với kích thước tính bằng px
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const pixel = document.createElement('div')
          pixel.classList.add('pixelated-image-card__pixel')
          pixel.style.width = `${pixelWidth}px`
          pixel.style.height = `${pixelHeight}px`
          pixel.style.left = `${col * pixelWidth}px`
          pixel.style.top = `${row * pixelHeight}px`
          pixelGrid.appendChild(pixel)
        }
      }

      const pixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel')
      const totalPixels = pixels.length
      const staggerDuration = animationStepDuration / totalPixels
      let isActive = false
      let delayedCall

      const animatePixels = (activate) => {
        isActive = activate
        gsap.killTweensOf(pixels)
        if (delayedCall) {
          delayedCall.kill()
        }
        gsap.set(pixels, { display: 'none' })

        // Hiển thị các pixel ngẫu nhiên
        gsap.to(pixels, {
          display: 'block',
          duration: 0,
          stagger: {
            each: staggerDuration,
            from: 'random',
          },
        })

        // Sau animationStepDuration, hiển thị hoặc ẩn activeCard
        delayedCall = gsap.delayedCall(animationStepDuration, () => {
          if (activate) {
            activeCard.style.display = 'block'
            activeCard.style.pointerEvents = 'none'
          } else {
            activeCard.style.display = 'none'
          }
        })

        // Ẩn các pixel ngẫu nhiên
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

      const isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches

      if (isTouchDevice) {
        card.addEventListener('click', () => {
          animatePixels(!isActive)
        })
      } else {
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
    }

    cards.forEach((card) => {
      updatePixelGridSize(card)

      // Cập nhật grid mỗi khi kích thước màn hình thay đổi
      window.addEventListener('resize', () => updatePixelGridSize(card))
    })
  })
}

export default pixelImage

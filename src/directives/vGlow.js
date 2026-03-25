export const vGlow = {
  mounted(el) {
    el.style.transition = 'box-shadow 0.3s ease-in-out'
    
    el.addEventListener('mouseenter', () => {
      // Un resplandor dorado brillante para cartas mágicas
      el.style.boxShadow = '0 0 20px 5px rgba(255, 215, 0, 0.4)'
    })
    
    el.addEventListener('mouseleave', () => {
      el.style.boxShadow = 'none'
    })
  }
}

export default {
  bind (el, { value }) {
    // Работает на основе компонента тултип из либы Матириалайз
    M.Tooltip.init(el, { html: value })
  },
  unbind (el) {
    // Удаляет тултипы при и предотвращяет утечки памяти
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}

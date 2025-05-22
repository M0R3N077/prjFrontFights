
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [windowWidth, setWindowWidth] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      setIsMobile(width < MOBILE_BREAKPOINT)
    }
    
    // Configurar mediaquery listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", handleResize)
    
    // Definir valores iniciais
    handleResize()
    
    return () => mql.removeEventListener("change", handleResize)
  }, [])

  return {
    isMobile: !!isMobile,
    windowWidth
  }
}

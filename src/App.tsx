import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { GeistProvider, CssBaseline, useTheme } from "@geist-ui/react"
import Header from "@/modules/common/header"
import { useStorageState } from "@/utils/hooks"
import Routes from "./routes"
export default function App() {
  const [theme, setTheme] = useStorageState<string>("them", "dark")
  const handleThemeChange = (themeType: string) => {
    setTheme(themeType)
    localStorage.setItem("theme", themeType)
  }
  const { palette } = useTheme()
  return (
    <>
      <GeistProvider themeType={theme}>
        <CssBaseline />
        <Router>
          <Header theme={theme} onThemeChange={handleThemeChange} />
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </GeistProvider>

      <style jsx global>{`
        ::selection {
          background: ${palette.successLight} !important;
          color: #fff !important;
        }
        body {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
            Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
        }
        svg {
          user-select: none;
        }
      `}</style>
    </>
  )
}

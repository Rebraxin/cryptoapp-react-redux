import { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import { Route, Routes } from 'react-router'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import {
  Home,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
  NotFound,
} from './pages'
import { Navbar, Footer } from './components'

const App = () => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(null)
  const [translator, setTranslator] = useState('-300px')
  const [buttonClose, setButtonClose] = useState(false)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize < 1284) {
      setActiveMenu(false)
      setTranslator('-300px')
      setButtonClose(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  const handleOpen = () => {
    setTranslator('0px')
    setButtonClose(true)
  }

  const handleClose = () => {
    setTranslator('-300px')
    setButtonClose(false)
  }

  const deskNavbar = {
    bgcolor: 'rgb(0, 21, 41)',
    width: '300px',
    position: 'fixed',
    transition: 'all 0.4s ease-out',
  }

  const mobileNavbar = {
    bgcolor: 'rgb(0, 21, 41)',
    width: '300px',
    position: 'fixed',
    transition: 'all 0.4s ease-out',
    transform: `translateX(${translator})`,
    zIndex: 9999,
  }

  const deskLayout = {
    width: 'calc(100% - 300px)',
    ml: 'auto',
    transition: 'all 0.4s ease-out',
  }

  const mobileLayout = {
    pt: '80px',
    width: '100%',
    ml: 'auto',
    transition: 'all 0.4s ease-out',
  }

  return (
    <Grid container sx={{ overflow: 'hidden' }}>
      <Grid item sx={activeMenu ? deskNavbar : mobileNavbar}>
        {!activeMenu && (
          <Grid sx={{ position: 'relative' }}>
            {buttonClose ? (
              <Button
                variant="contained"
                disableElevation
                disableRipple
                disableFocusRipple
                onClick={() => handleClose()}
                sx={{
                  position: 'absolute',
                  p: '15px',
                  right: -60,
                  top: '20px',
                  borderRadius: 0,
                  bgcolor: 'rgb(0, 21, 41)',
                  '&:hover': {
                    bgcolor: 'rgb(0, 21, 41)',
                  },
                }}
              >
                <CloseIcon />
              </Button>
            ) : (
              <Button
                variant="contained"
                disableElevation
                disableRipple
                disableFocusRipple
                onClick={() => handleOpen()}
                sx={{
                  position: 'absolute',
                  p: '15px',
                  right: -60,
                  top: '20px',
                  borderRadius: 0,
                  bgcolor: 'rgb(0, 21, 41)',
                  '&:hover': {
                    bgcolor: 'rgb(0, 21, 41)',
                  },
                }}
              >
                <MenuIcon />
              </Button>
            )}
          </Grid>
        )}
        <Navbar />
      </Grid>
      <Grid item sx={activeMenu ? deskLayout : mobileLayout}>
        <Grid item sx={{ p: '20px', minHeight: 'calc(100vh - 125px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App

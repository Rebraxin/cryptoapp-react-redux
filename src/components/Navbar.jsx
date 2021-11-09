import { Link, NavLink } from 'react-router-dom'
import { Avatar, Grid, Typography } from '@mui/material'

const Navbar = () => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        sx={{ height: '125px', pl: '20px' }}
      >
        <Avatar
          sx={avatarStyle}
          alt="Brand Logo"
          src="/images/cryptocurrency.png"
        />
        <Typography variant="h5" sx={brand}>
          <Link to="/">Cryptoverse</Link>
        </Typography>
      </Grid>

      <Grid
        container
        alignItems="center"
        sx={{ height: 'calc(100vh - 125px)', pb: '125px' }}
      >
        <ul className="navlinks">
          {links.map(({ path, label }) => (
            <li key={label}>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to={path}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </Grid>
    </>
  )
}

export default Navbar

const links = [
  {
    path: '/',
    label: 'home',
  },
  {
    path: '/cryptocurrencies',
    label: 'cryptocurrencies',
  },
  {
    path: '/exchanges',
    label: 'exchanges',
  },
  {
    path: '/news',
    label: 'news',
  },
]

const brand = {
  ml: '15px',
  fontFamily: "'Mochiy Pop P One', sans-serif",
  '& a': {
    color: '#1890FF',
    transition: 'color 0.2s ease-out',
    '&:hover': {
      color: '#0071bd',
    },
  },
}

const avatarStyle = {
  width: 36,
  height: 36,
}

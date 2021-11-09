import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Grid container sx={footerLayout}>
      <Typography level={5} style={footerText}>
        Cryptoverse <br />
        All rights reserved
      </Typography>
      <Grid sx={footerLinks}>
        <Link to="/">Home</Link>
        <Link style={{ margin: '0 10px' }} to="/exchanges">
          Exchanges
        </Link>
        <Link to="/news">News</Link>
      </Grid>
    </Grid>
  )
}

export default Footer

const footerLinks = {
  mt: '10px',
  fontSize: '14px',
  color: 'white',
  textAlign: 'center',
  '& a': {
    color: '#1890ff',
    '&:hover': {
      color: '#0071bd',
    },
  },
}

const footerLayout = {
  height: '125px',
  bgcolor: 'rgb(0, 21, 41)',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const footerText = {
  color: 'white',
  textAlign: 'center',
  fontWeight: 700,
}

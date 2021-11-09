import millify from 'millify'
import { Grid, Typography } from '@mui/material'

import { useGetCryptosQuery } from '../services/cryptoApi'

import { Loader, Statistics } from '../components'
import { Cryptocurrencies, News } from '../pages'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats

  if (isFetching) return <Loader />
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: '20px' }}>
        Latest Crypto News :
      </Typography>

      <Grid container>
        <Grid item xs={12} md={6}>
          <Statistics
            title="Total Crypto Currencies"
            value={globalStats.total}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Statistics
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Statistics
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Statistics
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Statistics
            title="Total Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ my: '30px' }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Top 10 Cryptocurrencies in the world :
        </Typography>
        <Typography variant="subtitle1" sx={showMoreStyle}>
          <Link to="/cryptocurrencies">Show More</Link>
        </Typography>
      </Grid>
      <Cryptocurrencies simplified />

      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ my: '30px' }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Latest Crypto News :
        </Typography>
        <Typography variant="subtitle1" sx={showMoreStyle}>
          <Link to="/news">Show More</Link>
        </Typography>
      </Grid>
      <News simplified />
    </>
  )
}

export default Home

const showMoreStyle = {
  fontWeight: 700,
  '& a': {
    color: 'blue',
    transition: 'color 0.2s ease-out',
    '&:hover': {
      color: '#03548a',
    },
  },
}

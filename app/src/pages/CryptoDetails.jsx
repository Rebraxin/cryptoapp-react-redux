import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { useState } from 'react'
import {
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineDollarCircle,
  AiOutlineBorderlessTable,
  AiOutlineThunderbolt,
  AiOutlineMoneyCollect,
  AiOutlineCheck,
  AiOutlineStop,
  AiOutlineExclamationCircle,
} from 'react-icons/ai'

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi'
import { LineChart, Loader } from '../components'

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
  const cryptoDetails = data?.data?.coin

  const time = ['24h', '7d', '30d', '1y', '5y']

  if (isFetching) return <Loader />

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: 'Rank',
      value: cryptoDetails.rank,
      icon: <AiOutlineBorderlessTable />,
    },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <AiOutlineTrophy />,
    },
  ]

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails.approvedSupply ? (
        <AiOutlineCheck />
      ) : (
        <AiOutlineStop />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <AiOutlineExclamationCircle />,
    },
  ]

  return (
    <Grid item>
      {/* Heading */}
      <Grid item sx={{ py: '30px' }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ color: '#0D80D8', fontWeight: 700, letterSpacing: -0.9 }}
        >
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Typography>
        <Typography
          textAlign="center"
          sx={{ color: 'rgba(0,0,0,0.75)', mt: '20px' }}
        >
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </Typography>
      </Grid>
      {/* Select Time */}
      <Grid container justifyContent="center">
        <FormControl sx={{ mb: '20px', minWidth: 200 }}>
          <InputLabel id="date-select">Select Time Period</InputLabel>
          <Select
            labelId="date-select"
            id="date-select"
            defaultValue=""
            label="Select Time Period"
            onChange={(event) => setTimePeriod(event.target.value)}
          >
            {time.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* Line chart */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Divider
        sx={{ my: '40px', bgcolor: 'rgba(0,0,0,0.15)', height: '2px' }}
      />
      <Grid container justifyContent="space-around" sx={{ pb: '40px' }}>
        {/* Current Crypto Stats */}
        <Grid item sm={12} md={6} lg={4}>
          <Grid item sx={{ pb: '10px' }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: 'rgba(0,0,0,0.8)' }}
            >
              {cryptoDetails.name} Value Statistics
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.75)', mt: '10px' }}>
              An overview showing the statistics of {cryptoDetails.name}
            </Typography>
          </Grid>
          {stats.map((stat, index) => (
            <Paper
              key={`${index}-${stat.title}`}
              sx={{
                p: '16px 32px',
                mt: '10px',
                border: '1px solid rgba(0,0,0,0.2)',
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <Typography sx={{ mb: '-4px', mr: '6px' }}>
                      {stat.icon}
                    </Typography>
                    <Typography>{stat.title}</Typography>
                  </Grid>
                </Grid>
                <Typography sx={{ fontWeight: 700, color: '#0D80D8' }}>
                  {stat.value}
                </Typography>
              </Grid>
            </Paper>
          ))}
        </Grid>

        {/* Others Crypto Stats */}
        <Grid item sm={12} md={6} lg={4}>
          <Grid item sx={{ pb: '10px' }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: 'rgba(0,0,0,0.8)' }}
            >
              Other Statistics
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.75)', mt: '10px' }}>
              An overview showing the statistics of all cryptocurrencies
            </Typography>
          </Grid>
          {genericStats.map((stat, index) => (
            <Paper
              key={`${stat.title}-${index}`}
              sx={{
                p: '16px 32px',
                mt: '10px',
                border: '1px solid rgba(0,0,0,0.2)',
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <Typography sx={{ mb: '-4px', mr: '6px' }}>
                      {stat.icon}
                    </Typography>
                    <Typography>{stat.title}</Typography>
                  </Grid>
                </Grid>
                <Typography sx={{ fontWeight: 700, color: '#0D80D8' }}>
                  {stat.value}
                </Typography>
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
      <Divider
        sx={{ my: '40px', bgcolor: 'rgba(0,0,0,0.15)', height: '2px' }}
      />
      <Grid container justifyContent="space-around" sx={{ pb: '40px' }}>
        <Grid item sm={12} md={6} lg={4}>
          <Typography
            variant="h4"
            sx={{
              color: '#0D80D8',
              fontWeight: 700,
              letterSpacing: -0.9,
              p: '10px',
            }}
          >
            What is {cryptoDetails.name} ?
          </Typography>
          <Grid sx={parserStyle}>
            {HTMLReactParser(cryptoDetails.description)}
          </Grid>
        </Grid>

        <Grid item sm={12} md={6} lg={4}>
          <Typography
            variant="h4"
            sx={{
              color: '#0D80D8',
              fontWeight: 700,
              letterSpacing: -0.9,
              p: '10px',
            }}
          >
            {cryptoDetails.name} Links
          </Typography>
          {cryptoDetails.links.map((link, index) => (
            <Paper
              key={`${link.name}-${index}`}
              sx={{
                p: '16px 32px',
                mt: '10px',
                border: '1px solid rgba(0,0,0,0.2)',
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {link.type}
                </Typography>
                <Typography sx={linkStyle}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Typography>
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CryptoDetails

const parserStyle = {
  padding: '10px',
  '& p': {
    my: '10px',
  },
}

const linkStyle = {
  fontWeight: 700,
  '& a': {
    color: '#0D80D8',
    transition: 'color 0.2s ease-out',
    '&:hover': {
      color: 'blue',
      textDecoration: 'underline',
    },
  },
}

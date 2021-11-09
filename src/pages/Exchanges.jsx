import { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  Typography,
} from '@mui/material'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'

import { useGetExchangesQuery } from '../services/cryptoApi'
import { Loader } from '../components'

const Exchanges = () => {
  const [expanded, setExpanded] = useState(false)

  const { data, isFetching } = useGetExchangesQuery()
  const exchangesList = data?.data?.exchanges

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  if (isFetching) return <Loader />
  return (
    <div>
      <Grid container sx={{ px: '15px' }}>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0D80D8' }}>
            Exchanges
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0D80D8' }}>
            24h Trade Volume
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0D80D8' }}>
            Markets
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0D80D8' }}>
            Change
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{ my: '10px' }}>
        {exchangesList.map((exchange, index) => (
          <Accordion
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            key={exchange.id}
            sx={accordionStyle}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <Grid container>
                    <Typography>
                      <strong>{index + 1}</strong>.
                    </Typography>
                    <Avatar
                      alt="Remy Sharp"
                      src={exchange.iconUrl}
                      sx={{ width: 24, height: 24, mx: '8px' }}
                    />
                    <Typography>{exchange.name}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Typography>${millify(exchange.volume)}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{millify(exchange.numberOfMarkets)}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{millify(exchange.marketShare)}%</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ '& p': { py: '8px' } }}>
              {HTMLReactParser(exchange.description || '')}
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </div>
  )
}

export default Exchanges

const accordionStyle = {
  my: '40px',
  py: '10px',
  borderTop: 'solid 1px rgba(0,0,0,0.2)',
  borderLeft: 'solid 1px rgba(0,0,0,0.2)',
  borderRight: 'solid 1px rgba(0,0,0,0.2)',
  '&.MuiPaper-root': {
    margin: 0,
  },
}

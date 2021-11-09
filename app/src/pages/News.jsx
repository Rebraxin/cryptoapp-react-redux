import { useState } from 'react'
import {
  Autocomplete,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Loader } from '../components'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const count = simplified ? 6 : 12

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  })
  const { data } = useGetCryptosQuery(100)

  if (!cryptoNews?.value) return <Loader />

  const getLabels = () => {
    const labels = []
    data?.data?.coins.forEach((coin) => {
      labels.push({ label: coin.name })
    })
    return labels
  }

  return (
    <>
      <Grid container justifyContent="center" sx={{ my: '20px' }}>
        {!simplified && (
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={getLabels()}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              onChange={(e, value) => setNewsCategory(value?.label)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select a Crypto" />
              )}
            />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2} sx={{ mb: '40px' }}>
        {cryptoNews.value.map((article, i) => (
          <Grid key={`${article.category}${i}`} item xs={12} sm={6} lg={4}>
            <a href={article.url} target="_blank" rel="noreferrer">
              <Card variant="outlined" sx={cardStyle}>
                <CardActionArea>
                  <CardContent sx={{ p: '30px 20px' }}>
                    <Grid container>
                      <Grid
                        item
                        sx={{ width: 'calc(100% - 100px)', px: '5px' }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: '700',
                            color: 'rgba(0,0,0,0.8)',
                            letterSpacing: -0.5,
                          }}
                        >
                          {article.name.length > 75
                            ? `${article.name.substring(0, 75)}...`
                            : article.name}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ width: '100px', height: '100px' }}>
                        <CardMedia
                          component="img"
                          height="100"
                          width="100"
                          image={
                            article?.image?.thumbnail?.contentUrl ||
                            '/images/cryptonews.jpg'
                          }
                          alt="Paella dish"
                        />
                      </Grid>
                    </Grid>
                    <Typography sx={{ my: '20px' }}>
                      {article.description.length > 100
                        ? `${article.description.substring(0, 100)}...`
                        : article.description}
                    </Typography>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Grid container alignItems="center">
                          <Avatar
                            sx={avatarStyle}
                            alt={article.name}
                            src={
                              article.provider[0]?.image?.thumbnail
                                ?.contentUrl || '/images/cryptonews.jpg'
                            }
                          />
                          <Typography sx={cardFooterStyle}>
                            {article.provider[0]?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography sx={cardFooterStyle}>
                          {moment(article.datePublished)
                            .startOf('ss')
                            .fromNow()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default News

const avatarStyle = {
  width: 28,
  height: 28,
}

const cardFooterStyle = {
  color: 'rgba(0,0,0,0.6)',
  fontSize: '14px',
  ml: '8px',
}

const cardStyle = {
  border: '1px solid rgba(0,0,0,0.3)',
  transition: 'background 0.2s ease-out',
  '&:hover': {
    bgcolor: 'rgba(9,57,102, 0.2)',
  },
}

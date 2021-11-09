import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import millify from 'millify'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import SearchIcon from '@mui/icons-material/Search'
import { Loader } from '../components'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)

  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )

    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  if (isFetching) return <Loader />

  return (
    <>
      {!simplified && (
        <Grid container justifyContent="center" sx={{ my: '20px' }}>
          <FormControl sx={{ width: '50ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-crypto">Search</InputLabel>
            <OutlinedInput
              id="outlined-adornment-crypto"
              label="Search"
              variant="outlined"
              margin="dense"
              color="primary"
              onChange={(e) => setSearchTerm(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      )}
      <Grid container spacing={2} sx={{ mb: '40px' }}>
        {cryptos?.map((crypto) => (
          <Grid key={crypto.id} item xs={12} sm={6} lg={4}>
            <Link to={`/crypto/${crypto.id}`}>
              <Card variant="outlined" sx={cardStyle}>
                <CardActionArea>
                  <CardContent sx={{ p: '30px 20px' }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ my: '10px' }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        sx={{
                          fontWeight: '700',
                          color: 'rgba(0,0,0,0.8)',
                          letterSpacing: -0.5,
                        }}
                        component="div"
                      >
                        {crypto.name}
                      </Typography>
                      <Avatar
                        sx={avatarStyle}
                        alt={crypto.name}
                        src={crypto.iconUrl}
                      />
                    </Grid>
                    <Typography variant="body2" color="text.secondary">
                      Price : {millify(crypto.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Marker Cap : {millify(crypto.marketCap)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Change : {millify(crypto.change)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Cryptocurrencies

const avatarStyle = {
  width: 28,
  height: 28,
}

const cardStyle = {
  border: '1px solid rgba(0,0,0,0.3)',
  transition: 'background 0.2s ease-out',
  '&:hover': {
    bgcolor: 'rgba(9,57,102, 0.2)',
  },
}

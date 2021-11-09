import { Grid, Typography } from '@mui/material'
import { Line } from 'react-chartjs-2'

const LineChart = (props) => {
  const { coinHistory, currentPrice, coinName } = props

  const coinPrice = []
  const coinTimestamp = []

  coinHistory?.data?.history.forEach((val) => {
    coinPrice.push(val.price)
    coinTimestamp.push(new Date(val.timestamp).toLocaleDateString())
  })

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071BD',
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <Grid item sx={{ maxWidth: '1200px', m: 'auto', pt: '40px', pb: '20px' }}>
      <Grid container justifyContent="space-between">
        <Typography
          variant="h5"
          sx={{ color: '#0D80D8', fontWeight: 700, letterSpacing: -0.9 }}
        >
          {coinName} Price Chart
        </Typography>
        <Grid item>
          <Grid container>
            <Typography
              sx={{ mr: '20px', fontWeight: 700, color: 'rgba(0,0,0,0.75)' }}
            >
              {coinHistory?.data?.change}%
            </Typography>
            <Typography sx={{ fontWeight: 700, color: 'rgba(0,0,0,0.75)' }}>
              Current {coinName} Price : $ {currentPrice}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Line data={data} options={options} />
    </Grid>
  )
}

export default LineChart

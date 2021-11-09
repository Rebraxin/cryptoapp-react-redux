import { Grid, Typography } from '@mui/material'

const Statistics = ({ title, value }) => {
  return (
    <Grid sx={statisticWrapper}>
      <Typography sx={titleStyle}>{title}</Typography>
      <Typography sx={valueStyle}>{value}</Typography>
    </Grid>
  )
}

export default Statistics

const statisticWrapper = { p: '5px 10px' }
const titleStyle = { fontSize: '14px', color: 'rgba(0,0,0,0.45)', mb: '5px' }
const valueStyle = { fontSize: '24px' }

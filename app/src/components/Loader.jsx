import { Grid } from '@mui/material'

const Loader = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: 'calc(100vh - 250px)' }}
    >
      <img width="300" height="auto" src="/images/loader.gif" alt="Loader" />
    </Grid>
  )
}

export default Loader

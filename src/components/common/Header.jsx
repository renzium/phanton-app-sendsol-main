import { Container, AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return(
    <AppBar position="static" style={{ backgroundColor: "#000000" }} sx={{ mb: 3 }}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography>rootlabs Mint NFT  ( Solana Chain)</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

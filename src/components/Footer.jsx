import React from 'react';
import { Box, Grid, Typography, TextField, Button, InputBase } from '@mui/material';
import { Facebook, Twitter, YouTube, LinkedIn } from '@mui/icons-material';
import { Send } from '@mui/icons-material';
import logo from "/snackshop_logo.png"

export default function Footer() {
  return (
    <Box className="footer">
      <Grid container spacing={4} className="footer-container">
        {/* Left Section */}
        <Grid>
          <Typography variant="h5" className="footer-logo">
           <img src={logo} alt="Logo" /> SnackShop
          </Typography>
          <Typography variant="body1" className="footer-description">
            Delicious snacks delivered with care. Enjoy the best sweets, salty bites, and more.
          </Typography>
          <Box className="footer-icons">
            <Facebook />
            <Twitter />
            <YouTube />
            <LinkedIn />
          </Box>
        </Grid>

        {/* Useful Links Section */}
        <Grid>
          <Typography variant="h6" className="footer-section-title">
            Useful Links
          </Typography>
          <Typography variant="body2" className="footer-link">Legal & Privacy</Typography>
          <Typography variant="body2" className="footer-link">Contact</Typography>
          <Typography variant="body2" className="footer-link">Gift Card</Typography>
          <Typography variant="body2" className="footer-link">Customer Service</Typography>
        </Grid>

        {/* Subscribe Newsletter Section */}
        <Grid>
          <Typography variant="h6" className="footer-section-title">
            Subscribe Newsletter
          </Typography>
          <Typography variant="body2" className="footer-description">
            Enter your email to receive our valuable newsletters.
          </Typography>
          <Box className="footer-newsletter">
            <InputBase
              placeholder="Enter your email"
              className='footer-newsletter-input'
              inputProps={{ 'aria-label': 'email' }}
            />
            <Button className="footer-newsletter-icon">
              <Send />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

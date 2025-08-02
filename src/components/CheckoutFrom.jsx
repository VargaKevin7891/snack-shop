import { TextField, Typography, Grid, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function CheckoutForm({shippingInfo, handleInputChange}) {
    return (
         <Paper elevation={3} className="shipping-info-container">
                <Typography variant="h6" className="shipping-info-title">
                    <LocalShippingIcon /> Shipping Information
                </Typography>
                <Grid container spacing={5}>
                    <Grid>
                        <TextField name="first_name" fullWidth label="First Name" variant="outlined" 
                            defaultValue={shippingInfo?.first_name} onChange={(e) => handleInputChange('first_name', e.target.value)}/>
                    </Grid>
                    <Grid>
                        <TextField name="last_name" fullWidth label="Last Name" variant="outlined"
                         defaultValue={shippingInfo?.last_name} onChange={(e) => handleInputChange('last_name', e.target.value)}/>
                    </Grid>
                    <Grid>
                        <TextField name="email" fullWidth label="Email" variant="outlined"
                         defaultValue={shippingInfo?.email} onChange={(e) => handleInputChange('email', e.target.value)}/>
                    </Grid>
                    <Grid>
                        <TextField name="phone" fullWidth label="Phone Number" variant="outlined"
                         defaultValue={shippingInfo?.phone} onChange={(e) => handleInputChange('phone', e.target.value)}/>
                    </Grid>
                    <Grid>
                        <TextField name="address" fullWidth label="Street Address" variant="outlined"
                         defaultValue={shippingInfo?.address} onChange={(e) => handleInputChange('address', e.target.value)}/>
                    </Grid>
                    <Grid>
                        <TextField name="city" fullWidth label="City" variant="outlined"
                         defaultValue={shippingInfo?.city} onChange={(e) => handleInputChange('city', e.target.value)}/>
                    </Grid>
                    <Grid>
                        <TextField name="zip_code" fullWidth label="ZIP Code" variant="outlined"
                         defaultValue={shippingInfo?.zip_code} onChange={(e) => handleInputChange('zip_code', e.target.value)}/>
                    </Grid>
                </Grid>
            </Paper>
    );
};

import { useState, useEffect } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
} from '@mui/material';

export default function Profile() {
  const [tabIndex, setTabIndex] = useState(0);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  function handleProfileChange(event) {
    const { name, value } = event.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    fetch('http://localhost:3001/api/getUser', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => setError('Failed to load profile info'));
  }, []);

  async function handleSaveProfile() {
    try {
      const res = await fetch('http://localhost:3001/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully');
        setError('');
      } else {
        setError(data.error || 'Failed to update profile');
        setMessage('');
      }
    } catch (err) {
      setError('Server error while updating profile');
    }
  };

  async function handlePasswordChange() {
    try {
      const res = await fetch('http://localhost:3001/api/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(passwordForm),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Password changed successfully');
        setError('');
      } else {
        setError(data.error || 'Failed to change password');
        setMessage('');
      }
    } catch (err) {
      setError('Server error while changing password');
    }
  };

  return (
    <Container maxWidth="md" className="profile-wrapper">
      <Typography variant="h4" className="profile-heading">
        My Profile
      </Typography>
      <Typography variant="subtitle1" className="profile-subheading">
        Manage your account settings and view your order history
      </Typography>

      <Box className="tab-container">
        {/* Display success message */}
          {message && (
            <Typography variant="body1" color="success.main" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}

          {/* Display error message */}
          {error && (
            <Typography variant="body1" color="error.main" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          classes={{ root: 'custom-tabs-root', indicator: 'custom-tabs-indicator' }}
        >
          <Tab label="Profile Info" classes={{ root: 'custom-tab-root', selected: 'custom-tab-selected' }} />
          <Tab label="Change Password" classes={{ root: 'custom-tab-root', selected: 'custom-tab-selected' }} />
          <Tab label="Order History" classes={{ root: 'custom-tab-root', selected: 'custom-tab-selected' }} />
        </Tabs>
      </Box>

      <Paper className="tab-content">
        {tabIndex === 0 && (
          <Box>
            <Typography variant="h6" className="section-title">Profile Information</Typography>
            <Typography variant="body2" className="section-subtitle">
              Update your personal information and contact details
            </Typography>
            <Grid container spacing={2}>
              <Grid>
                <TextField name="firstName" label="First Name" fullWidth variant="outlined"
                  value={profile.firstName}
                  onChange={handleProfileChange}/>
              </Grid>
              <Grid>
                <TextField name="lastName" label="Last Name" fullWidth variant="outlined"
                  value={profile.lastName}
                  onChange={handleProfileChange} />
              </Grid>
              <Grid>
                <TextField name="email" label="Email" fullWidth variant="outlined"
                  value={profile.email}
                  onChange={handleProfileChange} />
              </Grid>
              <Grid>
                <TextField name="phone" label="Phone" fullWidth variant="outlined"
                  value={profile.phone}
                  onChange={handleProfileChange} />
              </Grid>
              <Grid>
                <TextField name="address" label="Address" fullWidth variant="outlined"
                  value={profile.address}
                  onChange={handleProfileChange} />
              </Grid>
              <Grid>
                <TextField name="city" label="City" fullWidth variant="outlined"
                  value={profile.city}
                  onChange={handleProfileChange} />
              </Grid>
              <Grid>
                <TextField name="zipCode" label="ZIP Code" fullWidth variant="outlined"
                  value={profile.zipCode}
                  onChange={handleProfileChange} />
              </Grid>
              <Grid>
                <Button variant="contained" onClick={handleSaveProfile} className='tab-btn'>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h6" className="section-title">Change Password</Typography>
            <Grid container spacing={2}>
              <Grid>
                <TextField
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                />
              </Grid>
              <Grid>
                <TextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                />
              </Grid>
              <Grid>
                <Button variant="contained" onClick={handlePasswordChange} className='tab-btn'>
                  Update Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box>
            <Typography variant="h6" className="section-title">Order History</Typography>
            <Typography variant="body2" className="section-subtitle">Not implemented yet</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShareIcon from '@mui/icons-material/Share';
import AccountGeneral from '../features/user/AccountGeneral';
import AccountSocialLinks from '../features/user/AccountSocialLinks';
import useAuth from '../hooks/useAuth';

function TabPanel(props,) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function AccountPage() {
  const [value, setValue] = React.useState(0);
  const {user}=useAuth();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Typography variant='h4'>Account Settings</Typography>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="GENERAL" 
           icon={<AccountBoxIcon sx={{fontSize:30}}/>}
          {...a11yProps(0)} />
          <Tab label="SOCIAL_LINKS" 
          icon={<ShareIcon sx={{fontSize:30}}/>}
          {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AccountGeneral/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountSocialLinks/>
      </TabPanel>
     
    </Box>
    </Container>
  );
}


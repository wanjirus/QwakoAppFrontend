import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
// import { getCurrentUser } from 'src/REST-API/auth/AuthProvider';
import { getCurrentUser } from '../../REST-API/auth/AuthProvider';
// import getInitials from 'src/utils/getInitials';
import getInitials from '../../utils/getInitials';

const AccountProfile = (props) => {
  const [avatar, setavatar] = useState(undefined);
  const [city, setcity] = useState(undefined);
  const [country, setcountry] = useState(undefined);
  const [name, setname] = useState(undefined);
  const [timezone, settimezone] = useState(undefined);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      console.log('user in account profile');
      console.log(user.username);
      setavatar(getInitials(user.username)); // to be updated once profile picture is uploaded.
      setcity('Nairobi');
      setcountry('KENYA');
      setname(user.username);
      settimezone('GTM-7');
    }
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={avatar}
            sx={{
              height: 100,
              width: 100
            }}
          >
            {getInitials(name)}
          </Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${city} ${country}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;

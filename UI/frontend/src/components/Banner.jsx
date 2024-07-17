import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import bannerimg from '../assets/banner-image.png';


const colors = {
  primary: '#392467',
  secondary: '#5D3587',
  tertiary: '#A367B1',
  light: '#F1F1F1'
};

const BannerContainer = styled(Box)({
  backgroundColor: colors.light,
  display: 'flex',
  alignItems: 'center',
  width: 'calc(100% - 40px)', // Reduce the width to create space on the sides
  padding: '40px 0',
  marginBottom: '30px',
  marginTop:'100px',
  marginLeft: '20px', // Add margin to the left
  marginRight: '20px', // Add margin to the right
  borderRadius: '16px',  // Add borderRadius for rounded corners
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
});

const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  '@media (min-width: 768px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 20px',
  }
});

const Heading = styled(Typography)({
  color: colors.primary,
  fontSize: '40px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  padding: '0 16px',
  '@media (min-width: 768px)': {
    fontSize: '48px',
  }
});

const Subheading = styled(Typography)({
  color: colors.secondary,
  padding: '0 16px',
  width: '80%',
  '@media (min-width: 768px)': {
    width: '60%',
  }
});

const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  marginTop: '16px',
});

const SearchInput = styled(TextField)({
  marginRight: '8px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px 0 0 4px',
    '& input': {
      padding: '7px', // Adjust padding to make the input smaller
      fontSize: '14px', // Adjust font size to make the input box shorter
    },
  },
});

const SearchButton = styled(Button)({
  backgroundColor: colors.primary,
  color: 'white',
  '&:hover': {
    backgroundColor: colors.tertiary,
  },
});

const Banner = () => {
  return (
    <BannerContainer>
         
      <ContentContainer>
        <Box>
          <Heading variant="h2">
            BOOKS FOR <span style={{ color: colors.secondary }}>ALL.</span>
          </Heading>
          <Subheading variant="body1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quibusdam illum quasi, explicabo beatae eligendi atque autem natus, asperiores vel ad quod maxime aperiam veritatis labore enim dignissimos recusandae! Dolorem.
          </Subheading>
          <SearchContainer>
            <SearchInput
              variant="outlined"
              placeholder="Search a book"
              InputProps={{ style: { padding: '4px' } }}
            />
            <SearchButton variant="contained">Search</SearchButton>
          </SearchContainer>
        </Box>
      </ContentContainer>
      <img src={bannerimg} alt="Banner" style={{ maxWidth: '25%', height: '20%' }}/>
    </BannerContainer>
  );
}

export default Banner;

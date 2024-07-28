import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem',
};

const aboutUsCardStyle = {
  minWidth: 275,
  margin: '1rem',
};

const AboutUsCard = ({ title, description, buttonText }) => (
  <Card sx={aboutUsCardStyle}>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">{buttonText}</Button>
    </CardActions>
  </Card>
);

export default function AboutUsCards() {
  return (
    <Box sx={cardContainerStyle}>
      <AboutUsCard
        title="Our Mission"
        description="Our mission is to make literature accessible to everyone, everywhere. Join us on our journey to promote literacy and foster a love for reading in our community."
        buttonText="Learn More"
      />
      <AboutUsCard
        title="Our Collection"
        description="Explore our vast collection of books, ranging from the latest bestsellers to timeless classics and educational materials. There's something for every reader."
        buttonText="Browse Books"
      />
      <AboutUsCard
        title="Join Us"
        description="Become a member of our e-library today and gain access to a world of knowledge. Enjoy reading books online and borrowing them at your convenience."
        buttonText="Sign Up"
      />
    </Box>
  );
}

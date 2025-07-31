import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'Delicious Sweet Snacks',
    description: 'Try our irresistible chocolate & fruity treats!',
    image: 'https://www.sweets4me.co.uk/cdn/shop/collections/traditionalloose.jpg?v=1634895788',
  },
  {
    title: 'Tasty Salty Snacks',
    description: 'Crispy chips and savory bites for every craving.',
    image: 'https://static.vecteezy.com/system/resources/previews/038/704/520/non_2x/ai-generated-snacks-in-a-container-professional-advertising-foodgraphy-photo.jpg',
  },
  {
    title: 'Healthy Options',
    description: 'Nutritious, guilt-free snacks made just for you.',
    image: 'https://cdn.prod.website-files.com/6741e6efd98e45dcdbb3ba9f/67461d68c6db902b14a7fe35_6447f7ea620f060a8092bb65_healthy-snacks-for-work.webp',
  },
];

export default function HomeCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      className="home-carousel"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Box
            className="carousel-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <h1 className="carousel-title">
              {slide.title}
            </h1>
            <p className="carousel-description">
              {slide.description}
            </p>
            <Button variant="contained" className="carousel-button">
                <Link to="/products">
                    Shop Now
                </Link>
            </Button>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

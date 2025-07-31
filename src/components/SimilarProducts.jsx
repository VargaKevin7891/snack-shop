import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from './ProductCard';

export default function SimilarProductsSlider({ products }) {
  return (
    <section className="similar-products-section">
      <h2 className="similar-products-title">Similar Products</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        loop={true}
        spaceBetween={24}
        navigation
        pagination={{ clickable: true }}
        className="similar-products-swiper"
        breakpoints={{
            320: {
            slidesPerView: 1,
            },
            900: {
            slidesPerView: 2,
            },
            1200: {
            slidesPerView: 3,
            },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

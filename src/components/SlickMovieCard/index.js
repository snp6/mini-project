import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MovieItem from '../MovieItem'
import './index.css'

const SlickMovieCard = props => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const {movies} = props

  const renderSlider = () => (
    <>
      <Slider {...settings}>
        {movies.map(each => (
          <MovieItem key={each.id} details={each} />
        ))}
      </Slider>
    </>
  )

  return (
    <div className="slick-app-container">
      <div style={{width: '95%'}}>{renderSlider()}</div>
    </div>
  )
}
export default SlickMovieCard

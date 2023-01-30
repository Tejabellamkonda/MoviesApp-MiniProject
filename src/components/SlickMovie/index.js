import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const SlickCard = props => {
  const {movies} = props
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movies.map(item => (
          <>
            <Link to={`/movies/${item.id}`}>
              <li className="li-container" key={item.id}>
                <img src={item.posterPath} alt={item.title} className="image" />
              </li>
            </Link>
          </>
        ))}
      </Slider>
    </div>
  )
}

export default SlickCard

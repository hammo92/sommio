import React from 'react'
import Slider from 'react-slick'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import HelpImg from '../../images/help-img.png'
import HelpImg2 from '../../images/help-img2.png'

const HelpSlider = () => {
  const { allContentfulCondition } = useStaticQuery(graphql`
    query {
      allContentfulCondition {
        nodes {
          slug
          id
          conditionName
<<<<<<< HEAD

=======
>>>>>>> 82f3b42abc9434576106ad8e89fadb8f7bdb6c06
          cardImage {
            file {
              url
            }
          }
        }
      }
    }
  `)

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    centerMode: false
  }
  return (
    <div className="helpslider-bg">
      <div className="container-fluid">
        <h3>Helps you with</h3>
        <Slider {...settings}>
          {allContentfulCondition &&
            allContentfulCondition.nodes &&
            allContentfulCondition.nodes.map(condition => (
              <div className="help-boxs">
                <img
                  src={condition.cardImage.file.url}
                  alt={condition.cardImage.file.fileName}
                />
                <div className="gradient-overlay"></div>
                <div className="help-content">
                  <h2>{condition.conditionName}</h2>
                  <Link
                    to={`/readMore/${condition.slug}`}
                    className="btn btn-link"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  )
}
export default HelpSlider

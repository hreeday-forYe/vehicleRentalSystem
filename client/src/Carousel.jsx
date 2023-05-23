// import React from 'react'
import "tailwindcss/tailwind.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const CarouselImages = ({data}) => {
  return (
    <>
      <Carousel>
      {data.photos.map((image, index)=>{
      <div>
        <img src={"http://localhost:4000/uploads/"+image} alt="image1" />
        {/* <p className="legend">Image 1</p> */}
      </div>
      }
      )
      }
      <div>
        <img src="image2.jpg" alt="image2" />
        <p className="legend">Image 2</p>
      </div>
      <div>
        <img src="image3.jpg" alt="image3" />
        <p className="legend">Image 3</p>
      </div>
    </Carousel>
    </>
  )
}

export default CarouselImages;
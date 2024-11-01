const CarouselSlide = ({ pictures, index, currentImage }) => {
  return (
    <div key={index} id={`slide${index}`} className="carousel-item relative w-full">
      <img src={currentImage} className="w-full" alt={`Slide ${index}`} />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#slide${(index - 1 + pictures.length) % pictures.length}`} className="btn btn-circle">❮</a>
        <a href={`#slide${(index + 1) % pictures.length}`} className="btn btn-circle">❯</a>
      </div>
    </div>
  )
}

export default CarouselSlide;

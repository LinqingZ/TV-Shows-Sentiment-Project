import {useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
//React Query function to use and fetch tv shows
const fetchTVShows = async (page) => {
  return await axios.get(`https://www.episodate.com/api/most-popular?page=${page}`)
}

const TVShows = () => {
  const [currentPage, setPage] = useState(1);
  const {isLoading, isError, data} = useQuery({
    queryKey: ["tv-shows", currentPage],
    queryFn: () => fetchTVShows(currentPage)
  })
  if(isLoading){
    return (
      <div>Loading TV shows...</div>
    )
  }
  if(isError){
    return (
      <div>Error getting TV shows</div>
    )
  }
  console.log(data)
  return (
  <div className="grid grid-cols-3 gap-6">
    {data.data.tv_shows.map(tvShow => (
      <div key={tvShow.id} className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img src={tvShow.image_thumbnail_path} alt={tvShow.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{tvShow.name}</h2>
          <p>
            {tvShow.network}
            <span className={`badge ${tvShow.status === "Running" ? "badge-success" : "badge-error"}`}>{tvShow.status}</span>
          </p>
          <div className="card-actions justify-end">
            <Link to={`/tv-shows/${tvShow.id}`} className="btn btn-primary">Learn More</Link>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}
export default TVShows;
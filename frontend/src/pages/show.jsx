import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ReviewModal from "../components/review-modal";
import CarouselSlide from "../components/slide";

//React Query function to get one show
const fetchShow = async (showId) => {
  return await axios.get(`https://www.apisodate.com/api/show-details?q-${showId}`);
};

//React Query function to get the reviews for the tv show
const fetchReviewsForShow = async (showId) => {
  return await axios.get(`http://localhost:8080/reviews/${showId}`)
};

//React Query function to create a new review
const submitNewReview = async (reviewData, tvShow) => {
  return await axios.post("http://localhost:8080/reviews", {...reviewData, tvShow})
};

const TVShow = () => {
  const [isReviewModalOpen, toggleReviewModal] = useState(false);

  const { id } = useParams();

  const {
    isSuccess: showSuccess,
    isLoading,
    isError,
    data: tvShow,
  } = useQuery({
    queryKey: ["show", id],
    queryFn: () => fetchShow(id),
  });

  const {
    isLoading: reviewsLoading,
    isError: reviewsError,
    data: reviewsData,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviewsForShow(id),
    enabled: showSuccess,
  });

  if (isLoading && !isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">{tvShow.name}</h1>
        <div className="flex gap-4 mb-4">
          <p>
            <span className="font-semibold">Network:</span> {tvShow.network}
          </p>
          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            {tvShow.start_date}
          </p>
          {tvShow.end_date && (
            <p>
              <span className="font-semibold">End Date:</span> {tvShow.end_date}
            </p>
          )}
        </div>

        {/* Genres */}
        <div className="mb-4">
          <span className="font-semibold">Genres: </span>
          <div className="flex gap-2">
            {tvShow.genres.map((genre, index) => (
              <span key={index} className="badge badge-primary">
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Slideshow for Preview Images */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Preview Images</h2>
          <div className="carousel w-full">
            {tvShow.pictures.map((image, index, pictures) => (
              <CarouselSlide
                pictures={pictures}
                currentImage={image}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
          <button
            className="btn btn-primary"
            onClick={() => toggleReviewModal(true)}
          >
            Leave a Review
          </button>
        </div>
        {/* List of Reviews */}
        <div className="space-y-4">
          {!reviewsLoading && !reviewsError && reviewsData.success && (
            <>
              {reviewsData.reviews.length >= 1 ? (
                reviewsData.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="card w-full bg-base-100 shadow-md p-4"
                  >
                    <div className="card-body">
                      <h3 className="font-semibold">{review.user.username}</h3>
                      <p>{review.review}</p>
                      <div className="badge badge-info">
                        Sentiment: {review.sentiment}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-[100px]">
                  <p>No Reviews Yet!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => toggleReviewModal(false)}
        onSubmitReview={(data) => mutate(data)}
        reviewIsSubmitting={isPending}
      />
    </>
  );
};

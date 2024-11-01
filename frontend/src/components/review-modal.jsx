const ReviewModal = ({ isOpen, onClose, onSubmitReview, isPending }) => {
  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Write a Review</h3>

            <form className="mt-4">
              {/* Review Textarea */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Review</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>

              {/* Modal Actions */}
              <div className="modal-action">
                <button type="submit" className="btn btn-primary" disabled={isPending}>
                  {isPending ? <span className="loading loading-spinner"></span> : <span>Submit</span>} 
                </button>
                <button type="button" className="btn" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewModal;

import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function Pagination() {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div className="pagination">
      <button className="btn btn--transperent" onClick={handleGoBack}>
        <IoArrowBack />
        <span>back</span>
      </button>
    </div>
  );
}

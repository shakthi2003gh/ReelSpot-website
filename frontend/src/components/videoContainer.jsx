import React from "react";

export default function VideoPlayer({ cover, videoKey }) {
  return (
    <div className="video-player">
      <img src={cover} alt="" />

      {videoKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
          allowFullScreen
          allow="autoplay"
        ></iframe>
      ) : (
        <div className="video-not-found">Video not found</div>
      )}
    </div>
  );
}

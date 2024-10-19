// src/app/(main)/mehbox/MemeRenderer.tsx

"use client";
import React, { useEffect, useState, useRef } from "react";
import { fetchMemes } from "./memeFetcher"; // Import the fetch function
import MemeComponent from "./Meme"; // Import the Meme component
import { Meme as MemeType } from "@/lib/types"; // Correctly import the Meme type

const MemeRenderer: React.FC = () => {
  const [memes, setMemes] = useState<MemeType[]>([]); // Use MemeType as the type for state
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreMemes = async () => {
    setLoading(true);
    const newMemes = await fetchMemes();
    setMemes((prev) => [...prev, ...newMemes]); // Append new memes to the existing ones
    setLoading(false);
  };

  useEffect(() => {
    loadMoreMemes(); // Load initial memes on component mount
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !loading) {
        loadMoreMemes(); // Load more memes when the anchor is in view
      }
    };

    observer.current = new IntersectionObserver(callback, options);
    const target = document.getElementById("scroll-anchor"); // Element to observe
    if (target) observer.current.observe(target);

    return () => {
      if (observer.current && target) {
        observer.current.unobserve(target);
      }
    };
  }, [loading]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {memes.map((meme) => (
          <MemeComponent key={meme.id} meme={meme} /> // Use the Meme component to render each meme
        ))}
      </div>
      <div id="scroll-anchor" className="h-1" /> {/* Target for the observer */}
      {loading && <p>Loading more memes...</p>} {/* Loading indicator */}
    </div>
  );
};

export default MemeRenderer;

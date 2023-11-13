import { ArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

function ScrollToTop() {
  // State to track the visibility of the scroll-to-top button
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // Function to toggle the visibility of the button based on scroll position

    if (window.pageYOffset > window.innerHeight * 0.25) {
      setIsVisible(true); // Set visibility to true if scrolled more than 25% of the viewport height
    } else {
      setIsVisible(false); // Set visibility to false otherwise
    }
  };

  const scrollToTop = () => {
    // Function to scroll to the top when the button is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll behavior is set to smooth for a smooth scrolling effect
    });
  };

  useEffect(() => {
    // Effect hook to add and remove event listeners on scroll
    window.addEventListener("scroll", toggleVisibility); // Add event listener to track scroll position
    return () => {
      window.removeEventListener("scroll", toggleVisibility); // Remove event listener when component is unmounted
    };
  }, []);

  return (
    <button
      type="button"
      className={`fixed p-2 bg-white text-black shadow-lg rounded-full z-20 animate-bounce ${
        isVisible ? " bottom-8 right-8" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="text-4xl" height={30} />
    </button>
  );
}

export default ScrollToTop;

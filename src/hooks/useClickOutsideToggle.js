import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handClickOutside);
    return () => {
      document.removeEventListener("mouseup", handClickOutside);
    };
  }, [ref]);
  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi"; // Import search icon
import "SearchFilter.css";

const SearchFilter = ({ events = [], setFilteredEvents }) => {  
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Events received in SearchFilter:", events); // Debugging

    if (!Array.isArray(events)) {
      console.error("Invalid events data in SearchFilter:", events);
      setFilteredEvents([]);  // Prevent crashes if events is undefined or incorrect
      return;
    }

    if (searchTerm === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => {
        if (!event || typeof event !== "object" || !event.title) { // ✅ Use event.title instead of event.name
          console.warn("Skipping invalid event:", event);
          return false;
        }
        return event.title.toLowerCase().includes(searchTerm.toLowerCase()); // ✅ Searching by title
      });

      setFilteredEvents(filtered);
    }
  }, [searchTerm, events, setFilteredEvents]);

  return (
    <div className="search-filter">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search events by title..." // ✅ Updated placeholder
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="search-icon" />
      </div>
    </div>
  );
};

export default SearchFilter;

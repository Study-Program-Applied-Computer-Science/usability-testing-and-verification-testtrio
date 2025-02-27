import './home.css';

const Home = () => {
  // Generate date strings from "01" to "31"
  /* const dates = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, '0')
  ); */

  return (
    <div className="home-container">
      {/* Background ticker */}
      {/* <div className="background-ticker">
        <div className="ticker-content">
          {dates.map(date => (
            <span key={date}>{date}</span>
          ))}
        </div>
      </div>
 */}
      {/* Main content */}
      <div className="content">
        <h1>Welcome to our</h1>
        <h2>Event Scheduling App</h2>
        <img src="src/Assets/calendar_blog.png" alt="site banner" />
        <p>
          The Personal Event Schedule App is a streamlined tool for managing personal
          appointments and events using an intuitive calendar interface. Users can easily
          create events by entering details such as title, description, date, time, location,
          and attendees. The app enhances organization through tag-based filtering and searching,
          and supports full CRUD operations (create, read, update, delete) for events. Automated
          email notifications keep all participants informed, while a dynamic calendar view allows
          users to add and manage events directly.
        </p>
      </div>
    </div>
  );
};

export default Home;

document.addEventListener("DOMContentLoaded", () => {
  const filmList = document.getElementById("films");
  const poster = document.getElementById("poster");
  const title = document.getElementById("title");
  const runtime = document.getElementById("runtime");
  const showtime = document.getElementById("showtime");
  const availableTickets = document.getElementById("available-tickets");
  const description = document.getElementById("description");
  const buyTicketButton = document.getElementById("buy-ticket");

  // Fetch and display the first movie's details
  fetch("http://localhost:3000/films/1")
    .then((response) => response.json())
    .then((movie) => displayMovieDetails(movie));

  // Fetch and display the list of all movies
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((movies) => {
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = movie.title;
        li.classList.add("film", "item");
        li.addEventListener("click", () => displayMovieDetails(movie));
        filmList.appendChild(li);
      });
    });

  // Display movie details
  function displayMovieDetails(movie) {
    poster.src = movie.poster;
    title.textContent = movie.title;
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
    showtime.textContent = `Showtime: ${movie.showtime}`;
    const available = movie.capacity - movie.tickets_sold;
    availableTickets.textContent = `Available Tickets: ${available}`;
    description.textContent = movie.description;

    buyTicketButton.disabled = available === 0;

    // Add event listener to each list item
    filmList.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => {
        // Remove the "Selected" class from all list items
        filmList.querySelectorAll("li").forEach((item) => {
          item.classList.remove("selected");
        });
        // Add the "Selected" class to the clicked list item
        li.classList.add("selected");
      });
    });
    //  Handles the click event for the buy ticket button.
    //  Updates the movie's ticket sales count and disables the button if no tickets are available
    buyTicketButton.onclick = () => {
      if (available > 0) {
        movie.tickets_sold += 1;
        availableTickets.textContent = `Available Tickets: ${
          movie.capacity - movie.tickets_sold
        }`;
        buyTicketButton.disabled = movie.capacity - movie.tickets_sold === 0;
      }
    };
  }
});

const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgzNmU3NzVmOGEwNTBhYWQ1OGJjMTA5YmQ5NzZlMCIsInN1YiI6IjY1OTc2NDAwNTkwN2RlNmFmNjNjMDMyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYZyff9p6tFtKesMN77ROw2da16tYDCRgyQs9bIg5Ns",
    },
  };
  
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((res) => res.json())
    .then((data) => {
      // 카드 담을 변수 선언
      const cardContainer = document.getElementById("card-container");
  
      data.results.forEach((element) => {
        // 카드 선언
        const card = document.createElement("div");
        card.innerHTML = `
          <div class="card h-100">
            <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" alt="${element.title}">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.overview}</p>
              <p class="card-text">Rating: ${element.vote_average}</p>
            </div>
          </div>
        `;
  
        // 카드컨테이너에 담기
        cardContainer.appendChild(card);
  
        // 이벤트리스너로 카드 누르면 아이디값 띄우기
        card.addEventListener("click", () => {
          alert(`Movie ID: ${element.id}`);
        });
      });
    })
    .catch((err) => console.error(err));
  
  function searchMovies() {
    const searchInput = document
      .querySelector(".finder")
      .value.toLowerCase(); // 검색어를 소문자로 변환
  
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const cardContainer = document.getElementById("card-container");
  
        // 기존 카드 모두 삭제
        while (cardContainer.firstChild) {
          cardContainer.removeChild(cardContainer.firstChild);
        }
  
        data.results.forEach((element) => {
          // 영화 제목을 소문자로 변환하여 검색어와 비교
          const movieTitle = element.title.toLowerCase();
  
          if (movieTitle.includes(searchInput)) {
            // 검색어를 포함하는 경우에만 카드 추가
            const card = document.createElement("div");
            card.innerHTML = `
          <div class="card h-100">
            <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" alt="${element.title}">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.overview}</p>
              <p class="card-text">Rating: ${element.vote_average}</p>
            </div>
          </div>
        `;
  
            // 카드컨테이너에 담기
            cardContainer.appendChild(card);
  
            // 이벤트리스너로 카드 누르면 아이디값 띄우기
            card.addEventListener("click", () => {
              alert(`Movie ID: ${element.id}`);
            });
          }
        });
      })
      .catch((err) => console.error(err));
  }
const best_movies_slider = document.querySelector(".best_movies_group")
const family_movies_slider = document.querySelector(".family_movies_group")
const animation_movies_slider = document.querySelector(".animation_movies_group")
const adventure_movies_slider = document.querySelector(".adventure_movies_group")

var scrollPerClick;
var ImagePadding = 50

let best_movies_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
let family_movies_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=Family&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
let animation_movies_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=Animation&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
let adventure_movies_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=Adventure&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="


showMovieData(best_movies_url, "best_movies")
showMovieData(family_movies_url, "family_movies")
showMovieData(animation_movies_url, "animation_movies")
showMovieData(adventure_movies_url, "adventure_movies")

// get bestmovie from api => return json =>set attribute id to button with film id
// and image_url for image.
const getBestMovie = fetch("http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=9&lang=&lang_contains=&max_year=&min_year=&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value){
    let best_movie = document.querySelector("img");
    best_movie.setAttribute("src",value.results[0].image_url);
    best_movie.setAttribute("id", value.results[0].id);
    let best_movie_title=document.getElementById("meilleurFilm_title");
    best_movie_title.innerText = value.results[0].title;
})
.catch(function(err){
console.log("une erreur est survenue: ", err);
});

var scrollAmount = 0;

function sliderScrollLeft(selected_class){
    selected_class.scrollTo({
        top:0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    });

    if(scrollAmount < 0){
        scrollAmount = 0
    }
}

function sliderScrollRight(selected_class){
    if(scrollAmount>=600){
        selected_class.scrollTo({
            top:0,
            left: 0,
            behavior: "smooth"
        });
        scrollAmount = 0;
    } else if  (scrollAmount<=selected_class.scrollWidth - selected_class.clientWidth){
        selected_class.scrollTo({
            top:0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"
        });
    }
}

async function showMovieData(url, className){
    var result = await axios.get(url);
    var result_page2 = []
    var result2 = result.data.next
    result2 = await axios.get(result2)
    var result6 = result2.data.results[0]
    var result7 = result2.data.results[1]
    result_page2.push(result6)
    result_page2.push(result7)
    result = result.data.results;
    var movies = result.concat(result_page2)
    let images = document.getElementsByClassName(className);
    movies.map(function(cur,index){
        images[index].setAttribute("src", cur.image_url);
        images[index].setAttribute("id", cur.id);
    });
    scrollPerClick = images[0].clientWidth + ImagePadding;
}

// get movie informations for modal box
function getMovieInformation(movie_url){
    fetch(movie_url)
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    }).then(function(value){
        let title_element = document.getElementById("title");
        title_element.innerText = value.title;

        document
            .getElementById("genres")
            .innerText = `Genres: ${value.genres}`;
        document
            .getElementById("countries")
            .innerText = `Countries: ${value.countries}`;
        document
            .getElementById("year")
            .innerText = `Year: ${value.year}`;
        document
            .getElementById("duration")
            .innerText = `Duration: ${value.duration} min`;
        
        let rated_element = document.getElementById("rated");
            if (value.rated = "Not rated or unknow rating"){
                rated_element.innerText = " - "
            }else {
                rated_element.innerText = value.rated
            };
        document
            .getElementById("imdb_score")
            .innerText = `Imdb Score: ${value.imdb_score}`;
        
        let budget_element = document.getElementById("budget")
        if (value.budget === null){
            budget_element.innerText = " - ";
        }else{
        budget_element.innerText = `Budget: ${value.budget}$`;
        };
        document
            .getElementById("directors")
            .innerText =`Directors: ${value.directors}`;
        document
            .getElementById("actors")
            .innerText = `Actors:\n${value.actors}`;
        document
            .getElementById("description")
            .innerText = `Description:\n${value.description}`;
        document
            .getElementById("image_url_cible")
            .setAttribute("src",value.image_url);
    })
    .catch(function(err) {
        console.log("une erreur est survenue.")
        });
}

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal and 
// When the user clicks the button, open modal
// Fetch informations from api with id movie
const imgs = document.querySelectorAll("img");
for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("click", function(e) {
        e.preventDefault();
        modal.style.display = "block";
        //let id_movie = e.target.getAttribute("id");
        let id_movie=imgs[i].getAttribute("id");
        let movie_url = `http://localhost:8000/api/v1/titles/${id_movie}`.split("%20");
        getMovieInformation(movie_url)
  })  
}
// Get the <span> element that closes the modal and
// when the user clicks on <span> (x), close the modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
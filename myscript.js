
"use strict";
const best_movies_slider = document.querySelector(".best_movies_group");
const action_movies_slider = document.querySelector(".action_group");
const comedies_movies_slider = document.querySelector(".comedies_group");
const family_movies_slider = document.querySelector(".family_group");

var scroll_on_click;
var image_padding = 50;

let best_movies_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
let action_movies_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=Action&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&l;ang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
let comedies_movies_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=Comedy&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
let family_movies_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=Family&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="; 


show_movie_data(best_movies_url, "best_movies", "best_movies_group");
show_movie_data(action_movies_url, "action_movies", "action_group");
show_movie_data(comedies_movies_url, "comedies_movies", "comedies_group");
show_movie_data(family_movies_url, "family_movies", "family_group");


const best_movie_img = document.getElementById("topmovie").getElementsByTagName("img");
const best_movie_title = document.getElementById("topmovie").getElementsByClassName("heading");
const best_movie_rate = document.getElementById("topmovie").getElementsByClassName("Score");

// Best movie

fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        let results = data.results;
        let bestmovie = results[0];
        let lien = bestmovie.image_url;
        best_movie_img[0].src = lien;
        best_movie_img[0].id = bestmovie.id;
        best_movie_title[0].textContent = bestmovie.title;
        best_movie_rate[0].textContent = "Score ☆ " + bestmovie.imdb_score + " ☆";
    })
    .catch(function(err) {
        console.log("An error has occured: ", err);
    });


var scroll_amount = 0;

// Flèches

function scroll_left(selected_class) {
    selected_class.scrollTo({
        top: 0,
        left: (scroll_amount -= scroll_on_click),
        behavior: "smooth"
    });

    if (scroll_amount < 0) {
        scroll_amount = 0;
    }
}

function scroll_right(selected_class) {
    if (scroll_amount >= 600) {
        selected_class.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        scroll_amount = 0;
    } else if (scroll_amount <= selected_class.scrollWidth - selected_class.clientWidth) {
        selected_class.scrollTo({
            top: 0,
            left: (scroll_amount += scroll_on_click),
            behavior: "smooth"
        });
    }
}


async function show_movie_data(url, className) { 
    var result = await axios.get(url);
    var result_page2 = [];
    var result2 = result.data.next;
    result2 = await axios.get(result2);
    var result6 = result2.data.results[0];
    var result7 = result2.data.results[1];
    result_page2.push(result6);
    result_page2.push(result7);
    result = result.data.results;
    var movies = result.concat(result_page2);
    let visible_infos = document.getElementsByClassName(className);

    movies.map(function(cur, index) {
        visible_infos[index].setAttribute("src", cur.image_url);
        visible_infos[index].setAttribute("id", cur.id);
    
    scroll_on_click = visible_infos[0].clientWidth + image_padding;
    });
}


// Modal Content

function getMovieInformation(movie_url) {
    fetch(movie_url)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        }).then(function(value) {
            let title_element = document.getElementById("title");
            title_element.textContent = value.title;

            document
                .getElementById("genres")
                .textContent = `Genres: ${value.genres}`.replaceAll(",", ", ");
            document
                .getElementById("countries")
                .textContent = `Countries : ${value.countries}`;
            document
                .getElementById("year")
                .textContent = `Year : ${value.year}`;
            document
                .getElementById("duration")
                .textContent = `Duration : ${value.duration} min`;

            let rated_element = document.getElementById("rated");
            if (value.rated = "Not rated or unknow rating") {
                rated_element.textContent = " - ";
            } else {
                rated_element.textContent = value.rated;
            }
            document
                .getElementById("imdb_score")
                .textContent = `Imdb Score : ${value.imdb_score}`;

            let budget_element = document.getElementById("budget");
            if (value.budget === null) {
                budget_element.textContent = " - ";
            } else {
                budget_element.textContent = `Budget : ${value.budget}$`;
            }
            document
                .getElementById("directors")
                .textContent = `Directors : ${value.directors}`.replaceAll(",", ", ");
            document
                .getElementById("actors")
                .textContent = `Actors :\n${value.actors}`.replaceAll(",", ", ");
            document
                .getElementById("description")
                .textContent = `Description :\n${value.description}`;
            document
                .getElementById("image_url_cible")
                .setAttribute("src", value.image_url);
        })
        .catch(function(err) {
            console.log("An error has occured.");
        });
}

        // Get the modal
    var modal = document.getElementById("myModal");
    const imgs = document.querySelectorAll("img");

    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", function(e) {
            e.preventDefault();
            modal.style.display = "block";
            let id_movie = imgs[i].getAttribute("id");
            let movie_url = `http://localhost:8000/api/v1/titles/${id_movie}`;
            getMovieInformation(movie_url);
        });
    }

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

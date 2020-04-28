import React from 'react';
import '../style/App.sass';
import { API_URL, API_KEY_3 } from "./Api";
import MovieItem from './movieItem';
import MovieTabs from "./components/MovieTabs";
import Pagination from "./components/Pagination";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      movieWillWatch: [],
      sort_by: "popularity.desc",
      currentPage: 1,
      totalPages: 0,
      isLoading: false,
    };

    // this.removeMovie = this.removeMovie.bind(this);
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    return prevState.sort_by !== this.state.sort_by ||
      prevState.currentPage !== this.state.currentPage
      ? this.getMovies()
      : false;
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.currentPage}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results,
          isLoading: false,
          totalPages: data.total_pages,
        });
      });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value,
      currentPage: 1,
    });
  };

  changeCurrentPage = value => {
    if (value > 0) {
      this.setState({
        currentPage: value,
      });
    }
  };

  addMovieToWillWatch = movie => {

    const updateMovies = [...this.state.movieWillWatch, movie];

    this.setState({
      movieWillWatch: updateMovies
    });

  };

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.movieWillWatch.filter(function (item) {
      return item.id !== movie.id;
    });

    this.setState({
      movieWillWatch: updateMoviesWillWatch
    })
  }

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    });
    this.setState({
      movies: updateMovies,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container">
        <div className="row">

          <div className="col-9">
            <div className="row mb-8 mt-5">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
              {this.state.movies.map((movie) => {
                return (
                <div className="col-sm-4 mt-4"> 
                  <MovieItem
                    key={movie.id}
                    movie={movie}
                    removeMovie={this.removeMovie}
                    addMovieToWillWatch={this.addMovieToWillWatch}
                    removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                  />
                </div>
                );
              })}
            </div>
          </div>
          <div className="col-3 mt-5">
            <h4>Will Watch: {this.state.movieWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.movieWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row justify-content-center">
          <Pagination
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            changeCurrentPage={this.changeCurrentPage}
          />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { getAreas } from "../../apiCalls";
import "./App.css";

import Areas from "../Areas/Areas";
import WelcomeForm from "../WelcomeForm/WelcomeForm";
import Listings from "../Listings/Listings";
import ListingDetails from "../ListingDetails/ListingDetails";
import Header from "../Header/Header";

class App extends Component {
  state = {
    userInfo: {},
    url: "https://vrad-api.herokuapp.com",
    areas: [],
    selectedListing: {},
    favorites: [],
    favoritesID: [],
  };

  componentDidMount = async () => {
    const areas = await getAreas();
    this.setState({ areas });
  };

  selectListing = (selectedListing) => {
    this.setState({ selectedListing });
  };

  handleUserInfo = (userInfo) => {
    this.setState({ userInfo });
  };

  toggleFavorites = (id) => {
    if (!this.state.favoritesID.includes(id)) {
      this.setState({ favoritesID: [...this.state.favoritesID, id] }, () => {
        // this.updateLocalStorage()
      });
    } else {
      let newFavoritesID = this.state.favoritesID.filter((favorite) => {
        return favorite !== id;
      });
      let newFavorites = this.state.favorites.filter((favorite) => {
        return favorite.id !== id;
      });
      this.setState(
        { favoritesID: newFavoritesID, favorites: newFavorites },
        () => {
          // this.updateLocalStorage()
        }
      );
    }
  };

  render() {
    return (
      <main className="app">
        <Switch>
          <Route
            path="/areas/:id/listings/:listingId"
            render={({ match }) => {
              return (
                <div className="body-container">
                  <Header
                    userInfo={this.state.userInfo}
                    favoritesID={this.state.favoritesID}
                  />
                  <ListingDetails
                    {...this.state.selectedListing}
                    toggleFavorites={this.toggleFavorites}
                    favoritesID={this.state.favoritesID}
                  />
                </div>
              );
            }}
          />
          <Route
            path="/areas/:id/listings"
            render={({ match }) => {
              const areaId = Number(match.params.id);
              const selectedArea = this.state.areas.find(
                (area) => areaId === area.id
              );
              return (
                <div className="body-container">
                  <Header
                    userInfo={this.state.userInfo}
                    favoritesID={this.state.favoritesID}
                  />
                  <Listings
                    match={match.params.id}
                    {...selectedArea}
                    selectListing={this.selectListing}
                  />
                </div>
              );
            }}
          />
          <Route
            exact
            path="/areas"
            render={() => {
              return (
                <div className="body-container">
                  <Header
                    userInfo={this.state.userInfo}
                    favoritesID={this.state.favoritesID}
                  />
                  <Areas areas={this.state.areas} />
                </div>
              );
            }}
          />
          <Route
            exact
            path="/"
            render={() => <WelcomeForm handleUserInfo={this.handleUserInfo} />}
          />
        </Switch>
      </main>
    );
  }
}

export default App;

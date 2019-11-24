import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Grid from './Grid';
import Modal from './Modal';

class App extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Redirect exact from="/" to="/gallery" />
          <Route exact path="/gallery">
            <Header />
            <Grid />
          </Route>
        </Switch>

        {window.localStorage.getItem('rr_login') !== null ? 
          <Route path="/img/:id" component={Modal} />
         : null}
      </div>
    );
  }
}
export default App;

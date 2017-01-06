import React, {Component} from 'react';
import './App.css';
import '../Main/Main.css'; /* <main> style component for Route components */
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data} = this.props.route;
    return (
      <div>
        <Header
          title={data.title}
          subtitle={data.subtitle}
        />
        {/* Route components defined in ./scripts/routes.js */}
        {React.cloneElement(this.props.children, {data: data})}
        <Nav
          projects={data.projects}
          routes={this.props.routes}
        />
      </div>
    );
  }
}

module.exports = App;

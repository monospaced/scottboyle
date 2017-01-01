import React, {Component} from 'react';
import 'normalize.css';
import './App.css';
import '../Main/Main.css';
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

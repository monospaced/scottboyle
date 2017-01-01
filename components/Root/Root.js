import React, {Component} from 'react';
import '../../assets/favicon.ico';

class Root extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {app, meta} = this.props;
    return (
      <html lang="en-gb">
        <head>
          <meta charSet="utf-8" />
          {meta}
          <meta name="viewport" content="width=device-width" />
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <div
            id="app"
            className="App"
            dangerouslySetInnerHTML={app}
          />
          <script src="/bundle.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Root;

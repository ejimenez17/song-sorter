import Head from 'next/head';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'next/router';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({artist: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.artist);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <Head>
          <title>Song Sorter - Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Song Sorter!
          </h1>

          <p className="description">
            Input your artist's name below.
          </p>

          <form onSubmit={this.handleSubmit}>
            <label>
              Artist:
              <input type="text" value={this.state.artist} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" onClick={() => Router.push('/sort')} />
          </form>

        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
          </a>
        </footer>
      </div>
    );
  }
}

// ReactDOM.render(
//   <Home />,
//   document.getElementById('root')
// );

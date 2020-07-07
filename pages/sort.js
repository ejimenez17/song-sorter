import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'

class SortBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: this.props.router.query.artistName,
        };
    }
    render() {
        const msg = "Pick songs for " + this.state.artist;
        return (
            <div className="container">
                <Head>
                    <title>Song Sorter - Sort</title>
                </Head>

                <main>
                    <h1 className="title">
                        Song Sorter!
                    </h1>

                    <p className="description">
                        {msg}
                    </p>
                </main>
            </div>
        );
    }
}

export default withRouter(SortBox)
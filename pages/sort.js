import Head from 'next/head'
import Link from 'next/link'

export default class SortBox extends React.Component {
    render() {
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
                        pick songs
                    </p>
                </main>
            </div>
        );
    }
}

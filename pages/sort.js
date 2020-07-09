import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'

class SortBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: this.props.router.query.artistName,
            songs: [
                "hit",
                "lie again",
                "fear",
                "let me hear you say",
                "247",
                "second life",
                "network love",
                "back it up",
                "lucky",
                "snap shoot",
                "happy ending",
            ],
        };
        this.preference = {
            LEFT: 'left',
            RIGHT: 'right',
            BOTH: 'both',
            NEITHER: 'neither'
        };
    }

    // handleUserChoice:
    // change state values for boxes
    handleUserChoice(leftSong, rightSong) {
        // set left song to left box
        // set right song to right box
        // promiseDoWhilst(() => {
        //     // get user pref
        // }, () => {
        //     // if userPref == null
        // }).then(() => {
        //     // grab user pref and set state value to null again
        //     // return user pref to advance sort alg
        // });
    }

    // when a song box is clicked - change state value for user click
    // handleLeftClick();
    // handleRightClick();
    // handleBothNeitherClick();

    insertSort(){
        // let sortedArr = linked list (1D) for now
        for (song in this.state.songs) {
            // binary search thru sortedArr to find spot for songs
                // start, end, insertIndex
                // while start <= end
                    // when start = end, insert song at insertIndex (start and end)
                    // let userPref = handleUserChoice(song, sortedArr[insertIndex])
                    // switch(userPref) {
                    //     case this.preference.LEFT:
                    //         // code - shift indexes accordingly
                    //     case this.preference.RIGHT:
                    //         // code - shift indexes accordingly
                    //     case this.preference.BOTH:
                    //         // code - shift indexes accordingly
                    //     case this.preference.NEITHER:
                    //         // code - shift indexes accordingly
                    // }
        }
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
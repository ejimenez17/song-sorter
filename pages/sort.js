import Head from 'next/head'
import { withRouter } from 'next/router'
import {LinkedList, ListNode} from '../components/linkedlist'

class SortBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: this.props.router.query.artistName,
            leftSong: "song 1",
            preference: {
                LEFT: 'left',
                RIGHT: 'right',
                BOTH: 'both'
            },
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
            rightSong: "song 2",
            userPref: null,
        };
        // this.preference = {
        //     LEFT: 'left',
        //     RIGHT: 'right',
        //     BOTH: 'both'
        // };
    }

    handleUserChoice(newLeftSong, newRightSong) {
        this.setState({
            leftSong: newLeftSong,
            rightSong: newRightSong,
        })
        promiseDoWhilst(() => {
            // wait for user click
            // boxes will have onClick methods to call that will set userPref
        }, () => {
            return userPref == null;
        }).then(() => {
            // grab user pref and set state value to null again
            let currentUserPref = this.state.userPref;
            this.setState({
                userPref: null,
            });
            // return user pref to advance sort alg
            return currentUserPref;
        });
    }

    // when a song box is clicked - change state value for user click
    handleLeftClick() {
        this.setState({
            leftSong: "BLAH",
            userPref: this.state.preference.LEFT,
        });
    }
    handleRightClick() {
        this.setState({
            rightSong: "YEAH",
            userPref: this.state.preference.RIGHT,
        });
    }
    handleBothClick() {
        this.setState({
            userPref: this.state.preference.BOTH,
        });
    }

    insertSort(){
        let sortedList = new LinkedList();
        for (songToPlace in this.state.songs) {
            let start = 0;
            let end = sortedList.size();
            let insertIndex = (end - start) / 2 + start;
            while (start <= end) {
                // current song is always on LEFT
                let userPref = handleUserChoice(songToPlace, sortedArr.get(insertIndex));
                switch(userPref) {
                    case this.state.preference.LEFT:
                        // code - shift indexes accordingly
                        if (start == end) {
                            sortedList.insertAt(songToPlace, insertIndex, false);
                            break;
                        }
                        end = insertIndex - 1;
                    case this.state.preference.RIGHT:
                        // code - shift indexes accordingly
                        if (start == end) {
                            sortedList.insertAt(songToPlace, insertIndex+1, false);
                            break;
                        }
                        start = insertIndex + 1;
                    case this.state.preference.BOTH:
                        // code - insert here addToIndex = true
                        sortedList.insertAt(songToPlace, insertIndex, true);
                        break;
                }
                insertIndex = (end - start) / 2 + start;
            }
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
                    <h2 className="description">
                        {msg}
                    </h2>

                    <div className="sort-board">
                        <div className="sort-song-selection">
                            {/* song choice boxes */}
                            <div className="sort-song-box" id="sortSongBoxLeft" onClick={this.handleLeftClick.bind(this)}>
                                {this.state.leftSong}
                            </div>
                            <div className="sort-song-box" id="sortSongBoxRight" onClick={this.handleRightClick.bind(this)}>
                                {this.state.rightSong}
                            </div>
                        </div>
                        <div className="sort-other-choices">
                            {/* both button */}
                            <div className="sort-song-button" onClick={this.handleBothClick.bind(this)}>
                                I like both
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default withRouter(SortBox)
import Head from 'next/head'
import { withRouter } from 'next/router'
import {MyLinkedList} from '../components/linkedlist'
import promiseDoWhilst from 'promise-do-whilst'
import promiseDoUntil from 'promise-do-until'

class SortBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: this.props.router.query.artistName,
            leftSong: "song 1",
            preference: {
                LEFT: 'left',
                RIGHT: 'right',
                BOTH: 'both',
                WAITING: 'waiting',
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
            userPref: 'waiting',
        };
        // this.preference = {
        //     LEFT: 'left',
        //     RIGHT: 'right',
        //     BOTH: 'both'
        // };
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.leftSong !== this.state.leftSong || nextProps.rightSong !== this.state.rightSong) {
            this.setState({
                leftSong: nextProps.leftSong,
                rightSong: nextProps.rightSong,
            });
            return true;
        }
        return false;
    }

    // componentDidMount() {
    //     let response = this.insertSort();
    //     console.log(response);
    // }

    handleUserChoice() {
        // console.log(newLeftSong);
        // console.log(newRightSong);
        // this.setState({
        //     leftSong: newLeftSong,
        //     rightSong: newRightSong,
        // });
        // document.getElementById("sortSongBoxLeft").innerHTML = this.state.leftSong;
        // console.log("changed left & right");
        while (this.state.userPref === this.state.preference.WAITING) {
            console.log("waiting for user input");
        }
        // promiseDoUntil(() => {
        //     // wait for user click
        //     // boxes will have onClick methods to call that will set userPref
        //     let val = 17;
        // }, () => {
        //     return this.state.userPref != this.state.preference.WAITING;
        // }).then(() => {
        //     // grab user pref and set state value to null again
        //     let currentUserPref = this.state.userPref;
        //     this.setState({
        //         userPref: this.state.preference.WAITING,
        //     });
        //     // return user pref to advance sort alg
        //     return currentUserPref;
        // });

        // grab user pref and set state value to null again
        let currentUserPref = this.state.userPref;
        this.setState({
            userPref: this.state.preference.WAITING,
        });
        // return user pref to advance sort alg
        return currentUserPref;
    }

    // when a song box is clicked - change state value for user click
    handleLeftClick() {
        this.setState({
            // leftSong: "BLAH",
            userPref: this.state.preference.LEFT,
        });
    }
    handleRightClick() {
        this.setState({
            // rightSong: "YEAH",
            userPref: this.state.preference.RIGHT,
        });
    }
    handleBothClick() {
        this.setState({
            userPref: this.state.preference.BOTH,
        });
    }

    insertSort(){
        console.log("begin sorting");
        let sortedList = new MyLinkedList();
        for (let i = 0; i < this.state.songs.length; i++) {
            // songToPlace in this.state.songs) {
            let songToPlace = this.state.songs[i];
            if (i == 0) {
                sortedList.add(songToPlace);
                console.log("add song " + songToPlace);
                continue;
            }
            let start = 0;
            let end = sortedList.size;
            let insertIndex = Math.floor((end - start) / 2) + start;
            console.log("place song " + songToPlace);
            while (start <= end) {
                // current song is always on LEFT
                this.setState({
                    leftSong: songToPlace,
                    rightSong: sortedList.get(insertIndex),
                });
                console.log("set state done");
                let userPref = this.handleUserChoice().bind(this);
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
                insertIndex = Math.floor((end - start) / 2) + start;
            }
        }
        return sortedList;
    }

    render() {
        const msg = "Pick songs for " + this.state.artist;
        // this.setState({
        //     userPref: this.state.preference.WAITING,
        // });
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
                        <div className="sort-song-button" id="beginSortButton" value="Click to begin sorting" onClick={this.insertSort.bind(this)}>
                            {/* Click to begin sorting */}
                        </div>
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
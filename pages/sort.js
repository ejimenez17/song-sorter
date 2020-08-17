import Head from 'next/head'
import { withRouter } from 'next/router'
import {MyLinkedList} from '../components/linkedlist'

class SortBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: this.props.router.query.artistName,
            currentSongIndex: 0,
            end: 0,
            insertIndex: 0,
            leftSong: "song 1",
            preference: {
                LEFT: 'left',
                RIGHT: 'right',
                BOTH: 'both',
                WAITING: 'waiting',
            },
            start: 0,
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
            sortedArray: new Array(),
            rightSong: "song 2",
            userPref: 'waiting',
        };
    }

    // when a song box is clicked - change state value for user click
    handleLeftClick() {
        this.setState({userPref: this.state.preference.LEFT}, () => {
            this.handleClickUpdate();
        });
    }
    handleRightClick() {
        this.setState({userPref: this.state.preference.RIGHT}, () => {
            this.handleClickUpdate();
        });
    }
    handleBothClick() {
        this.setState({userPref: this.state.preference.BOTH}, () => {
            this.handleClickUpdate();
        });
    }

    handleClickUpdate() {
        let pref = this.state.userPref;
        let sortedArray = this.state.sortedArray.slice(0,this.state.sortedArray.length);
        let songToPlace = this.state.songs[this.state.currentSongIndex];
        let newStart = this.state.start;
        let newEnd = this.state.end;
        let newInsertIndex, leftSong, rightSong;
        let newCurrentSongIndex = this.state.currentSongIndex;
        if (this.state.start == this.state.insertIndex || this.state.start == this.state.end) {
            // insert song
            switch(pref) {
                case this.state.preference.LEFT:
                    sortedArray.splice(this.state.insertIndex, 0, songToPlace);
                    // console.log(songToPlace + " PLACED at index " + this.state.insertIndex);
                    break;
                case this.state.preference.RIGHT:
                    sortedArray.splice(this.state.insertIndex+1, 0, songToPlace);
                    // console.log(songToPlace + " PLACED at index " + (this.state.insertIndex+1));
                    break;
                default:
                    console.log("DEFAULT");
            }
            // reset indices + update displayed songs
            newStart = 0;
            newEnd = sortedArray.length-1;
            newCurrentSongIndex = this.state.currentSongIndex + 1;
            leftSong = this.state.songs[newCurrentSongIndex];
        } else {
            // console.log("user pref: " + pref);
            // console.log(pref == this.state.preference.LEFT);
            // console.log(pref == this.state.preference.RIGHT);
            switch(pref) {
                case this.state.preference.LEFT:
                    newEnd = this.state.insertIndex - 1;
                    break
                case this.state.preference.RIGHT:
                    newStart = this.state.insertIndex + 1;
                    break;
                default:
                    console.log("DEFAULT");
            }
            leftSong = this.state.leftSong;
        }
        // console.log("new start: " + newStart);
        // console.log("new end: " + newEnd);
        newInsertIndex = Math.floor((newEnd - newStart) / 2) + newStart;
        // console.log("new iI: " + newInsertIndex);
        rightSong = sortedArray[newInsertIndex];
        this.setState({
            currentSongIndex: newCurrentSongIndex,
            end: newEnd,
            insertIndex: newInsertIndex,
            leftSong: leftSong,
            rightSong: rightSong,
            start: newStart,
            sortedArray: sortedArray,
        });
        // console.log("set songs");
        // console.log("left: " + leftSong + " at index: ");
        // console.log("right: " + rightSong + " at index: " + newInsertIndex);
    }

    handleBeginSort() {
        // [fetch songs from spotify]
        let sortedArray = this.state.sortedArray.slice(0, 1);
        sortedArray[0] = this.state.songs[this.state.currentSongIndex];

        this.setState({
            currentSongIndex: 1,
            leftSong: this.state.songs[1],
            rightSong: sortedArray[0],
            sortedArray: sortedArray,
        });
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
                        <div className="sort-song-button" id="beginSortButton" value="Click to begin sorting" onClick={this.handleBeginSort.bind(this)}>
                            Click to begin sorting
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
                        {/* <div className="sort-other-choices">
                            <div className="sort-song-button" onClick={this.handleBothClick.bind(this)}>
                                I like both
                            </div>
                        </div> */}
                    </div>
                </main>
            </div>
        );
    }
}

export default withRouter(SortBox)
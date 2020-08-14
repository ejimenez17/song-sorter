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
        this.setState({
            userPref: this.state.preference.LEFT,
        });
        this.handleClickUpdate();
    }
    handleRightClick() {
        this.setState({
            userPref: this.state.preference.RIGHT,
        });
        this.handleClickUpdate();
    }
    handleBothClick() {
        this.setState({
            userPref: this.state.preference.BOTH,
        });
        this.handleClickUpdate();
    }

    handleClickUpdate() {
        let pref = this.state.userPref;
        let sortedArray = this.state.sortedArray.slice(0,this.state.sortedArray.length);
        let songToPlace = this.state.songs[this.state.currentSongIndex];
        let newStart, newEnd, newInsertIndex, leftSong, rightSong;
        if (this.state.start == this.state.end) {
            // insert song
            switch(pref) {
                case this.state.preference.LEFT:
                    sortedArray.splice(this.state.insertIndex, 0, songToPlace);
                case this.state.preference.RIGHT:
                    sortedArray.splice(this.state.insertIndex+1, 0, songToPlace);
            }
            // reset indices + update displayed songs
            newStart = 0;
            newEnd = sortedArray.length;
            leftSong = this.state.songs[this.state.currentSongIndex + 1];
        } else {
            switch(pref) {
                case this.state.preference.LEFT:
                    newEnd = this.state.insertIndex - 1;
                case this.state.preference.RIGHT:
                    newStart = this.state.insertIndex + 1;
            }
            leftSong = this.state.leftSong;
        }
        newInsertIndex = Math.floor((newEnd - newStart) / 2) + newStart;
        rightSong = sortedArray[newInsertIndex];
        console.log(rightSong);
        this.setState({
            currentSongIndex: this.state.currentSongIndex + 1,
            end: newEnd,
            insertIndex: newInsertIndex,
            leftSong: leftSong,
            rightSong: rightSong,
            start: newStart,
            sortedArray: sortedArray,
        });
    }

    handleBeginSort() {
        // [fetch songs from spotify]
        let sortedArray = this.state.sortedArray.slice(0, 1);
        sortedArray[0] = this.state.songs[this.state.currentSongIndex];
        const start = 0;
        const end = sortedArray.size;
        this.setState({
            currentSongIndex: 1,
            end: end,
            insertIndex: Math.floor((end - start) / 2) + start,
            leftSong: this.state.songs[1],
            rightSong: sortedArray[0],
            start: start,
            sortedArray: sortedArray,
        });
    }

    // async insertSort(){
    //     console.log("begin sorting");
    //     let sortedList = new MyLinkedList();
    //     for (let i = 0; i < this.state.songs.length; i++) {
    //         let songToPlace = this.state.songs[i];
    //         if (i == 0) {
    //             sortedList.add(songToPlace);
    //             console.log("add song " + songToPlace);
    //             continue;
    //         }
    //         let start = 0;
    //         let end = sortedList.size;
    //         let insertIndex = Math.floor((end - start) / 2) + start;
            
    //         console.log("place song " + songToPlace);
    //         while (start <= end) {
    //             // current song is always on LEFT
    //             var songToCompare = sortedList.get(insertIndex);
    //             console.log("compare " + songToCompare + " with " + songToPlace);
    //             this.setState({
    //                 leftSong: songToPlace,
    //                 rightSong: songToCompare,
    //             });
    //             document.getElementById("sortSongBoxLeft").innerHTML = songToPlace;
    //             document.getElementById("sortSongBoxRight").innerHTML = songToCompare;

    //             this.forceUpdate();
                
    //             console.log(document.getElementById("sortSongBoxLeft").innerHTML);
    //             let userPref = this.handleUserChoice();
    //             console.log("user's pref is " + userPref);
    //             switch(userPref) {
    //                 case this.state.preference.LEFT:
    //                     // code - shift indexes accordingly
    //                     if (start == end) {
    //                         sortedList.insert(songToPlace, insertIndex, false);
    //                         break;
    //                     }
    //                     end = insertIndex - 1;
    //                 case this.state.preference.RIGHT:
    //                     // code - shift indexes accordingly
    //                     if (start == end || sortedList.size == 1) {
    //                         sortedList.insert(songToPlace, insertIndex+1, false);
    //                         break;
    //                     }
    //                     start = insertIndex + 1;
    //                 case this.state.preference.BOTH:
    //                     // code - insert here addToIndex = true
    //                     sortedList.insert(songToPlace, insertIndex, true);
    //                     break;
    //             }
    //             insertIndex = Math.floor((end - start) / 2) + start;
    //         }
    //     }
    //     return sortedList;
    // }

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
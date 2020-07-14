import Head from 'next/head'
import { withRouter } from 'next/router'
import {LinkedList, ListNode} from '../components/linkedlist'

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
            userPref = null,
        };
        this.preference = {
            LEFT: 'left',
            RIGHT: 'right',
            BOTH: 'both'
            // NEITHER: 'neither'
        };
    }

    // handleUserChoice:
    // change state values for boxes
    handleUserChoice(leftSong, rightSong) {
        // TODO: set left song to left box
        // TODO: set right song to right box
        promiseDoWhilst(() => {
            // wait for user click
            // boxes will have onClick methods to call that will set userPref
        }, () => {
            return userPref == null;
        }).then(() => {
            // grab user pref and set state value to null again
            let currentUserPref = this.state.userPref;
            this.state.userPref = null;
            // return user pref to advance sort alg
            return currentUserPref;
        });
    }

    // when a song box is clicked - change state value for user click
    handleLeftClick() {
        this.userPref = this.preference.LEFT;
    }
    // handleRightClick();
    // handleBothNeitherClick();

    insertSort(){
        let sortedList = new LinkedList();
        for (songToPlace in this.state.songs) {
            let start = 0;
            // let end = this.state.songs.length;
            let end = sortedList.size();
            let insertIndex = (end - start) / 2 + start;
            while (start <= end) {
                // if (start == end) { // don't need this after all bc should compare song w/song @ insertIndex
                //     // get user response and insert accordingly
                //     sortedList.insertAt(songToPlace, insertIndex, false);
                //     break;
                // } else {
                // current song is always on LEFT
                let userPref = handleUserChoice(songToPlace, sortedArr.get(insertIndex));
                switch(userPref) {
                    case this.preference.LEFT:
                        // code - shift indexes accordingly
                        if (start == end) {
                            sortedList.insertAt(songToPlace, insertIndex, false);
                            break;
                        }
                        end = insertIndex - 1;
                    case this.preference.RIGHT:
                        // code - shift indexes accordingly
                        if (start == end) {
                            sortedList.insertAt(songToPlace, insertIndex+1, false);
                            break;
                        }
                        start = insertIndex + 1;
                    case this.preference.BOTH:
                        // code - insert here addToIndex = true
                        sortedList.insertAt(songToPlace, insertIndex, true);
                        break;
                    // case this.preference.NEITHER:
                        // code - insert here addToIndex = true
                }
                insertIndex = (end - start) / 2 + start;
                // }
            }
        }
    }

    // mergesort(arr) {
    //     if (arr.length == 1) {
    //         return arr;
    //     }

    //     const half = arr.length / 2;
    //     let leftHalf = this.mergesort(arr.slice(0, half));
    //     let rightHalf = this.mergesort(arr.slice(half, arr.length));
    //     let leftP, rightP = 0;

    //     let mergedArr = new Array(leftHalf.length + rightHalf.length).fill(null);
    //     let insertIndex = 0;

    //     while (insertIndex < mergedArr.length) {
    //         if (leftP < leftHalf.length && rightP < rightHalf.length) {
    //             let leftSong = leftHalf[leftP];
    //             let rightSong = rightHalf[rightP];
    //             let userPref = handleUserChoice(leftSong, rightSong);

    //             switch(userPref) {
    //                 case this.preference.LEFT:
    //                     // code - shift indexes accordingly
    //                 case this.preference.RIGHT:
    //                     // code - shift indexes accordingly
    //                 case this.preference.BOTH:
    //                     // code - shift indexes accordingly
    //                 case this.preference.NEITHER:
    //                     // code - shift indexes accordingly
    //             }
    //         }
    //     }
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

                    <p className="description">
                        {msg}
                    </p>
                </main>
            </div>
        );
    }
}

export default withRouter(SortBox)
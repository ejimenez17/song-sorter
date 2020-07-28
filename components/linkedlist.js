// LinkedList class

export class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class MyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(element) {
        if (this.head == null) {
            this.head = new ListNode(element);
        } else {
            var currNode = this.head;

            while (currNode.next != null) {
                currNode = currNode.next;
            }

            currNode.next = new ListNode(element);
        }

        this.size++;
    }

    get(i) {
        if (i >= this.size) {
            throw "Index out of bounds";
        } else {
            let count = 0; 
            let currNode = this.head;

            while (count < i) {
                currNode = currNode.next;
                ++count;
            }

            return currNode.value;
        }
    }

    isEmpty() {
        return (this.size == 0 && this.head == null);
    }

    insert(element, index, addToIndex) {
        if (this.size < index) {
            throw "Index out of bounds";
        } else if (this.size == index || this.head == null) {
            this.add(element);
        } else {
            let count = 0;
            let currNode = this.head;

            while (count < index) {
                currNode = currNode.next;
                count++;
            }

            if (addToIndex) { // add element to current index
                let newNodeList;
                if (Array.isArray(currNode.value)) {
                    newNodeList = currNode.value;
                    newNodeList.add(element);
                } else {
                    newNodeList = new Array(2);
                    newNodeList[0] = currNode.value;
                    newNodeList[1] = element;
                    currNode.value = newNodeList;
                }
            } else { // make new node at this index
                let newNodeNext = new ListNode(currNode.value);
                newNodeNext.next = currNode.next;
                currNode.value = element;
                currNode.next = newNodeNext;
            }
            this.size++;
        }
    }

    size() {
        return this.size;
    }
}
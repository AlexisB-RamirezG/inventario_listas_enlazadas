export default class Inventory {
    constructor() {
        this._start = null;
        this._end = null;
        this._inventoryString = "";
    }

    get inventoryString() {
        return this._inventoryString;
    }

    registerProduct(product) {
        if (this._searchRegisteredProduct(product.code, this._start) == -1) {
            if (this._start === null) {
                this._start = product;
            } else if (this._end === null) {
                this._start.next = product;
                this._end = product;
            } else {
                this._end.next = product;
                this._end = product;
            }
        } else {
            return 1;
        }
    }

    addProductInPosition(product, position) {
        if (this._searchRegisteredProduct(product.code, this._start) == -1) {
            if (position == 1) {
                product.next = this._start;
                this._start = product;
            } else {
                let previousProduct = this._searchForPreviousProduct(position, this._start);
                if(previousProduct.next == null) {
                    this._end = product;
                }
                product.next = previousProduct.next;
                previousProduct.next = product;
            }
        }
    }

    searchForInquiry(code) {
        let product = this._searchRegisteredProduct(code, this._start);
        if (product == -1) {
            return "Not found";
        } else {
            return product.toString();
        }
    }

    deleteProduct(code) {
        if (this._start.code == code) {
            this._start = this._start.next;
        } else {
            let product = this._searchForNext(code, this._start);
            console.log(product);
            if (product == -1) {
                return "Not found";
            } else {
                if(product.next.code == this._end.code) {
                    this._end = product;
                }
                product.next = product.next.next;
            }
        }
    }

    _searchForPreviousProduct(position, start) {
        for (let i = 1; i < position + 1; i++) {
            if (i == position - 1) {
                return start;
            }
            start = start.next;
        }
    }

    _searchForNext(code, start) {
        while (start.next != null) {
            if (start.next.code == code) {
                return start;
            }
            start = start.next;
        }
        return -1;
    }

    printInventory() {
        this._inventoryString = "";
        this._getInventoryAsString(this._start);
    }

    printFlippedInventory() {
        this._inventoryString = "";
        this._getFlippedInventoryAsString(this._start);
    }

    _searchRegisteredProduct(code, start) {
        while (start != null) {
            if (start.code == code) {
                return start;
            }
            start = start.next;
        }
        return -1;
    }

    /*_searchRegisteredProduct(code, start) {
        if (start != null) {
            if (start.code == code) {
                return start;
            } else {
                if (start == this._end) {
                    return -1;
                } else {
                    return this._searchRegisteredProduct(code, start.next);
                }
            }
        } else {
            return -1;
        }
    }*/

    _getFlippedInventoryAsString(start) {
        if (start != null) {
            if (start.next != null) {
                this._getFlippedInventoryAsString(start.next);
            }
            this._inventoryString += start.toString() + "<br>";
        }
    }

    _getInventoryAsString(start) {
        if (start != null) {
            this._inventoryString += start.toString() + "<br>";
            if (start.next != null) {
                this._getInventoryAsString(start.next);
            }
        }
    }
}
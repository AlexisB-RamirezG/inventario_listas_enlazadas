import Inventory from "./inventory.js";
import Product from "./product.js";

let bttnRegister = document.querySelector("#register"),
    bttnInquiry = document.querySelector("#inquiry"),
    bttnInsert = document.querySelector("#insert"),
    bttnGlobal = document.querySelector("#globalInquiry"),
    bttnFlipped = document.querySelector("#flippedInquiry"),
    divInventory = document.querySelector("#showInventory"),
    divInquiry = document.querySelector("#showInquiry"),
    bttnDelete = document.querySelector("#delete");

bttnRegister.addEventListener("click", () => {
    m.registerNewProduct(m.extractDataFromInputs());
});

bttnInquiry.addEventListener("click", () => {
    m.makeInquiry(Number(document.querySelector("#inquiryCode").value));
});

bttnInsert.addEventListener("click", () => {
    let data = m.extractDataFromInputs(),
        position = document.querySelector("#position").value;
    m.insertProduct(data, position);
});

bttnDelete.addEventListener("click", () => {
    m.deleteFromInventory(document.querySelector("#deleteCode").value);
});

bttnGlobal.addEventListener("click", () => {
    m.showInventory();
});

bttnFlipped.addEventListener("click", () => {
    m.showFlippedInventory();
});

class Main {
    constructor() {
        this._baseInventory = new Inventory();
    }

    registerNewProduct(objNewProduct) {
        this._baseInventory.registerProduct(objNewProduct);
        this.showInventory();
    }

    insertProduct(product, position) {
        this._baseInventory.addProductInPosition(product, position);
        this.showInventory();
    }

    makeInquiry(code) {
        divInquiry.innerHTML = this._baseInventory.searchForInquiry(code);
    }

    extractDataFromInputs() {
        let newProduct = {
            code: Number(document.querySelector("#code").value),
            name: document.querySelector("#name").value,
            price: document.querySelector("#price").value,
            quantity: document.querySelector("#quantity").value,
            description: document.querySelector("#description").value
        }
        let objNewProduct = new Product(newProduct);
        return objNewProduct;
    }

    deleteFromInventory(code) {
        this._baseInventory.deleteProduct(code);
        this.showInventory();
    }

    showInventory() {
        this._baseInventory.printInventory();
        divInventory.innerHTML = this._baseInventory.inventoryString;
    }

    showFlippedInventory() {
        this._baseInventory.printFlippedInventory();
        divInventory.innerHTML = this._baseInventory.inventoryString;
    }

    defaultRegister() {
        let p1 = {
            code: 1,
            name: "Paleta",
            price: "4.00",
            quantity: "30",
            description: "Vainilla"
        }

        let p2 = {
            code: 2,
            name: "Paleta",
            price: "4.00",
            quantity: "30",
            description: "Chocolate"
        }

        let p3 = {
            code: 3,
            name: "Paleta",
            price: "4.00",
            quantity: "30",
            description: "Cajeta"
        }

        this.registerNewProduct(new Product(p1));
        this.registerNewProduct(new Product(p2));
        this.registerNewProduct(new Product(p3));
    }
}

let m = new Main();
//m.defaultRegister();
import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let customerName = document.getElementById("customer-name")
let orderContainer = document.getElementById("order-container")

let cart = []
let orderSelection = ""
let itemToRemove = ''
let totalPrice = 0
let notOrdered = true

document.addEventListener('click', function(e){
    
    if(e.target.dataset.price){
        cart.push({name:e.target.dataset.name, price:e.target.dataset.price, uuid:uuidv4()})
        getTotalPrice()
        renderItems(cart)
        renderOrder()
    } else if(e.target.dataset.remove){
        itemToRemove = cart.findIndex(item => item.uuid === e.target.dataset.remove)
        cart.splice(itemToRemove, 1)
        getTotalPrice()
        renderItems(cart)
        renderOrder()
    }  else if(e.target.dataset.complete){
        document.getElementById("payment-modal").classList.toggle("hidden")
        document.getElementById("final-price").innerHTML = ` $${totalPrice}`
    }
})

document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault()
    document.getElementById("payment-modal").classList.toggle("hidden")
    orderContainer.innerHTML = `<p>Thanks ${customerName.value}!  Your order is on its way!</p>`
    orderContainer.classList.toggle("ordered")
    cart = []
    notOrdered = false
})

function getTotalPrice(){
    totalPrice = cart.reduce((totalPrice, currentItem) =>
        totalPrice + Number(currentItem.price), 0)
    return totalPrice
}

function getMenu(menu){
    return menu.map(function(item){
        const {name, ingredients, price, image} = item
        return `
            <div class="items">
                <img class="image" src="${image}">
                <div class="product">
                    <p class="name">${name}</p>
                    <p class="ingredients">${ingredients}</p>
                    <p class="price">$${price}</p>
                </div>
                <button class="addItem" data-price="${price}" data-name="${name}">+</button>
            </div>`
    }).join('')
}

document.getElementById("items-container").innerHTML += getMenu(menuArray)

function renderOrder(){
    let orderHTML = `
    <p id="your-order">Your Order<p>
    <div id="order-items">${orderSelection}</div>
    <div id="price-container">
        <p id="total-label">Total Price:</p>
        <p id="total-price">$${totalPrice}</p>
    </div>
    <button id="complete-btn" data-complete="completeOrder">Complete Order</button>
    `
    orderContainer.innerHTML = orderHTML
    if (notOrdered === false){
        orderContainer.classList.toggle("ordered")
        notOrdered = true}
}

function renderItems(order) {
    orderSelection = order.map(function(item){
            return  `<div class="items-selected">
                <p class="selected-name">${item.name}</p>
                <button class="remove-btn" data-remove="${item.uuid}">remove</button>
                <p class="selected-price">$${item.price}</p>
            </div>
            `
    }).join("")

}

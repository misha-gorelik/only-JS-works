window.addEventListener('click', counter);
window.addEventListener('click', addToCart);

function counter (event) {

    let counter;

    if (event.target.dataset.action == 'minus' || event.target.dataset.action == 'plus'){
        const counterWrapper = event.target.closest('.counter-wrapper');
        counter = counterWrapper.querySelector('[data-counter]');
    }

    if (event.target.dataset.action === 'plus'){
        if (event.target.closest('.cart-wrapper')){
            reloadSumm();
        }
        counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === 'minus'){
            if (event.target.closest('.cart-wrapper')){
                if (parseInt(counter.innerText) === 1){
                    event.target.closest('.cart-item').remove();
                } else {
                    counter.innerText = --counter.innerText;
                }
                reloadSumm();


            } else {
                if (parseInt(counter.innerText) > 1){
                    counter.innerText = --counter.innerText;
                }
                reloadSumm();
            }
}};

const cartWrapper = document.querySelector('.cart-wrapper');

function addToCart (event) {
    if (event.target.hasAttribute('data-cart')){
        const productInfo = event.target.closest('.card');
        const itemForCart = {
            id : productInfo.dataset.id,
            imgSrc : productInfo.querySelector('.product-img').getAttribute('src'),
            title : productInfo.querySelector('.item-title').innerText,
            pcs : productInfo.querySelector('[data-items-in-box]').innerText,
            weight : productInfo.querySelector('.price__weight').innerText,
            price : productInfo.querySelector('.price__currency').innerText,
            count : productInfo.querySelector('[data-counter]').innerText
        };

        const itemForCartHTML = `<div class="cart-item" data-id="${itemForCart.id}">
        <div class="cart-item__top">
            <div class="cart-item__img">
                <img src="${itemForCart.imgSrc}" alt="${itemForCart.imgSrc}">
            </div>
            <div class="cart-item__desc">
                <div class="cart-item__title">${itemForCart.title}</div>
                <div class="cart-item__weight">${itemForCart.pcs} / ${itemForCart.weight}</div>

                <!-- cart-item__details -->
                <div class="cart-item__details">

                    <div class="items items--small counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter="">${itemForCart.count}</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>

                    <div class="price">
                        <div class="price__currency">${itemForCart.price}</div>
                    </div>

                </div>
                <!-- // cart-item__details -->

            </div>
        </div>
    </div>`
        
        const itemInCart = cartWrapper.querySelector(`[data-id="${itemForCart.id}"]`);

        if (itemInCart){
            itemInCart.querySelector('[data-counter]').innerText = parseInt(itemInCart.querySelector('[data-counter]').innerText) + parseInt(itemForCart.count) ;
            
        } else {
            cartWrapper.insertAdjacentHTML('beforeend', itemForCartHTML);
        }
        productInfo.querySelector('[data-counter]').innerText = 1;
        
    }
    reloadCart();
    reloadSumm();
};

let orderSumm = 0;


function reloadSumm() {
    const itemsInCart = document.querySelectorAll('.cart-item');
    let total = 0;
    const totalPrice = document.querySelector('.total-price');
    const deliveryCost = document.querySelector('.delivery-cost');
    
    itemsInCart.forEach(function (item) {
        const price = parseInt(item.querySelector('.price__currency').innerText);
        const count = parseInt(item.querySelector('[data-counter]').innerText);
        const currentSumm = price * count;
        total += currentSumm;
           
        })
    orderSumm = total;

    if (orderSumm >= 600) {
        deliveryCost.innerText = 'бесплатно';
        deliveryCost.classList.add('free');
    } else {
        deliveryCost.innerText = '300 ₽';
        deliveryCost.classList.remove('free');
        orderSumm += 300;
    }

    totalPrice.innerText = orderSumm;

    if (itemsInCart.length == 0) {
        totalPrice.innerText = '0';
    }
};

function reloadCart() {
    const emptyCart = document.querySelector('[data-cart-empty]');
    const orderForm = document.querySelector('#order-form');
    const delivery = document.querySelector('.delivery');
    const totalPrice = document.querySelector('.total-price');

    if (cartWrapper.children.length > 0){
        emptyCart.classList.add('none');
        orderForm.classList.remove('none');
        delivery.classList.remove('none');
    } else {
        emptyCart.classList.remove('none');
        orderForm.classList.add('none');
        delivery.classList.add('none');

        
    }

}

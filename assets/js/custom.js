$("document").ready(function () {
  loadEditOrder();
  loadCheckout();
  reload();
  addLocationDetails();
  changeQuantity();
});

function Pizza(size, crust, tops,orderQty) {
  this.Size = size;
  this.Crust = crust;
  this.Tops = tops;
  this.Quantity= orderQty;
}

function PizzaPrices(size, crust, tops) {
  let sizeP = 0;
  let crustP = 0;
  let topP = 0;

  const sizePrices = [0, 200, 400, 700];
  const crustPrices = [0, 20, 40, 60];
  const topPrices = [0, 10, 15, 25];

  if (size == "Small") {
    sizeP = sizePrices[1];
  } else if (size == "Medium") {
    sizeP = sizePrices[2];
  } else if (size == "Large") {
    sizeP = sizePrices[3];
  } else {
    sizeP = 0;
  }

  if (crust == "Crispy") {
    crustP = crustPrices[1];
  } else if (crust = "Stuffed") {
    crustP = crustPrices[2];
  } else if (crust = "Gluten free") {
    crustP = crustPrices[3];
  } else {
    crustP = 0;
  }

  if (tops == "Pepperoni") {
    topP = topPrices[1];
  } else if (tops == "Bacon") {
    topP = topPrices[2];
  } else if (tops == "Mushrooms") {
    topP = topPrices[3];
  }else{
    topP=0;
  }

  this.SizePrice = sizeP;
  this.CrustPrice = crustP;
  this.TopPrice = topP;
  this.totalCost= sizeP+crustP+topP;
}


var loadEditOrder = function () {
  $("#placeOrderBtn").click(function (e) {
    e.preventDefault();
    
    let size= $( "#pizzaSize option:selected").text();
    let crust=$("#pizzaCrust option:selected").text();
    let top=$("#pizzaTops option:selected").text();

    let pizza=new Pizza(size,crust,top,1);
    let pizzaPrices= new PizzaPrices(size,crust,top);

    window.localStorage.setItem("pizza", JSON.stringify(pizza));
    window.localStorage.setItem("pizzaPrice",JSON.stringify(pizzaPrices));
    window.location.href = "EditOrder.html";
  });
}

var addLocationDetails= function(){
  $('#deliveryCheckbox').change(function() {
    if(this.checked) {
        var returnVal = confirm("Do you want to add delivery details?");
        $(this).prop("checked", returnVal);
        if(returnVal){
          let location=document.querySelector("#location");
          location.classList.remove("hide");
        }
      
    }else{
      let location=document.querySelector("#location");
      location.classList.add("hide");
    }
           
});
}

function CheckoutDetails(price,quantity,grandtotal, deliveryCheck,destination){
  this.cPrice=price;
  this.cQuantity=quantity;
  this.cGrandtotal=grandtotal;
  this.cDeliveryCheck=deliveryCheck;
  this.cDestination= destination;
}

var changeQuantity= function(){
  $('#editQty').on('input', function() {
    let qty=$('#editQty').val();
    let pizzaPrice= JSON.parse(window.localStorage.getItem("pizzaPrice"));
    let totalVal=pizzaPrice.totalCost * qty;
    document.getElementById('cart-total').innerText=totalVal;
  });
 
}



var loadCheckout = function () {
  $("#proceedCheckout").click(function (e) {
    e.preventDefault();
    let grandtotal=document.getElementById('cart-total').value;
    console.log(grandtotal);
    let checked= $('#deliveryCheckbox').checked;
    let quantity=document.getElementById('editQty').value;
    let pizzaPrice= JSON.parse(window.localStorage.getItem("pizzaPrice"));
    let price=pizzaPrice.totalCost;
    let destination=document.getElementById('locationDetails').value;

    let data=new CheckoutDetails(price,quantity,grandtotal, checked,destination);
    window.localStorage.setItem("checkout",JSON.stringify(data));
    window.location.href = "Checkout.html";
  });
}

var reload = function () {
  $("#checkoutFinal").click(function (e) {
    let checkoutDetail= JSON.parse(window.localStorage.getItem("checkout"));
    let delivery= checkoutDetail.cDestination;
    if(delivery!=""){
      alert("Your Order will be delivered to "+ delivery)
    }
    e.preventDefault();
    window.location.href = "index.html";
  });
}

var editPriceOnQtyChange= function(){
  $("#checkoutFinal").click(function (e) {
    e.preventDefault();
    window.location.href = "index.html";
  });
}

jQuery(function ($) {
  
  jQuery('.mu-top-slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    fade: true,
    cssEase: 'linear'
  });
});


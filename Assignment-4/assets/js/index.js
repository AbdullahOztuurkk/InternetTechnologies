//Add close button to all product items
var product_list = document.getElementsByTagName("LI")
var i;
for (i = 0; i < product_list.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close-button";
  span.appendChild(txt);
  product_list[i].appendChild(span);
}

// Click on a close button to hide the current product
var close = document.getElementsByClassName("close-button");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Create a new list item when clicking on the "Add" button
function newProduct() {
    var li = document.createElement("li");
    li.className = "product";
    var inputValue = document.getElementById("input-bar").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You cannot add empty product!");
    } else {
      document.getElementById("product-list").appendChild(li);
    }
    document.getElementById("input-bar").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close-button";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  } 

//Delete all li items in product list
function deleteProducts(){
  document.getElementById('product-list').innerHTML='';
}
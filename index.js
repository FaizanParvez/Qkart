let obj = null;

const data = fetch("https://qkart-frontend.herokuapp.com/api/v1/products")
  .then(function (res) {
    return res.json();
  })
  .then((data) => {
    obj = data;
    const row = document.querySelector(".row");
    for (var i = 0; i < data.length; i++) {
      var addCard = createCards(data[i]);
      row.appendChild(addCard);
    }
  })
  .catch(function (err) {
    throw new Error(err);
  });

function createCards(item) {
  const card = document.createElement("div");

  card.classList = "card";
  const temp = `
	  <img class="card-img-top" src= "${item.image}">
         <div class="card-body" style='padding-left:0px'>
            <h6 class="card-title"> ${item.name}</h6>
            <p class="card-text">$${item.cost}</p>
         </div>
`;
  card.innerHTML += temp;

  const listItem = document.createElement("div");
  listItem.setAttribute("class", "list-item");
  card.appendChild(listItem);
  var itr;
  for (itr = 0; itr < item.rating; itr++) {
    const star = `
        <i class="fa fa-star" style= 'color: #f3da35' ></i>
     `;
    listItem.innerHTML += star;
  }
  while (itr < 5) {
    const star = `
    <i class="fa-regular fa-star" style= 'color: #f3da35'></i>
   `;
    listItem.innerHTML += star;
    itr++;
  }

  const bt = `
       <button style="margin-bottom: 5px" class="btn btn-success place"><i class="fa-solid fa-cart-plus"></i>ADD TO CART</button>
  `;
  card.innerHTML += bt;

  return card;
}

function search() {
  let initialSearch = document.getElementById("myInput").value.toUpperCase();

  const row = document.querySelector(".row");
  row.innerHTML = "";

  for (var i = 0; i < obj.length; i++) {
    var str = obj[i].name;
    str = str.toUpperCase();

    if (str.includes(initialSearch)) {
      const addCard = createCards(obj[i]);
      row.appendChild(addCard);
    }
  }
}

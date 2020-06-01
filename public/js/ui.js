const catalogue = document.querySelector(".catalogue");

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

const renderProduct = (data, id) => {
  const html = `
    <div class="card-panel product white row" data-id="${id}" draggable="true">
        <img src="/img/default.png" alt="product thumb" />
        <div class="product-details">
        <div class="product-name">${data.name}</div>
        <div class="product-price">$${data.price}</div>
        </div>
        <div class="product-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
        </div>
    </div>
    `;

  catalogue.innerHTML += html;
};

const removeProduct = (id) => {
  const product = catalogue.querySelector(`.product[data-id=${id}]`);
  product.remove();
};

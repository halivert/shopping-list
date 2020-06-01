db.enablePersistence().catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("Persistence failed");
  } else if (err.code === "unimplemented") {
    console.log("Persistence not available");
  }
});

db.collection("products").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderProduct(change.doc.data(), change.doc.id);
    } else if (change.type === "removed") {
      removeProduct(change.doc.id);
    }
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const product = {
    name: form.name.value,
    price: form.price.value,
  };

  db.collection("products")
    .add(product)
    .catch((err) => console.log(err));

  form.name.value = "";
  form.price.value = "";
});

const productsContainer = document.querySelector(".products");
productsContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName === "I") {
    const id = evt.target.dataset.id;
    if (id) db.collection("products").doc(id).delete();
  }
});

let inventory = JSON.parse(localStorage.getItem("inventory")) || [
  {
    id: 1,
    nama: "Laptop",
    stok: 5,
  },
  {
    id: 2,
    nama: "Mouse",
    stok: 10,
  },
  {
    id: 3,
    nama: "Keyboard",
    stok: 0,
  },
];

function saveToLocalStorage() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

const inventoryList = document.querySelector(".inventory-list");
const namaBarang = document.getElementById("namaBarang");
const jumlahBarang = document.getElementById("jumlahBarang");
const btnTambah = document.getElementById("btnTambah");

function renderInventory() {
  inventoryList.innerHTML = inventory
    .map(
      ({ id, nama, stok }) =>
        `<li> 
            <p>${nama} - <span class="${stok <= 0 ? "stok-habis" : ""}"> Sisa Stok : ${stok <= 0 ? `Habis` : stok}</span></p>
            <div class="bungkus">
            <button data-id="${id}" class="btn-Ubah" >Ubah Stok</button>
            <button data-id="${id}" class="btn-Hapus" >Hapus</button>
            </div>
        </li>`,
    )
    .join("");
}

inventoryList.addEventListener("click", (e) => {
  if (e.target.dataset.id && e.target.classList.contains("btn-Hapus")) {
    const id = Number(e.target.dataset.id);
    inventory = inventory.filter((item) => item.id !== id);
    saveToLocalStorage();
    renderInventory();
  } else if (e.target.classList.contains("btn-Ubah")) {
    const id = Number(e.target.dataset.id);
    const editbarang = inventory.find((item) => item.id === id);
    const stokBaru = prompt("Masukan Stok Baru", editbarang.stok);

    if (stokBaru === null) return;
    else if (isNaN(stokBaru)) {
      alert("yang Kamu masukan bukan angka!");
      return;
    } else {
      editbarang.stok = Number(stokBaru);
    }
    saveToLocalStorage();
    renderInventory();
  }
});

btnTambah.addEventListener("click", function (e) {
  e.preventDefault();

  let objBarang = {};

  if (namaBarang.value !== "") {
    objBarang.id = Date.now();
    objBarang.nama =
      namaBarang.value.charAt(0).toUpperCase() + namaBarang.value.slice(1);
    objBarang.stok = Number(jumlahBarang.value);
    inventory.push(objBarang);
  } else {
    alert("masukan barang terlebih dahulu!");
  }

  namaBarang.value = "";
  jumlahBarang.value = "";
  saveToLocalStorage();
  renderInventory();
});

renderInventory();


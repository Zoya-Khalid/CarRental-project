const API = "http://localhost:3000";

// Load car makes
async function loadMakes() {
  const res = await fetch(`${API}/makes`);
  const makes = await res.json();
  const list = document.getElementById("makeList");
  if (!list) return;
  list.innerHTML = "";
  makes.forEach((make) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${make.name} (${make.country_of_origin}, founded ${make.founded_year})`;
    list.appendChild(li);
  });
}

// Load car models
async function loadModels() {
  const res = await fetch(`${API}/models`);
  const models = await res.json();
  const list = document.getElementById("modelList");
  if (!list) return;
  list.innerHTML = "";
  models.forEach((model) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${model.name} - Variant: ${model.variant}, Engine: ${model.engine_capacity}`;
    list.appendChild(li);
  });
}

// Load bookings
async function loadBookings() {
  const res = await fetch(`${API}/bookings`);
  const bookings = await res.json();
  const list = document.getElementById("bookingList");
  if (!list) return;
  list.innerHTML = "";
  bookings.forEach((b) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `Booking: ${b.Customer_id?.full_name || b.Customer_id} → ${b.Car_id?.make_id?.name || "Car"} (${b.booking_start_date} to ${b.booking_end_date})`;
    list.appendChild(li);
  });
}

// Load customers into dropdown
async function loadCustomers() {
  const res = await fetch(`${API}/customers`);
  const customers = await res.json();
  const select = document.getElementById("customerSelect");
  if (!select) return;
  select.innerHTML = '<option value="">Select Customer</option>';
  customers.forEach((c) => {
    const option = document.createElement("option");
    option.value = c._id;
    option.textContent = `${c.full_name} (${c.email})`;
    select.appendChild(option);
  });
}

// Load cars into dropdown
async function loadCars() {
  const res = await fetch(`${API}/cars`);
  const cars = await res.json();
  const select = document.getElementById("carSelect");
  if (!select) return;
  select.innerHTML = '<option value="">Select Car</option>';
  cars.forEach((car) => {
    const make = car.make_id?.name || "Unknown Make";
    const model = car.model_id?.name || "Unknown Model";
    const option = document.createElement("option");
    option.value = car._id;
    option.textContent = `${make} ${model} (${car.license_plate})`;
    select.appendChild(option);
  });
}

// Load dropdown values
async function loadDropdowns() {
  const [makes, models, colors, transmissions] = await Promise.all([fetch(`${API}/makes`).then((res) => res.json()), fetch(`${API}/models`).then((res) => res.json()), fetch(`${API}/colors`).then((res) => res.json()), fetch(`${API}/transmissions`).then((res) => res.json())]);

  fillSelect("makeSelect", makes, "name");
  fillSelect("modelSelect", models, "name");
  fillSelect("colorSelect", colors, "name");
  fillSelect("transmissionSelect", transmissions, "name");
}

function fillSelect(selectId, items, labelField) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = '<option value="">Select</option>';
  items.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item._id;
    opt.textContent = item[labelField];
    select.appendChild(opt);
  });
}

// Add car
document.getElementById("addCarForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newCar = {
    make_id: document.getElementById("makeSelect").value,
    model_id: document.getElementById("modelSelect").value,
    color: document.getElementById("colorSelect").value,
    transmission_type_id: document.getElementById("transmissionSelect").value,
    license_plate: document.getElementById("licensePlate").value,
    manufacturing_year: document.getElementById("year").value,
    rental_rate_per_day: document.getElementById("rate").value,
    location: document.getElementById("location").value,
    mileage: document.getElementById("mileage").value,
  };

  await fetch(`${API}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCar),
  });

  e.target.reset();
  loadCarInventory();
});

// Load car inventory table
async function loadCarInventory() {
  const res = await fetch(`${API}/cars`);
  const cars = await res.json();
  const tableBody = document.querySelector("#carTable tbody");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  cars.forEach((car) => {
    const make = car.make_id?.name || "Unknown";
    const model = car.model_id?.name || "Unknown";
    const transmission = car.transmission_type_id?.name || "N/A";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${make}</td>
      <td>${model}</td>
      <td>${car.color || "N/A"}</td>
      <td>${transmission}</td>
      <td>${car.license_plate || "N/A"}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteCar('${car._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete car
async function deleteCar(id) {
  await fetch(`${API}/cars/${id}`, { method: "DELETE" });
  loadCarInventory();
}

// Booking form (single handler)
document.getElementById("bookingForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    Customer_id: document.getElementById("customerSelect")?.value,
    Car_id: document.getElementById("carSelect")?.value,
    booking_start_date: document.getElementById("startDate").value,
    booking_end_date: document.getElementById("endDate").value,
  };

  await fetch(`${API}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Optional: show confirmation
  new bootstrap.Modal(document.getElementById("successModal"))?.show();

  e.target.reset();
  loadBookings();
});

// Customer table
async function loadCustomerTable() {
  const res = await fetch(`${API}/customers`);
  const customers = await res.json();
  const tableBody = document.querySelector("#customerTable tbody");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.first_name} ${customer.last_name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone_number}</td>
      <td>${customer.address}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editCustomer('${customer._id}')">Edit</button>
        <button class="btn btn-sm btn-danger ms-2" onclick="deleteCustomer('${customer._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add or update customer
document.getElementById("customerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("customerId").value;
  const customer = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone_number: document.getElementById("phone_number").value,
    address: document.getElementById("address").value,
  };

  const method = id ? "PUT" : "POST";
  const url = id ? `${API}/customers/${id}` : `${API}/customers`;

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  e.target.reset();
  document.getElementById("customerId").value = "";
  loadCustomerTable();
});

// Edit customer
async function editCustomer(id) {
  const res = await fetch(`${API}/customers/${id}`);
  if (!res.ok) return alert("Failed to load customer");

  const customer = await res.json();
  document.getElementById("customerId").value = customer._id;
  document.getElementById("first_name").value = customer.first_name;
  document.getElementById("last_name").value = customer.last_name;
  document.getElementById("email").value = customer.email;
  document.getElementById("phone_number").value = customer.phone_number;
  document.getElementById("address").value = customer.address;
}

// Delete customer
async function deleteCustomer(id) {
  if (!confirm("Are you sure you want to delete this customer?")) return;
  await fetch(`${API}/customers/${id}`, {
    method: "DELETE",
  });
  loadCustomerTable();
}

// Initialization
window.addEventListener("DOMContentLoaded", () => {
  loadMakes();
  loadModels();
  loadCustomers();
  loadCars();
  loadBookings();
  loadDropdowns();
  loadCarInventory();
  loadCustomerTable();
});

const getCachedElement = () => {
  const elementCache = {};
  return elementId => {
    if (elementCache[elementId]) return elementCache[elementId];
    const element = document.getElementById(elementId);
    elementCache[elementId] = element;
    return element;
  };
};

const debounceCreator = () => {
  let timer;
  return (callback, delay) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
};

const stateCreator = () => {
  let screenState = {
    dataList: [],
    selectedItem: -1
  };
  return {
    setState: (key, state) => {
      screenState[key] = state;
    },
    getState: key => screenState[key],
    resetState: () => {
      screenState = { dataList: [], selectedItem: -1 };
    }
  };
};

const debounce = debounceCreator();
const cachedElements = getCachedElement();
const screenState = stateCreator();

const startLoaders = () => {
  cachedElements("message").innerHTML = "Loading...";
  cachedElements("message").style.display = "block";
  cachedElements("car-owners-list").innerHTML = cachedElements(
    "message"
  ).innerHTML;
  cachedElements("confirm-ride").style.display = "none";
};

const fetchCarOwners = async (startFrom, destination) => {
  if (!startFrom && !destination) {
    return [];
  }
  let URL = `http://localhost:3000/carOwners?`;
  if (startFrom) {
    URL = `${URL}start_from=${startFrom}&`;
  }
  if (destination) {
    URL = `${URL}destination=${destination}`;
  }
  startLoaders();
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const clearExistingSelected = () => {
  const selectedItem = screenState.getState("selectedItem");
  if (selectedItem === -1) return;
  const element = document.getElementById(`car-owner-id-${selectedItem}`);
  element.childNodes[1].src = screenState.getState("dataList")[
    selectedItem
  ].image_url;
};

const onItemClick = index => {
  clearExistingSelected();
  const element = document.getElementById(`car-owner-id-${index}`);
  screenState.setState("selectedItem", index);
  element.childNodes[1].src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png";
  cachedElements("confirm-ride").disabled = false;
};

const onConfirmRide = () => {
  window.location.href = "/views/success.html";
};

const onNoData = () => {
  screenState.resetState();
  cachedElements("confirm-ride").disabled = true;
  cachedElements("confirm-ride").style.display = "none";
  cachedElements("message").innerHTML = "No Data Found...";
  cachedElements("message").style.display = "block";
  cachedElements("car-owners-list").innerHTML = cachedElements(
    "message"
  ).innerHTML;
};

const onSearchCarOwners = async (startFromValue, destinationValue) => {
  const data = await fetchCarOwners(startFromValue, destinationValue);
  screenState.setState("dataList", data);
  if (!data.length) {
    onNoData();
    return;
  }
  cachedElements("confirm-ride").style.display = "block";
  let elements = data
    .map((item, index) => {
      return `<div id='car-owner-id-${index}' onclick='onItemClick(${index})' class="card car-owner-list__item">
      <img
        class="car-owner-list__item-img"
        src='${item.image_url}'
      />
      <div class="car-owner-details">
        <h6>
          ${item.name}
          <span class="car-owner-details__distance-text">${item.distance}</span>
        </h6>
        <small>route: <strong>${item.start_from} to ${item.destination}</strong></small>
        <br />
        <small>car: <strong>${item.car_model}</strong></small>
        <small>seats available: <strong>${item.seats_available}</strong></small>
      </div>
      <span class="car-owner-details__rating">4.5</span>
    </div>
  </div>`;
    })
    .join("");
  cachedElements("car-owners-list").innerHTML = elements;
};

const onLogoutUser = () => {
  localStorage.clear();
  window.location.href = window.location.origin;
};

const onSearchTextChange = () => {
  const startFromValue = cachedElements("start-form").value;
  const destinationValue = cachedElements("destination").value;
  debounce(() => {
    onSearchCarOwners(startFromValue, destinationValue);
  }, 600);
};

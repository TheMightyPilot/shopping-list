function getStoredLists() {
  return JSON.parse(localStorage.getItem("shopping_lists"));
}

function saveLists(shoppingLists) {
  localStorage.setItem("shopping_lists", JSON.stringify(shoppingLists));
}

function randomId() {
  return 'ID_' + Math.random().toString(36).substr(2, 9);
}

function createPaper(listId, listObj) {
  const paperE = document.createElement("div");
  paperE.className = "paper";

  const titleE = document.createElement("input");
  titleE.setAttribute("onInput", "onFieldChange(event)");
  titleE.placeholder = "Click to title!";
  titleE.name = "title";
  titleE.value = listObj.title;
  titleE.dataset.listId = listId;

  const listE = document.createElement("ul");
  listE.className = "list";

  listObj.items.forEach(function (item) {
    const listItemE = document.createElement("li");

    listItemE.className = "item";
    listItemE.textContent = item;
    listItemE.setAttribute("onClick", "markDone(event)");

    listE.appendChild(listItemE);
  });

  const inputE = document.createElement("input");
  inputE.setAttribute("onChange", "onFieldChange(event)");
  inputE.placeholder = "Click to add Item!";
  inputE.name = "newitem";
  inputE.dataset.listId = listId;

  const helpTextE = document.createElement("p");
  helpTextE.innerText = "Press ENTER to add item to list";
  helpTextE.className = "helptext";

  const trashE = document.createElement("button");
  trashE.setAttribute("onClick", "deleteList('" + listId + "')");
  trashE.innerHTML = "<img alt=\"trash icon\" src=\"./images/trash.svg\"></img>";
  trashE.className = "trash";

  paperE.appendChild(titleE);
  paperE.appendChild(listE);
  paperE.appendChild(inputE);
  paperE.appendChild(helpTextE);
  paperE.appendChild(trashE);

  return paperE;
}

function loadData(shoppingLists) {
  document.getElementById("tray").innerHTML = "";

  if (shoppingLists) {
    for (const property in shoppingLists) {
      if (shoppingLists.hasOwnProperty(property)) {
        const paper = createPaper(property, shoppingLists[property]);
        document.getElementById("tray").appendChild(paper);
      }
    }
  }
}

function createBlankList() {
  let shoppingLists = getStoredLists();
  if (!shoppingLists) {
    shoppingLists = {};
  }
  const randId = randomId();
  shoppingLists[randId] = {
    title: "",
    items: []
  };
  saveLists(shoppingLists);
  loadData(getStoredLists());
}

function filterList(event) {
  const shoppingLists = getStoredLists();
  const value = event.target.value;
  const newList = {};

  for (const property in shoppingLists) {
    if (shoppingLists.hasOwnProperty(property)) {
      const current = shoppingLists[property];
      const lowerCaseTitle = current.title.toLowerCase();

      if (lowerCaseTitle.includes(value.toLowerCase())) {
        newList[property] = current;
      }
    }
  }

  loadData(value.length > 0 ? newList : shoppingLists);
}

loadData(getStoredLists());
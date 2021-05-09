function onFieldChange(event) {
  const value = event.target.value;
  const listId = event.target.dataset.listId;
  const name = event.target.name;

  const shoppingLists = getStoredLists();

  if (name === "title") {
    shoppingLists[listId].title = value;
  } else {
    shoppingLists[listId].items.push(value);
  }

  saveLists(shoppingLists);

  if (name === "newitem") { loadData(getStoredLists()); }
}

function deleteList(listId) {
  const shoppingLists = getStoredLists();

  delete shoppingLists[listId];

  saveLists(shoppingLists);
  loadData(getStoredLists());
}

function markDone(event) {
  event.target.classList.add("strikeoff");
}
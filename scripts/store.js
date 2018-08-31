const store = (function() {
  const state = {
    items: [],
    displayAddBookmarkForm: false,
    displayRatingFilterMenu: false,
    ratingsFilterLevel: 0
  };

  // {
  //   "id": "8sdfbvbs65sd",
  //   "title": "Google",
  //   "url": "http://google.com",
  //   "desc": "An indie search engine startup",
  //   "rating": 4
  // }
  const addItem = function(bookmarkObj) {
    state.items.unshift(Object.assign(
      bookmarkObj, 
      {expanded: false}
    ));
  };

  const findById = function(id) {
    return state.items.find(((item) => item.id === id));
  };

  const findAndDelete = function(id) {
    const itemIndex = state.items.findIndex(((item) => item.id === id));
    state.items.splice(itemIndex, 1);
  }

  const populateStore = function() {
    // api.MOCK_DATA.forEach((item) => store.addItem(item));
    // list.render();
    api.fetchItems((items) => {
      items.forEach((item) => {
        store.addItem(item);
      });
      list.render();
    });
  };

  const toggleItemIsExpanded = function(item) {
    item.expanded = !item.expanded;
  };

  const toggleAddBookmarkForm = function() {
    state.displayAddBookmarkForm = !state.displayAddBookmarkForm;
  };

  const toggleRatingsFilterMenu = function() {
    state.displayRatingFilterMenu = !state.displayRatingFilterMenu;
  };

  const shouldDisplayAddForm = function() {
    return state.displayAddBookmarkForm === true;
  }

  const shouldDisplayFilterMenu = function() {
    return state.displayRatingFilterMenu === true;
  };

  return {
    state,
    toggleItemIsExpanded,
    populateStore,
    findById,
    findAndDelete,
    toggleAddBookmarkForm,
    toggleRatingsFilterMenu,
    shouldDisplayAddForm,
    shouldDisplayFilterMenu,
    addItem
  };
}());
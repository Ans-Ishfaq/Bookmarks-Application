const form = document.querySelector('form');
const siteName = document.querySelector('#siteName');
const siteUrl = document.querySelector('#siteUrl');
const bookmarkResult = document.querySelector('#bookmarksResults');
function showData() {
  let comingResult = localStorage.getItem('bookmarks');
  if (comingResult) {
    bookmarksResults.innerHTML = '';
    let parseData = JSON.parse(comingResult);

    for (const child of parseData) {
      const { id, name, url } = child;
      bookmarksResults.innerHTML +=
        `
        <div class="well">
          <h3>
            ${name}
            <a class="btn btn-default" target="_blank"  href="` +
        `${url}` +
        `">Visit</a>
            <a class="btn btn-primary" href="#" onclick="editBookmark(` +
        `'${id}'` +
        `)">Edit</a>
            <a class="btn btn-danger" href="#" onclick="removeBookmark(` +
        `'${id}'` +
        `)">Delete</a>
          </h3>
        </div>
      `;
    }
    console.log(parseData);
  }
}

form.addEventList
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const bookmarkObj = {
      id: uuidv4(),
      name: siteName.value,
      url: siteUrl.value,
    };
  
    let records = localStorage.getItem('bookmarks');
  
    if (records) {
      const bookmarkList = JSON.parse(records);
      bookmarkList.push(bookmarkObj);
      const stringData = JSON.stringify(bookmarkList);
      localStorage.setItem('bookmarks', stringData);
    } else {
      const bookmarkList = [];
      bookmarkList.push(bookmarkObj);
      const stringData = JSON.stringify(bookmarkList);
      localStorage.setItem('bookmarks', stringData);
    }
    showData();
    this.reset();
  });
  showData();
  function removeBookmark(id) {
    let comingResult = localStorage.getItem('bookmarks');
    let bookmarkList = JSON.parse(comingResult);
     
     bookmarkList = bookmarkList.filter(mark => mark.id !== id);
  
  
    const stringData = JSON.stringify(bookmarkList);
    localStorage.setItem('bookmarks', stringData);
    showData()
  }
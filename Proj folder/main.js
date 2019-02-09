const API = "W6tcq1ioatV45JGw1YH7UY7cxUloTQy9";
const url = "5";
const submitButton = document.getElementById("button");

const search = document.getElementById("search");
const box = document.getElementById("box");
// const contain = document.getElementById("container");


async function getGiphyJson(searchVal) {
  const val = await fetch(`http://api.giphy.com/v1/gifs/search?q=${searchVal}&api_key=W6tcq1ioatV45JGw1YH7UY7cxUloTQy9&limit=6`);

  const { data } = await val.json();
  const imageUrls = data.map(val => val.images.original.url);
  console.log(data);
  return imageUrls;
}

function buttonClick() {
  submitButton.addEventListener('click', async (e) => {
    
    try {
      e.preventDefault();
      box.innerHTML = `<img src="./spinner.gif" width="300" height="300" class="spinner">`;
      const searchVal = search.value;
      const val = await getGiphyJson(searchVal);
      const markup = val.map(url => `
      <div class="image-holder mb-4">
          <img src=${url} width="300" height="300" >
      </div>
      `).join('');

      box.innerHTML = markup;
    } catch (error) {
      box.innerHTML = `<h3 class="text-white">Err... Please try again </h3>`
    } finally {
      search.value = ""
    }

  });

}

buttonClick();

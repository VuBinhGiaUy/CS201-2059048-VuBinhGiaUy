let news = document.querySelector(".news");

let params = {
  iD: 0,
  start: 0,
  limit: 3,
};
let numArticles = 0;
// on page load get number of articles for pager
if (numArticles == 0) {
  countNumArticles();
}
// Count Articles XMLHttpRequest
function countNumArticles() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.herokuapp.com/products", true);
  xhr.onload = function () {
    if (this.status == 200) {
      numArticles = JSON.parse(this.responseText).length;
      console.log(numArticles);
      getArticles(params);
      outputPager();
    }
  };
  xhr.send();
}

function outputPager() {
  console.log("Pager started");
  console.log(numArticles);
  let numpagerbtns = Math.ceil(numArticles / 4);
  console.log(numpagerbtns);
  let output = "";
  for (var i = 0; i < numpagerbtns; i++) {
    output +=
      '<li class="page-item"><a class="page-link" href="#" data-page="' +
      i +
      '">' +
      (i + 1) +
      "</a></li>";
  }
  let pagerchild = document.querySelector("ul.pagination");
  pagerchild.children[0].insertAdjacentHTML("afterend", output);

  console.log(output);
}

// Get Articles XMLHttpRequest
function getArticles(params) {
  let request = "";
  let count = 0;
  if (params.iD == 0) {
    request = "limit=" + params.limit;
  }
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://fakestoreapi.herokuapp.com/products?" + request,
    true
  );

  xhr.onreadystatechange = function () {
    console.log(this.readyState);
    console.log(this.status);

    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      console.log(response);
      let output = "";
      response.forEach(function (item) {
        if (item.id > params.start && count <= 3) {
          output += "<div class='col-md-4 col-sm-4'>";
          output += "<div class='card' id='card4'>";
          output += "<i><img id='img1' src='" + item.image + "' alt='#' /></i>";
          output += "<br>";
          output += "<h3>" + item.title + "</h3>";
          output += "<br>";
          output += "<br>";
          output += "<p>$" + item.price + "</p>";
          output += "<p>" + item.category + "</p>";
          output += "<button type='button' class='btn btn-dark'>Buy</button>";
          output += " </div>";
          output += "</div>";
          count++;
        }
        count = 0;
      });
      news.innerHTML = output;
      params.start = params.limit;
    }
  };
  xhr.send();
}

let pager = document.querySelector(".pagination");
pager.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.hasAttribute("data-page") == true) {
    console.log(e.target.dataset.page);
    params.limit = e.target.dataset.page * 3 + 3;
    getArticles(params);
    console.log("Day la limit");
    console.log(params.limit);
  }
});



const randomTxt = document.querySelector('#randomTxt');
const randomBtn = document.querySelector('#randomBtn');
const randomAuth = document.querySelector('#randomAuth');
const selectPage = document.querySelector('#selectPage');
const quotes = document.querySelector('#quotes');
const numPage = document.querySelector('#numPage');

let currentPage = 1;
let totalPages = 0;

randomBtn.addEventListener('click', () => {
  fetch('https://dummyjson.com/quotes/random')
      .then(res => res.json())
      .then(data => {
        randomTxt.textContent = data.quote;
        randomAuth.textContent = `by ${data.author}`;
      });
});

function loadQuotes() {
    const perPage = parseInt(selectPage.value);
    const skip = (currentPage - 1) * perPage;
    fetch(`https://dummyjson.com/quotes?limit=${perPage}&skip=${skip}`)
        .then(res => res.json())
        .then(data =>{
            total = data.total;
            showQuotes(data.quotes);
            showPages();
        });
}

function showQuotes(quotesBox) {
    quotes.innerHTML = quotesBox.map(q=> `
        <div class="p-4 border-2 rounded-md ">
            <p class="text-lg font-light">${q.quote}</p>
            <p class="text-lg font-light">by ${q.author}</p>
        </div>
    `).join('');
}

function showPages(){
    const perPage = parseInt(selectPage.value);
    const totalPages = Math.ceil(total / perPage);
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    numPage.innerHTML = '';

    if(startPage < 1){
        endPage += 1 - startPage;
        startPage = 1;
    }
    if(endPage > totalPages){
        endPage = totalPages;
    }

    if(startPage > 1){
        const firstBtn =  createPageButton('«', 1);
        numPage.appendChild(firstBtn);
    }
    for(let i = startPage; i <= endPage; i++){
        const btn = createPageButton(i, i);
        if(i === currentPage) btn.classList.add('bg-gray-300');
        numPage.appendChild(btn);
    }

    if(endPage < totalPages){
        const lastBtn = createPageButton('»', totalPages);
        numPage.appendChild(lastBtn);
    }

}

function createPageButton(text, page){
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = 'mx-1 px-3 py-2 border rounded';
    btn.addEventListener('click', () => {
        currentPage = page;
        loadQuotes();
    });
    return btn;
}

selectPage.addEventListener('change', ()=>{
    currentPage = 1;
    loadQuotes();
});

loadQuotes();
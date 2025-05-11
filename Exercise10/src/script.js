const pokemonCard = document.querySelector('#pokemonCard');
const pageSelect = document.querySelector('#pages');
const dialog = document.querySelector('#pokemonDialog');
const closeBtn = document.querySelector('#closeDialog');

let currentPage = 1;
let itemPerPage = 50;
let selectedGen = null;
let allGenPokemon = [];

const typeColors = {
    normal: { bg: 'bg-gray-300', shadow: 'rgba(163, 163, 163, 0.7)' },
    fire: { bg: 'bg-red-400', shadow: 'rgba(248, 113, 113, 0.7)' },
    water: { bg: 'bg-blue-400', shadow: 'rgba(96, 165, 250, 0.7)' },
    grass: { bg: 'bg-green-400', shadow: 'rgba(74, 222, 128, 0.7)' },
    electric: { bg: 'bg-yellow-300', shadow: 'rgba(253, 224, 71, 0.7)' },
    ice: { bg: 'bg-blue-200', shadow: 'rgba(191, 219, 254, 0.7)' },
    fighting: { bg: 'bg-red-600', shadow: 'rgba(220, 38, 38, 0.7)' },
    poison: { bg: 'bg-purple-400', shadow: 'rgba(192, 132, 252, 0.7)' },
    ground: { bg: 'bg-yellow-700', shadow: 'rgba(161, 98, 7, 0.7)' },
    flying: { bg: 'bg-indigo-300', shadow: 'rgba(165, 180, 252, 0.7)' },
    psychic: { bg: 'bg-pink-400', shadow: 'rgba(244, 114, 182, 0.7)' },
    bug: { bg: 'bg-lime-400', shadow: 'rgba(163, 230, 53, 0.7)' },
    rock: { bg: 'bg-yellow-800', shadow: 'rgba(133, 77, 14, 0.7)' },
    ghost: { bg: 'bg-purple-700', shadow: 'rgba(126, 34, 206, 0.7)' },
    dragon: { bg: 'bg-indigo-700', shadow: 'rgba(67, 56, 202, 0.7)' },
    dark: { bg: 'bg-gray-800 text-white', shadow: 'rgba(31, 41, 55, 0.7)' },
    steel: { bg: 'bg-gray-400', shadow: 'rgba(156, 163, 175, 0.7)' },
    fairy: { bg: 'bg-pink-200', shadow: 'rgba(251, 207, 232, 0.7)' }
};

document.querySelectorAll('.gen-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.gen-btn').forEach(b => {
            b.classList.remove('border-blue-600');
            b.classList.add('border-transparent');
        });
        btn.classList.remove('border-transparent');
        btn.classList.add('border-blue-600');

        selectedGen = btn.dataset.gen;
        currentPage = 1;
        loadPokemonByGen(selectedGen);
    });
});

pageSelect.addEventListener('change',()=>{
    itemPerPage = pageSelect.value;
    currentPage = 1;
    loadPokemon();
})

function setThemeMode(mode){
    localStorage.setItem('theme',mode);
    console.log('Setting theme to:', mode);

    document.querySelectorAll('.theme-toggle').forEach(btn=>{
        btn.classList.remove('bg-indigo-100', 'dark:bg-indigo-900', 'border-2', 'border-indigo-500');
    })

    const activeBtn = document.getElementById(`theme-toggle-${mode}`);
    activeBtn.classList.add('bg-indigo-100', 'dark:bg-indigo-900', 'border-2', 'border-indigo-500')

    if(mode === 'dark'){
        document.documentElement.classList.add('dark');
    }else if(mode === 'light'){
        document.documentElement.classList.remove('dark');
    }else if(mode === 'system'){
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    }
}

function saveThemeMode(){
    const savedTheme = localStorage.getItem('theme') || 'system';
    setThemeMode(savedTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',(e)=>{
        const currentTheme = localStorage.getItem('theme') || 'system';
        if(currentTheme === 'system'){
            setThemeMode('system');
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-toggle-light').addEventListener('click', () => {
        setThemeMode('light');
    });

    document.getElementById('theme-toggle-dark').addEventListener('click', () => {
        console.log('clicked dark');
        setThemeMode('dark');
    });

    document.getElementById('theme-toggle-system').addEventListener('click', () => {
        setThemeMode('system');
    });

    saveThemeMode();
})

function changePage(total) {
    const navPages = document.querySelector('nav ul');
    navPages.innerHTML = '';

    const pages = Math.ceil(total / itemPerPage);

    const prevLi = document.createElement('li');
    prevLi.innerHTML = `<a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}">Previous</a>`;
    if (currentPage > 1) {
        prevLi.addEventListener('click', () => {
            currentPage--;
            loadPokemon();
        });
    }

    navPages.appendChild(prevLi);

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(total, currentPage + 2);

    if (endPage - startPage < 4) {
        if (startPage === 1) {
            endPage = Math.min(5, total);
        } else if (endPage === total) {
            startPage = Math.max(1, total - 4);
        }
    }


    for(let i = startPage; i <= endPage; i++) {
        const numPage = document.createElement('li');
        numPage.innerHTML = `<a href="#" class="flex items-center justify-center px-4 h-10 ${i === currentPage ?
            'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 ' +
            'hover:text-blue-700' : 'leading-tight text-gray-500 bg-white border border-gray-300 ' +
            'hover:bg-gray-100 hover:text-gray-700'}">${i}</a>`;

        numPage.addEventListener('click',()=>{
            currentPage = i;
            loadPokemon();
        });
        navPages.appendChild(numPage);
    }
    const nextLi = document.createElement('li');
    nextLi.innerHTML = `<a href="#" class="flex items-center justify-center px-4 h-10 
                        leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg 
                        hover:bg-gray-100 hover:text-gray-700 ${currentPage === total? 
                        'cursor-not-allowed opacity-50' : ''}">Next</a>`;
    if (currentPage < total) {
        nextLi.addEventListener('click', () => {
            currentPage++;
            loadPokemon();
        });
    }
    navPages.appendChild(nextLi);

}

function createPokemonCard(pokemonDetails) {
    const primaryType = pokemonDetails.types[0].type.name;
    const bgColor = typeColors[primaryType].bg;
    const shadowColor = typeColors[primaryType].shadow;

    const types = pokemonDetails.types.map(t => `
      <div class="mb-2">
        <span class="inline-block bg-white bg-opacity-20 text-white text-sm sm:text-xl md:text-2xl font-normal px-2 sm:px-3 md:px-5 py-1 sm:py-2 rounded-full">
          ${t.type.name}
        </span>
      </div>
    `).join('');

    const card = document.createElement('div');
    card.className = `h-[250px] sm:h-[300px] md:h-[400px] ${bgColor} rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-lg pl-4 sm:pl-8 md:pl-15 flex justify-between relative overflow-hidden`;
    card.style.transition = "all 0.3s ease";
    card.style.boxShadow = `0 0 20px ${shadowColor}, 0 0 10px ${shadowColor}, 0 0 60px -10px ${shadowColor}`;

    card.addEventListener('mouseenter', () => {
        card.style.transform = "scale(1.01)";
        card.style.boxShadow = `0 0 30px ${shadowColor}, 0 0 20px ${shadowColor}, 0 0 80px -5px ${shadowColor}`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = `0 0 20px ${shadowColor}, 0 0 10px ${shadowColor}, 0 0 60px -10px ${shadowColor}`;
    });

    card.innerHTML = `
      <div class="z-10 pt-4 sm:pt-8 md:pt-15 w-[40%]">
        <h2 class="text-white text-xl sm:text-3xl md:text-5xl font-extrabold mb-2 sm:mb-5 md:mb-10 capitalize">${pokemonDetails.name}</h2>
        <div>${types}</div>
      </div>
      <div class="z-10 w-[50%] flex justify-center items-center">
        <img src="${pokemonDetails.sprites.other['official-artwork'].front_default}" alt="" class="w-full h-auto max-h-[150px] sm:max-h-[200px] md:max-h-[300px] object-contain" />
      </div>
      <p class="absolute top-1 sm:top-2 md:top-3 right-2 sm:right-3 md:right-5 text-white text-2xl sm:text-4xl md:text-6xl font-normal opacity-20">#${pokemonDetails.id.toString().padStart(3, '0')}</p>
      <img class="absolute -bottom-5 sm:-bottom-10 md:-bottom-15 -right-5 sm:-right-10 md:-right-15 opacity-30 w-[100px] sm:w-[200px] md:w-[300px] h-auto" src="../images/pokeball.png" alt="">
    `;

    card.addEventListener('click', () => {
        showPokemonDetails(pokemonDetails);
    });

    return card;
}

function showPokemonDetails(pokemonDetails) {
    const primaryType = pokemonDetails.types[0].type.name;
    const bgColor = typeColors[primaryType].bg;

    const types = pokemonDetails.types.map(t => `
      <div class="mb-2">
        <span class="inline-block bg-white bg-opacity-20 text-white text-md sm:text-2xl font-normal px-3 sm:px-5 py-1 sm:py-2 rounded-full">
          ${t.type.name}
        </span>
      </div>
    `).join('');

    const content = document.querySelector('#content');

    content.innerHTML = `
    <div class="relative z-60 ${bgColor} w-full h-auto overflow-hidden">
        <div class="flex flex-col justify-center items-center text-center py-4">
            <div class="z-10 pt-5 sm:pt-15 w-full sm:w-[40%]">
                <h2 class="text-white text-3xl sm:text-5xl font-extrabold mb-3 sm:mb-10 capitalize">${pokemonDetails.name}</h2>
                <div class="flex justify-center gap-2 mb-20 sm:mb-40">${types}</div>
            </div>
            <div class="z-10 w-[50%] flex justify-center items-center">
            <img src="${pokemonDetails.sprites.other['official-artwork'].front_default}" 
                alt="" 
                class="absolute z-20 top-35 sm:top-65 md:top-55 w-full max-h-[100px] sm:max-h-[150px] md:max-h-[200px] object-contain" />
            </div>
        </div>
        <p class="absolute z-70 top-5 right-5 sm:top-10 sm:right-10 text-white text-4xl sm:text-6xl font-medium opacity-20">#${pokemonDetails.id.toString().padStart(3, '0')}</p>
        <img class="absolute top-30 sm:top-50 -right-10 opacity-30 w-[150px] sm:w-[250px] h-auto" src="../images/pokeball.png" alt="">
        <div class="flex flex-col justify-items-start items-start p-5 sm:p-10 rounded-t-[30px] sm:rounded-[50px] bg-white dark:bg-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <div class="text-lg sm:text-2xl font-bold text-center text-gray-500 border-b border-gray-200 w-full">
                <ul class="flex flex-wrap -mb-px">
                    <li class="me-2" >
                        <a href="#" class="tab-button inline-block p-2 sm:p-4 border-b-2 border-transparent rounded-t-lg hover:text-black hover:border-gray-300 ">About</a>
                    </li>
                    <li class="me-2">
                        <a href="#" class="tab-button inline-block p-2 sm:p-4 border-b-2 border-transparent rounded-t-lg hover:text-black hover:border-gray-300" aria-current="page">Base Stats</a>
                    </li>
                    <li class="me-2">
                        <a href="#" class="tab-button inline-block p-2 sm:p-4 border-b-2 border-transparent rounded-t-lg hover:text-black hover:border-gray-300 ">Evolution</a>
                    </li>
                </ul>
            </div>
            <div class="tab-content w-full sm:w-220 flex flex-col gap-3 sm:gap-6 m-3 sm:m-6 text-lg sm:text-2xl" id="tab-content">
            
            </div>
        </div>
    </div>`;

    setupTabContent(pokemonDetails);
    dialog.showModal();
}

function setupTabContent(pokemonDetails) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContent = document.querySelector('#tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('border-b-blue-600', 'text-black'));
            e.target.classList.add('border-b-blue-600', 'text-black');

            const selectedTab = e.target.textContent.toLowerCase();
            if(selectedTab === 'about') {
                showAboutTab(pokemonDetails, tabContent);
            } else if (selectedTab === 'base stats') {
                showStatsTab(pokemonDetails, tabContent);
            } else if (selectedTab === 'evolution') {
                tabContent.innerHTML = `<div class="text-black">Evolution data not available</div>`;
            }
        });
    });

    tabButtons[0].click();
}

function showAboutTab(pokemonDetails, tabContent) {
    tabContent.innerHTML = `
       <div class="flex flex-col sm:flex-row sm:gap-30">
            <h2 class="text-gray-700 w-24 sm:w-auto">Species</h2>
            <div class="font-bold text-black dark:text-white">${pokemonDetails.types.map(t=> `
                <span>${t.type.name}</span>
            `).join(',')}
            </div>
       </div>
       <div class="flex flex-col sm:flex-row sm:gap-32">
            <h2 class="text-gray-700 w-24 sm:w-auto">Height</h2>
            <div class="font-bold text-black dark:text-white">${pokemonDetails.height}<span>0cm</span></div>
       </div>
       <div class="flex flex-col sm:flex-row sm:gap-32">
            <h2 class="text-gray-700 w-24 sm:w-auto">Weight</h2>
            <div class="font-bold text-black dark:text-white">${pokemonDetails.weight/10} <span>kg</span></div>
       </div>
       <div class="flex flex-col sm:flex-row sm:gap-30">
            <h2 class="text-gray-700 w-24 sm:w-auto">Abilities</h2>
            <div class="font-bold text-black dark:text-white">${pokemonDetails.abilities.map(a=> `
            <span>${a.ability.name}</span>
            `).join(',')}
            </div>
       </div>
    `;
}

function showStatsTab(pokemonDetails, tabContent) {
    let total = 0;
    let statHTML = pokemonDetails.stats.map((s,index) => {
        total += s.base_stat;
        const statName = s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1);
        const barColor = (index === 3 || index === 4) ? 'bg-green-500' : 'bg-red-500';

        return `
        <div class="flex1 flex justify-between text-center items-center mb-4 pb-2 ">
            <h2 class="font-normal text-gray-800">${statName}</h2>
            <div class="flex justify-center items-center gap-8">
                <div class="font-bold text-black">${s.base_stat}</div>
                <div class="w-50 bg-gray-200 rounded-full h-1.5 md:w-100 lg:w-150">
                        <div class="${barColor} h-1.5 rounded-full" style="width: ${s.base_stat}%;"></div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    statHTML += `
        <div class="flex1 flex justify-between text-center items-center">
            <h2 class="font-normal text-gray-800">Total</h2>
            <div class="flex justify-center items-center gap-8">
                    <div class="font-bold text-black">${total}</div>
                    <div class="w-50 md:w-100 lg:w-150 bg-gray-200 rounded-full h-1.5">
                        <div class="bg-green-500 h-1.5 rounded-full" style="width: ${total/6}%;"></div>
                    </div>
                </div>
        </div>
    `;

    tabContent.innerHTML = `<div>${statHTML}</div>`;
}


async function loadPokemon() {
    if (selectedGen) {
        renderGenPage();
        return;
    }

    pokemonCard.innerHTML = '';

    const offset = (currentPage - 1) * itemPerPage;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemPerPage}&offset=${offset}`);
    const data = await response.json();

    changePage(data.count);

    for(let i = 0; i < data.results.length; i++) {
        const pokemon = data.results[i];
        const details = await fetch(pokemon.url)
        const pokemonDetails = await details.json();

        const card = createPokemonCard(pokemonDetails);
        pokemonCard.appendChild(card);
    }
}

async function loadPokemonByGen(gen) {
    pokemonCard.innerHTML = '';
    allGenPokemon = [];

    const response = await fetch(`https://pokeapi.co/api/v2/generation/${gen}/`);
    const data = await response.json();

    const pokemonSpecies = data.pokemon_species;

    allGenPokemon = pokemonSpecies.map(p => p.name);

    changePage(allGenPokemon.length);
    renderGenPage();
}
async function renderGenPage() {
    pokemonCard.innerHTML = '';

    const offset = (currentPage - 1) * itemPerPage;
    const currentPokemon = allGenPokemon.slice(offset, offset + itemPerPage);

    for (const name of currentPokemon) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonDetails = await res.json();

        const card = createPokemonCard(pokemonDetails);
        pokemonCard.appendChild(card);
    }
}


loadPokemon()

closeBtn.addEventListener('click', () => {
    dialog.close();
});

dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );

    if (!isInDialog) {
        dialog.close();
    }
});

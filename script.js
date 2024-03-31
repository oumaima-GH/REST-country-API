const url = `https://restcountries.com/v3.1/all`
const countries = document.querySelector('.countries')
const search = document.querySelector('.search')
const nameOfCountry = document.querySelectorAll('.name')
const toggleButton = document.querySelector('.dropdown')
const continentsDropdown = document.querySelector('.continents')
const region = document.querySelectorAll('.region') 
// const regionName = document.querySelectorAll('.regionName') 
const regionName = document.getElementsByClassName('regionName')
const mode = document.querySelector('.mode')
const darkMode = document.querySelector('.dark')

const getCountry = async () =>{
    try{
        const response = await fetch(url)
        const res = await response.json()
        console.log(res);

        const sortedCountriesData = res.sort((a, b) => {
            const nameA = a.name.common
            const nameB = b.name.common
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        console.log(sortedCountriesData);
            sortedCountriesData.map(countryData => {
                displayCountry(countryData);
            });
    }catch(err){console.log("Error fetching data: ", err);}
   
}

getCountry()

const displayCountry = (data) =>{
    const countryName = document.createElement('div')
    countryName.classList.add('country')
    countryName.innerHTML = `
    <div class="flag">
    <img src="${data.flags.png}" alt="flag" />
  </div>

  <div class="info">
    <h5 class='name'>${data.name.common}</h5>
    <p><strong>Population: </strong>${data.population}</p>
    <p class='regionName'><strong>Region: </strong>${data.region}</p>
    <p><strong>Capital: </strong>${data.capital}</p>
  </div>
    `

    countries.append(countryName)
}


search.addEventListener('input', () => {

    setTimeout(() => {

        const searchTerm = search.value.toLowerCase()
        document.querySelectorAll('.name').forEach(nameElement => {
        
            const countryElement = nameElement.closest('.country')
            if (nameElement.textContent.toLowerCase().includes(searchTerm.trim())) {
                countryElement.style.display = 'grid'
            } else {
                countryElement.style.display = 'none'
            }
        })

    }, 1300)
   
})



toggleButton.addEventListener('click', () => {
    continentsDropdown.classList.toggle('show-hide')
})


region.forEach(elem => {
    elem.addEventListener('click', () => {
        console.log(elem);
        Array.from(regionName).forEach(ele => {
            if(ele.innerText.includes(elem.innerText) || elem.innerText === 'All'){
                ele.parentElement.parentElement.style.display='grid'
            }else{
                ele.parentElement.parentElement.style.display='none'

            }
        })
    })
})


mode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    darkMode.classList.toggle('fas')
})

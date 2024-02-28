const loadPhone = async(searchText,isShow)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayPhones(phones,isShow)
}

const displayPhones = (phones,isShow) =>{
  const cardContainer = document.getElementById('card-container')
   cardContainer.textContent = '';
   const showALL = document.getElementById('showAll-products')
   if(phones.length > 12 && !isShow){
    showALL.classList.remove('hidden')
   } else{
    showALL.classList.add('hidden')
   }
  //  console.log('is all',isShow)
   if(!isShow){
    phones = phones.slice(0,12)
   } 

    phones.forEach(phone => {
        
        // console.log(phone)
       
     const newDiv = document.createElement('div');
     newDiv.classList = 'card  bg-base-100 shadow-xl '
     newDiv.innerHTML = `
     <figure><img src="${phone.image}" alt="phone" /></figure>
     <div class="card-body">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-center">
         <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Details</button>
       </div>
     </div>
     
     `;
     cardContainer.appendChild(newDiv)
    });
    toggleLoading(false)
}
const showDetails=async (id) =>{

const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data =await res.json()
console.log(data)
const phone =data.data;
showDetailsOfPhone(phone)
}

const showDetailsOfPhone =(phone)=>{
  // console.log(phone)
const phoneName =document.getElementById('phone-name')
phoneName.innerText = phone.brand
const content = document.getElementById('show-modal-content');
content.innerHTML = `
  <img src="${phone.image}" alt="phone"/>
  <p><span>${phone.name  }</span></p>
  <p><span>GPS :${phone?.others?.GPS ||'NO GPS available'  }</span></p>
  <p><span>Storage :${phone?.mainFeatures?.storage || 'NO storage available' }</span></p>

`


show_details_madal.showModal()
}
const handleSearch = (isShow) =>{
  toggleLoading(true)
const inputSearch = document.getElementById('input-search').value ;
loadPhone(inputSearch,isShow)
}

const toggleLoading = (isLoading)=>{
  const loading = document.getElementById('loader')
  if(isLoading){
    loading.classList.remove('hidden')
  } else{
    loading.classList.add('hidden')
  }
}



const showAll = () =>{
  handleSearch(true)
}
// loadPhone()
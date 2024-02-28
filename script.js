const loadPhone = async(searchText,isShowall) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones,isShowall)
}

const displayPhone = (phones,isShowall) =>{

const phoneContainer = document.getElementById("phone-container");
// clear the old search before search
console.log(phones.length)
const showall = document.getElementById('showAll-container')
if (phones.length > 10 && !isShowall){
    showall.classList.remove('hidden')
} else{
    showall.classList.add('hidden')
}
console.log('is show all',isShowall)
if(!isShowall){
    phones = phones.slice(0,10)
}
phoneContainer.textContent =''
phones.forEach(phone => {
    
    // console.log(phone)
    // 2 crea a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card card-compact p-4 bg-base-100 shadow-xl`;
    // 3 creat a inner Html
    phoneCard.innerHTML =`
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
     <h2 class="card-title">${phone.phone_name}</h2>
     <h3 class="brand">${phone.brand}</h3>
     <p>${phone.slug}</p>
     <div class="card-actions justify-center">
     <button onclick="showDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
     </div>
    </div>
    `
    // 4 append child
    phoneContainer.appendChild(phoneCard)
});
toggleLoading(false)
}

const showDetail = async(id) =>{
    console.log('fffffffffff',id)
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    console.log(data)
 const phone = data.data
    showPHoneDeatails(phone)
  
}
const showPHoneDeatails= (phone)=>{
    console.log(phone)
    my_modal_5.showModal()
// const phoneName = document.getElementById('phone-name')
// phoneName.innerText = phone.name
const detailsOFPhone = document.getElementById('show-detail-container')
detailsOFPhone.innerHTML = `
    <img src="${phone.image}" alt=""/> 
    <h2>${phone.name}</h2> 
     <h3>Storage :${phone?.mainFeatures?.storage}</h3>
     <h3>WLAN : ${phone?.others?.WLAN || 'NO WLAN available'}</h3>
`

}
// handel search button
// const handleSearch=(isShowall)=>{
//     const searchFeild = document.getElementById('search-feild');
//     const searchText = searchFeild.value;
//     console.log(searchText)
//     loadPhone(searchText,isShowall)
// }
const handleSearch2=(isShowall)=>{
    toggleLoading (true)
    const searchFeild2 = document.getElementById('search-feild2')
    const searchText2 = searchFeild2.value;
    loadPhone(searchText2,isShowall)
    
}

const toggleLoading = (isLoading) =>{
    const Loader = document.getElementById('loading')
    if(isLoading){
        Loader.classList.remove('hidden')
    } else{
        Loader.classList.add('hidden')
    }
} 

const showAll= () =>{
    handleSearch2(true)
}
// loadPhone()
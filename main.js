let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood ='create';
let temp;
//get total


function getTotal(){
if(price.value!=''&&taxes.value!=''&&ads.value!=''){

let result=(+price.value+ +taxes.value + +ads.value ) - +discount.value;
total.innerHTML=result;
total.style.background='#040';
}
else {
    total.innerHTML = '';
    total.style.background='#a00d02';
}
}
//create product

let datapro;

if(localStorage.product!=null)
{


    datapro=JSON.parse(localStorage.product)
    //console.log(localStorage.product);
}

else{
    datapro=[];
}
submit.onclick=function()
{
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }
    if(title.value!=''&&price.value!=''&&category.value!=''&&newpro.count<100){
    if(mood==='create'){
    if(newpro.count>1)
    {
        for(let i=0;i<newpro.count;i++)
        {
            datapro.push(newpro);

        }
    }
    else
{    datapro.push(newpro);

} 
   }
else{
    datapro[temp]=newpro;
    mood='create';
    submit.innerHTML="Create";
    count.style.display="block"
}
clearData()


}
localStorage.setItem('product', JSON.stringify(datapro))
readData()
}



//clear inputs
function clearData()
{
        

    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

//read

function readData()
{let table='';
getTotal();
    for(let i=0 ; i<datapro.length; i++){
      table+=`
       <tr>     
        <td>${i+1}</td> 
      <td>${datapro[i].title}</td> 
      <td>${datapro[i].price}</td> 
      <td>${datapro[i].taxes}</td> 
      <td>${datapro[i].ads}</td> 
      <td>${datapro[i].discount}</td> 
      <td>${datapro[i].total}</td> 
      <td>${datapro[i].category}</td> 
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="DeleteDate(  ${i})" id="delete">delete</button></td>
      </tr>
                    
      
      
      `

    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteAll');
if(datapro.length>0)
{
    btndelete.innerHTML=`
          <button onclick="deleteAll()">delete All (${datapro.length})</button>

    `
}else {
    btndelete.innerHTML='';
}
}
readData()

//count
//delete  update

function DeleteDate(i){
datapro.splice(i,1);

localStorage.product=JSON.stringify(datapro);
readData();
}
function deleteAll()
{
    localStorage.clear();
    datapro.splice(0);
    readData()
}
function updateData(i)
{
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    ads.value=datapro[i].ads;
    taxes.value=datapro[i].taxes;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    getTotal();
    count.style.display="none";
    submit.innerHTML="Update";
    mood ='Update';
temp =i;
scroll(

    {
        top:0,
        behavior:"smooth",
    }
)
}


//search
let searchMood='title';
function getSearchMood(id)
{

    let search=document.getElementById('search');

if(id=='searchTitle')
{
    searchMood='title ';
}
else{
    searchMood='category';

}
search.placeholder='search By '+searchMood;

search.focus();
search.value='';
readData();
}
function searchData(value)
{
    let table='';
    for(let i=0;i<datapro.length;i++)
{

    if(searchMood=='category')
    {
            if(datapro[i].category.includes(value.toLowerCase()))
            {
                table+=`
       <tr>     
        <td>${i}</td> 
      <td>${datapro[i].title}</td> 
      <td>${datapro[i].price}</td> 
      <td>${datapro[i].taxes}</td> 
      <td>${datapro[i].ads}</td> 
      <td>${datapro[i].discount}</td> 
      <td>${datapro[i].total}</td> 
      <td>${datapro[i].category}</td> 
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="DeleteDate(  ${i})" id="delete">delete</button></td>
      </tr>
                    
      

      `;
            }

    }

    
    else{
            
                if(datapro[i].title.includes(value.toLowerCase()))
                {
                    table+=`
           <tr>     
            <td>${i}</td> 
          <td>${datapro[i].title}</td> 
          <td>${datapro[i].price}</td> 
          <td>${datapro[i].taxes}</td> 
          <td>${datapro[i].ads}</td> 
          <td>${datapro[i].discount}</td> 
          <td>${datapro[i].total}</td> 
          <td>${datapro[i].category}</td> 
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="DeleteDate(  ${i})" id="delete">delete</button></td>
          </tr>
                        
          
          
          `
                }
    
         }
    }
    document.getElementById('tbody').innerHTML=table;

}
//clean data


const StyleSwitchToggler=document.querySelector(".style-Switcher-toggler");
StyleSwitchToggler.addEventListener("click",()=>{
    document.querySelector(".style-Switcher").classList.toggle("open");
})
window.addEventListener("scroll",()=>{
    if(document.querySelector(".style-Switcher").classList.contains("open")){
        document.querySelector(".style-Switcher").classList.remove("open");
    }
})

const AlternateStyles=document.querySelectorAll(".alternate-style");
function setActiveStyle(color){
    AlternateStyles.forEach((style)=>{
        if(color===style.getAttribute("title")){
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled","true");
        }
    })
}









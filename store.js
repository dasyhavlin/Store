 const currentUser = sessionStorage.getItem('currentUser');
 if (!currentUser)
  location.href="login.html";
const addProduct=document.querySelector('#addProduct');
const formInsert=document.querySelector('#formInsert');
const insert=document.querySelector('#insert');
const edit=document.querySelector('#edit');
const inputName=document.querySelector('#name');
const inputPrice=document.querySelector('#price');
const inputQuantity=document.querySelector('#quantity');
const radioButtons = document.querySelectorAll('input[name="category"]');
const ourProducts = document.querySelector('#ourProducts');
ourProducts.style='color:rgb(58 191 25); font-size: 25px; padding-top:50px';
const searchByName=document.querySelector('#searchByName');
const searchByPrice=document.querySelector('#searchByPrice');
const searchByOutOfStock=document.querySelector('#searchByOutOfStock');
const searchByAlsoOutOfStock=document.querySelector('#searchByAlsoOutOfStock');
const searchByCategory=document.querySelector('#searchByCategory');
const inputSearchName=document.querySelector('#inputSearchName');
const inputSearchPrice=document.querySelector('#inputSearchPrice');
const inputSearchPrice2=document.querySelector('#inputSearchPrice2');
const inputSearchByAlsoOutOfStock=document.querySelector('#inputSearchByAlsoOutOfStock');
const categorySearch=document.querySelector('#categorySearch');
const resultSearch=document.querySelector('#resultSearch');
const formUpdate=document.querySelector('#formUpdate');

// const up=document.querySelector('#up');
// const less=document.querySelector('#less');
// const newPrice=document.querySelector('#newPrice');
const inputNewPrice=document.querySelector('#inputNewPrice');
let newProduct =document.createElement('div');
const quantityUpdate=document.querySelector('#quantityUpdate');
const priceUpdate=document.querySelector('#priceUpdate');
const nameUpdate=document.querySelector('#nameUpdate');
const update=document.querySelector('#update');


class Product{
      constructor(numOfProduct)
      {
        this.productName='',
        this.category='',
        this.price=0,
        this.quantity=0,
        this.code = numOfProduct;
      }

      upQuantity()
      {
          this.quantity++;
      }
      lessQuentity()
      {
          this.quantity--;
      }
      updatePrice(sum)
      {
          this.price=sum;
      }
}

class Store{


  constructor()
  {
    this.products=
    [
      {productName:"bread",category:"food",price:5,quantity:0},
      {productName:"milk",category:"food",price:20,quantity:200}
    ] 
    this.numOfProduct=0;
  }
     
  showProducts(item, index)
  {
    s.products.forEach(p=>{
      ourProducts.append(p.productName+" ");
    })  
  }


addProduct (n,c,p,q)  {
      const pr = new Product(this.numOfProduct++);
      pr.productName=n;
      pr.category=c;
      pr.price=p;
      pr.quantity=q;
      this.products.push(pr);
      newProduct=document.createElement('div');
      newProduct.setAttribute('id','newProduct');
      newProduct.innerHTML=pr.productName;
      ourProducts.append(newProduct);
  }

  updateProduct =(type, num) => {
    switch(type) {
      case (0):
        upQuantity();
        break;
      case (1):
        lessQuentity();
        break;
      case (2):
        updatePrice(num);
        break;
      default:
    }
  }  
    

  searchByName(n)
  {
     return this.products.filter(p => p.productName.includes(n));

  } 
  searchByPrice(s,b)
  {
    const l =  this.products.filter(p => p.price >s);
    return l.filter(p1 => p1.price < b);
  }
  searchByOutOfStock()
  {
      return this.products.filter(p => p.quantity==0);
  }
  searchByAlsoOutOfStock(f)
  {
     return this.products.filter(p =>p.quantity<f)
  }

  searchByCategory(searchBy)
  {
     return this.products.filter(p =>p.category == searchBy)
  }
}
  
const s=new Store();
s.showProducts();

var editMe;

let c = " ";

addProduct.onclick=()=>{
  if(currentUser == 0)
  {
    formInsert.style='display: block';
  }else{
    alert("You are authorized to view only.")
  }
  
}

insert.onclick=()=>
{
  if(currentUser == 0)
  {
      formInsert.style.color='green';
      for (const radioButton of radioButtons) 
      {
          if (radioButton.checked) 
          {
              c = radioButton.value;
              break;
          }
      }
      s.addProduct(inputName.value,c,inputPrice.value,inputQuantity.value); 
      formInsert.style='display: none';
  }else{
    alert("You are authorized to view only.")
  }
  }

let editMe2;
ourProducts.onclick=()=>{
  if(currentUser == 0){
    editMe=newProduct.innerHTML;
    editMe2=s.searchByName(newProduct.innerHTML)[0];
    formUpdate.style='display:block';
    nameUpdate.setAttribute('value',newProduct.innerHTML);
    quantityUpdate.setAttribute('value',editMe2.quantity);
    priceUpdate.setAttribute('value',editMe2.price);
  }else{
    alert("You are authorized to view only.")
  }
 
}

update.onclick=()=>{
  if(currentUser == 0){
    editMe2=s.searchByName(newProduct.innerHTML)[0];
    editMe2.productName=nameUpdate.value;
    editMe2.price=priceUpdate.value;
    editMe2.quantity=quantityUpdate.value;
    formUpdate.style='display: none';
    s.searchByName(newProduct.innerHTML)[0]=editMe2;
  }else{
    alert("You are authorized to view only.")
  }
}

searchByName.onclick=()=>{
  resultSearch.innerHTML = '';
  s.searchByName(inputSearchName.value).forEach(p=>{
    resultSearch.append(p.productName);
    resultSearch.append (" || ");
    resultSearch.append(p.category);
    resultSearch.append (" || ");
    resultSearch.append(p.code);
    resultSearch.append (" || ");
  })
}

searchByPrice.onclick=()=>{
  resultSearch.innerHTML = '';
  s.searchByPrice(inputSearchPrice.value,inputSearchPrice2.value).forEach(p=>{
    resultSearch.append(p.productName);
    resultSearch.append (" || ");
    resultSearch.append(p.category);
    resultSearch.append (" || ");
    resultSearch.append(p.code);
    resultSearch.append (" || ");
  })
}
searchByOutOfStock.onclick=()=>{
    resultSearch.innerHTML = '';
  s.searchByOutOfStock().forEach(p=>{
    resultSearch.append(p.productName);
    // resultSearch.append (<br></br>);
    resultSearch.append (" || ");
    resultSearch.append(p.category);
    resultSearch.append (" || ");
    resultSearch.append(p.code);
    resultSearch.append (" || ");
  })
}

searchByAlsoOutOfStock.onclick=()=>{
  resultSearch.innerHTML = '';
  // inputSearchByAlsoOutOfStock.value
  s.searchByAlsoOutOfStock(inputSearchByAlsoOutOfStock.value).forEach(p=>{
    resultSearch.append(p.productName);
    resultSearch.append (" || ");
    resultSearch.append(p.category);
    resultSearch.append (" || ");
    resultSearch.append(p.code);
    resultSearch.append (" || ");
  })
}
let searchBy;
categorySearch.onchange=()=>
    {

        if(categorySearch.selectedIndex === 0) 
        searchBy="byshoesName";
        if(categorySearch.selectedIndex === 1) 
        searchBy="drink";
        if(categorySearch.selectedIndex === 2)
        searchBy="toys";
        if(categorySearch.selectedIndex === 3)
        searchBy="food";
    }


searchByCategory.onclick=()=>{
  resultSearch.innerHTML = '';
  s.searchByCategory(searchBy).forEach(p=>{
    resultSearch.append(p.productName);
    resultSearch.append (" || ");
    resultSearch.append(p.category);
    resultSearch.append (" || ");
 
  })
}


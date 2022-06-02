import { categories } from 'categories.js';
class Product{

    static numOfProduct=0;
    
    constructor()
      {
        this.productName='',
        this.category='',
        this.price=0,
        this.quantity=0,
        this.id=numOfProduct++;

      }
      constructor(n, c, p, q)
      {
        this.productName=n;
        this.category=c;
        this.price=p;
        this.quantity=q;
        this.id=numOfProduct++;
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
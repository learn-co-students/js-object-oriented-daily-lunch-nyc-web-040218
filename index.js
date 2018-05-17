// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let neighborhoodId = 0;

class Customer {
  constructor(name, neighborhoodId){
    this.neighborhoodId = neighborhoodId;
    this.name = name;
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter( (delivery) => {
      return delivery.customerId == this.id
    });
  }

  meals(){
    let result = [];
    store.deliveries.forEach( (delivery) => {
      if (delivery.customerId == this.id){
        let a = delivery.mealId

        result.push(store.meals.find(meal => {
          return a == meal.id
        }))
      }

    });
    return result;
  }

  totalSpent(){
    const mealHolder = this.meals()
    let holder = mealHolder.map(meal => {return meal.price})
    console.log(holder);
    return holder.reduce((accumulator, currentValue) => accumulator + currentValue)
  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId
    store.meals.push(this)

  }
  deliveries(){
    return store.deliveries.filter( (delivery) => {
      return delivery.mealId == this.id
    });
  }
  customers(){
    let result = [];
    store.deliveries.forEach( (delivery) => {
      if (delivery.mealId == this.id){
        let a = delivery.customerId
        result.push(store.customers.find(customer => {
          return a == customer.id
        }))
      }

    });
    return result;
  }
  static byPrice(){
    let mealArr = store.meals.slice()
    let a = mealArr.sort(function(a,b){
      return b.price - a.price
    })
    return a
  }
}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.neighborhoodId = neighborhoodId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.id = ++deliveryId
    store.deliveries.push(this)

  }
  meal(){
    return store.meals.find( meal => {
      return (meal.id == this.mealId);
    });
  }

  customer(){
    return store.customers.find( customer => {
      return (customer.id == this.customerId);
    });
  }

  neighborhood(){
    return store.neighborhoods.find( neighborhood => {
      return (neighborhood.id == this.neighborhoodId);
    });
  }
}

class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)

  }

  deliveries(){
    return store.deliveries.filter( (delivery) => {
      return delivery.neighborhoodId == this.id
    });

  }

  customers(){
    return store.customers.filter( (customer) => {
      return customer.neighborhoodId == this.id
    });
  }
  meals(){
    let result = new Set()
    store.deliveries.forEach( (delivery) => {
      if (delivery.neighborhoodId == this.id){
        let a = delivery.mealId

        result.add(store.meals.find(meal => {
          return a == meal.id
        }))
      }

    });
    return result;
  }
}

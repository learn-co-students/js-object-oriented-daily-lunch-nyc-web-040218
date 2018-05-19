// global datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

let neighborhoodId = 0;
let deliveryId = 0;
let customerId = 0;
let mealId = 0;


class Neighborhood {

  constructor(name){
    this.name = name,
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  };

  deliveries() {
    var result = store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
    return result
  };

  customers() {
    var result = store.customers.filter(customer => customer.neighborhoodId === this.id)
    return result
  }

  meals(){
    const allNeighborMeals = this.deliveries().map((delivery)=>{return delivery.meal()})

    const mealIdTracker = {}
    const uniqMeals =[]

    for (let i = 0; i < allNeighborMeals.length; i++) {
      const meal = allNeighborMeals[i];
      if (!mealIdTracker.hasOwnProperty(meal.id)) {
        uniqMeals.push(meal)
        mealIdTracker[meal.id] = true
      }
    };
    return uniqMeals
  }
};

class Customer {

  constructor(name, neighborhoodId){
    this.name = name,
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => this.id === delivery.customerId)
  }

  meals() {
    return this.deliveries().map(delivery =>{
      return delivery.meal()
    });
  }

  totalSpent() {
    return this.meals().reduce((accumulator, meal)=>{
      return accumulator + meal.price;
    },0)
  }
};

class Meal {

  constructor(title, price) {
    this.title = title,
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers(){
    return this.deliveries().map((delivery)=>{
      return delivery.customer()
    });
  }

  static byPrice(){
    return store.meals.sort((meal, meal2)=>{
      return meal2.price - meal.price
    })
  }

};

class Delivery {

  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId,
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => this.mealId === meal.id)
  }

  customer() {
    return store.customers.find(customer => this.customerId === customer.id)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => this.neighborhoodId === neighborhood.id)
  }
};

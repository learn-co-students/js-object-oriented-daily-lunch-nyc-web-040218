// global datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

let neighborhoodId = 0;
class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(deliveries => {
      return deliveries.neighborhoodId === this.id
    })
  }
  customers() {
    return store.customers.filter(customers => {
      return customers.neighborhoodId === this.id
    })
  }

  meals() {
    let arr = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    return [...new Set(arr)]
  }
}

let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(deliveries => {
      return deliveries.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }

}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(deliveries => {
      return deliveries.mealId === this.id
    })
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  customers() {
    const customers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(customers)];
  }

  static byPrice() {
    return store.meals.sort((a, b) => a.price < b.price);
  }
};



let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this);
  }

  meal() {
    const meal = store.meals.find(meal => meal.id === this.mealId)
    return meal
    // this
    // return store.deliveries.find(delivery => {
    //   debugger
    //   return delivery.id === this.id
    // })
  }

  customer() {
    const customer = store.customers.find(customer => customer.id === this.customerId)
    return customer
  }
  neighborhood() {
    const neighborhood = store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
    return neighborhood
  }
}

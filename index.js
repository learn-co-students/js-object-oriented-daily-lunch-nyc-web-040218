// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let userId = 0

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++userId
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.neighborhoodId === this.id
    }.bind(this))
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals() {
    let meals = this.deliveries().map(function (delivery) {
      return delivery.meal()
    })

    return meals.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    })
  }

}

let customerId = 0

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function (delivery){
      return delivery.customerId === this.id
    }.bind(this))
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())

    // return this.deliveries().map(function(delivery) {
    //   return delivery.meal()
    // })
  }

  totalSpent(){
    return this.meals().reduce(function(acc, meal) {
      return acc + meal.price;
    }, 0)
  }

}

let mealId = 0

class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function (delivery){
      return delivery.mealId === this.id
    }.bind(this))
  }

  customers(){
    let customers = this.deliveries().map(function (delivery) {
      return delivery.customer()
    })

    return customers.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    })
    // return store.customers.filter(function(customer) {
    //   return customerIds.includes(customer.id)
    // })
  }

  static byPrice(){
    return store.meals.sort(function(meal1, meal2) {
      return meal1.price - meal2.price
    }).reverse()

    // return store.meals.sort((meal1, meal2)  => (meal1.price - meal2.price)).reverse()
  }


}
let deliveryId = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId
    }.bind(this))
  }

  customer() {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId
    }.bind(this))
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  // neighborhood() {
  //   return store.neighborhoods.find(function(neighborhood) {
  //     return neighborhood.id === this.neighborhoodId
  //   })
  }
}

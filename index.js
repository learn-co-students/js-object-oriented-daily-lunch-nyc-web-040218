// global datastore
// A meal has many customers
// A delivery belongs to a meal = belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId, mealId, customerId, deliveryId;
neighborhoodId = mealId = customerId = deliveryId = 0



class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
    deliveries() {
      return store.deliveries.filter(function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this))
    }

    customers() {
      return store.customers.filter(customer => {
        return customer.neighborhoodId === this.id
      })
    }
    meals(){
      let allMeals = this.deliveries().map(delivery => delivery.meal())
      return [...new Set(allMeals)]

    }
}
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)

  }
  deliveries(){
    return store.deliveries.filter(delivery=>{
      return delivery.customerId === this.id
    })
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())

  }
  totalSpent(){
    let total = 0
    return this.meals().reduce(function(total, meal){
      return total + meal.price

    }, 0)
  }



}
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)

  }
    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.meal() === this
    })
  }
    customers() {
      debugger;
      let mapped = this.deliveries().map(delivery => delivery.customer())
      return [...new Set(mapped)]

  }
  static byPrice(){
    return store.meals.sort(function(meal1,meal2){
      return meal2.price - meal1.price

    })
  }
}
class Delivery {
  constructor(mealId, neighborhoodId,customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.id = ++deliveryId
    this.customerId = customerId
    store.deliveries.push(this)

  }
  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
  customer(){
    return store.customers.find(customer=> {
      return customer.id === this.customerId
    })
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood=>{
      return neighborhood.id === this.neighborhoodId
    })
  }

}

// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood{
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.neighborhoodId === this.id})
  }
  customers(){
    return store.customers.filter(customer => {return customer.neighborhoodId === this.id})
  }

  // I NEED TO KNOW WHY THIS WORKS AND HOW I COULD HAVE FLATTENED THE ARRAY OF THE ORIGINAL FUNCTION BELOW!!!!!!!!!!!
  meals(){
    let thisNeighborhoodMeals = this.deliveries().map(delivery =>
      delivery.meal()
    )
    return [...new Set(thisNeighborhoodMeals)]

    // return [...]
    // let thisNeighborhoodMeals = store.deliveries.filter(delivery => {return delivery.neighborhood() === this})
    // debugger
    // return thisNeighborhoodMeals
  }


}

let customerId = 0
class Customer{
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }

  meals(){
    let my_meals = this.deliveries().map(delivery => { return delivery.meal()})
    return my_meals
    }

  totalSpent(){
    let totalMoney = 0
    this.meals().forEach(meal => {totalMoney += meal.price})
    return totalMoney
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

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice(){
    let answer = store.meals.sort(function (a, b) {
      return (a.price - b.price) * -1 //or .reverse
    })
    return answer
  }
}
let deliveryId = 0
// {  }
class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(meal => {return meal.id === this.mealId})
  }
  customer(){
    return store.customers.find(customer => {return customer.id === this.customerId})
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => {return neighborhood.id === this.neighborhoodId})
  }
}

  // }
  // let userId = 0
  //
  // class User {
  //   constructor(name){
  //     this.id = ++userId
  //     this.name = name
  //
  //     // insert in the user to the store
  //     store.users.push(this)
  //   }
  // }
  //
  // let itemId = 0
  //
  // class Item {
  //   constructor(name, price, user){
  //     this.id = ++itemId
  //     this.name = name
  //     this.price = price
  //     if(user){
  //       this.userId = user.id
  //     }
  //
  //     // insert in the item to the store
  //     store.items.push(this)
  //   }
  //   setUser(user){
  //     this.userId = user.id
  //   }
  // }
  //
  // let bobby = new User("bobby")
  // let sally = new User("sally")
  // let trousers = new Item('trousers', 24, bobby)
  // let tshirt = new Item('tshirt', 8, bobby)
  // let socks = new Item('socks', 3, sally)

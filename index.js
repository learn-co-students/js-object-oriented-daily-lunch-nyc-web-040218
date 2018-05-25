// global datastore
let store = { 
    neighborhoods: [],
    meals: [],
    customers: [], 
    deliveries: [] 
};

let neighborhoodId = 0;
let customerId = 0;
let deliveryId = 0;
let mealId = 0;

class Neighborhood {    
    constructor(name){
        this.id = ++neighborhoodId;
        this.name = name;
        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter( delivery =>
            delivery.neighborhoodId == this.id
        );
    }

    customers() {
        return store.customers.filter( customer =>
            customer.neighborhoodId == this.id
        );
    }

    meals(){
        return [...new Set (Customer.prototype.meals.call(this))]
    }
}

class Customer {    
    constructor(name, neighborhoodId){
        this.neighborhoodId = neighborhoodId;
        this.id = ++customerId;
        this.name = name;
        store.customers.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery =>
            delivery.customerId === this.id
        );
    }

    meals(){
        let deliveries = this.deliveries();
    
        return deliveries.map(delivery =>
            store.meals.filter(meal =>
                meal.id === delivery.mealId
            )[0]
        );
    }

    totalSpent(){
        let total = 0
        this.meals().map(meal =>
            total += meal.price
        );
        return total;
    }
}

class Meal {    
    constructor(title, price){
        this.id = ++mealId;
        this.title = title;
        this.price = price;
        store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery =>
            delivery.mealId === this.id
        );
    }

    customers(){
        let deliveries = this.deliveries();
    
        return deliveries.map(delivery =>
            store.customers.filter(customer =>
                customer.id === delivery.customerId
            )[0]
        );
    }

    sortByPrice(a,b){
        return b.price - a.price
    }

    static byPrice() {
        return store.meals.sort(Meal.prototype.sortByPrice)
    }
}
class Delivery {    
    constructor(mealId, neighborhoodId, customerId, name){
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        this.name = name;
        store.deliveries.push(this);
    }

    meal(){
        return store.meals.find(meal =>
            meal.id === this.mealId
        );
    }

    customer(){
        return store.customers.find(customer =>
            customer.id === this.customerId
        );
    }

    neighborhood(){
        return store.neighborhoods.find(neighborhood =>
            neighborhood.id === this.neighborhoodId
        );
    }
}
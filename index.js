// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let nighborhoodID = 0;
let customerID = 0;
let deliveryID = 0;
let mealID = 0;

class Neighborhood {
    constructor(name){
        this.id = ++nighborhoodID;
        this.name = name;
        store.neighborhoods.push(this);
    }

    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.neighborhoodId === this.id;
        });
    }

    customers(){
        return store.customers.filter(customer =>{
            return customer.neighborhoodId === this.id;
        })
    }

    meals(){
        let newArr = this.deliveries().map(delivery =>{
            return delivery.meal();
        });
        return [...new Set(newArr)]
    }
}

class Customer {
    constructor(name, neigh_id){
        this.name = name;
        this.neighborhoodId = neigh_id;
        this.id = ++customerID;
        store.customers.push(this);
    }

    deliveries(){
        return store.deliveries.filter(delivery =>{
            return delivery.customerId === this.id;
        });
    }

    meals(){
        return this.deliveries().map(delivery =>{
            return delivery.meal();
        })
    }

    totalSpent(){
        // let total = 0;
        // this.meals().map(meal =>{
        //     total += meal.price;
        // });
        // return total;
        return this.meals().reduce((total, meal) => total + meal.price, 0);
    }
}

class Meal {
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++mealID;
        store.meals.push(this);
    }

    deliveries(){
        return store.deliveries.filter(delivery =>{
            return delivery.mealId === this.id;
        });
    }

    customers(){
        return this.deliveries().map(delivery =>{
            return delivery.customer();
        })
    }

    static byPrice(){
        const meals = store.meals;
        return meals.sort( function(a,b){
            return b.price - a.price
        })
    }
}

class Delivery {
    constructor(meal_id, nigh_id, cust_id){
        this.mealId = meal_id;
        this.neighborhoodId = nigh_id;
        this.customerId = cust_id;
        this.id = ++deliveryID;
        store.deliveries.push(this);
    }

    meal(){
        return store.meals.find(meal => {
            return meal.id === this.mealId;
        });
    }

    customer(){
        return store.customers.find(customer =>{
            return customer.id === this.customerId;
        })
    }

    neighborhood(){
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId;
        })
    }
}
//Create variable to store reference to the database.
let restaurants 

//Export RestaurantsDAO class.
export default class RestaurantsDAO {

    /*-----Async Methods----*/

    //Inject db method. Intialy connect to the database.
    static async injectDB(conn){
        if (restaurants){
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        }catch (e){
            console.error(
                'Unable to establish a collection handle in restaurantsDAO: ${e}',
            )
        }
    }

    //Call method to get a list of all the restaurants.
    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}){
        //Create query variable to store search queries for filters.
        let query
        if (filters){
            if ("name" in filters){
                query = {$text: {$search: filters["name"]}}//search for documents like the text.
            }else if("cuisine" in filters){
                query = {"cusine": {$eq: filters["cuisine"]}}//search for documents = cuisine searched.
            }else if("zipcode" in filters){
                query = {"address.zipcode": {$eq: filters["zipcode"]}}//search for documents = zipcode searched.
            }
        }

        let cursor
        try{
            cursor = await restaurants
            .find(query)
        } catch (e){
            console.error('Unable to find command, ${e}')
            return {restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage*page)

        try{
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants}
        } catch (e){
            console.error(
                'Unable to convert cursor to array or problem counting documents, ${e}'
            )
        } return { restaurantsList: [], totalNumRestaurants: 0}
    }
    
}
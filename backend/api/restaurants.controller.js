import RestaurantsDAO from "../dao/restaurantsDAO.js"

//class RestaurantsController
export default class RestaurantsController{

    //API called through a URL query string to specify parameters.
    
    /*-----Async Methods----*/
    static async apiGetRestaurants(req,res,next){

        //Store query strings in variables to equate to URL query parsed
        const restaurantsPerPage= req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10): 20
        const page = req.query.page ? parseInt(req.query.page,10): 0

        //Check URL string for referenced filters and store them in variabe filters.
        let filters = {}
        if (req.query.cuisine){
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode){
            filters.zipcode = req.query.zipcode
        } else if (req.query.name){
            filters.name = req.query.name
        }

        //Parse filters, page and restaurantsPerPage to return restaurantsList and totalNUmRestaurants
        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
           filters,
           page,
           restaurantsPerPage,
        })

        //Create variable to store responses when API url is called.
        let response  = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(response)//json response with the above information.
    }
}
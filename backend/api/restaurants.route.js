import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

//Create routes for createing, editing and deleting reviews.
router 
    .route("/review")//route url
    .post(ReviewsCtrl.apiPostReview)//Create new review
    .put(ReviewsCtrl.apiUpdateReview)//Edit review
    .delete(ReviewsCtrl.apiDeleteReview)//Delete review

export default router
import ReviewsDAO from "../dao/reviewsDAO.js"

//Create reviews controller class.
export default class ReviewsController{

    /*---------------------------Async Methods-----------------------*/

    //Create review method
    static async apiPostReview(req,res,next){
        try{

            //Get information from the body of the request.
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            //Send details to ReviewsDAO for database processing. 
            const ReviewsResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            )

            res.json({ status: "success"})
        } catch (e){
            res.status(500).json({ error: e.message})
        }
    }

    //Update review method
    static async apiUpdateReview(req, res,next){
        try{

            //Get information from the body of the request.
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            //Send details to ReviewsDAO for database processing. 
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
            )

            var { error } = reviewsResponse
            if (error){
                res.status(400).json({ error })
            }

            //Check for modified documents. 
            if (reviewResponse.modifiedCount === 0){
                throw new Error(
                    "Unable to update review - user may not be original poster",
                )
            }

            res.json ({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    //Delete Review method
    static async apiDeleteReview(req,res,next){
        try{

            //Get information from the body of the request.
            //Non standard...there's better ways to do this.
            //Not include body in the request. 
            const reviewId = req.query.id
            const userId = req.body.user_id
            console.log(reviewId)

            //Send details to ReviewsDAO for database processing.
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )

            res.json({status: "success"})
        } catch (e){
            res.status(500).json({error:e.message})
        }
    }
}
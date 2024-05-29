import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 280, // Twitter's character limit
  },
});

 const Tweet = mongoose.model('Tweet', TweetSchema);
 export default Tweet

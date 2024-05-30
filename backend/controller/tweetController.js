import Tweet from "./../models/tweetSchema.js"

export const newTweet= async (req, res) => {
  const { content } = req.body;

  // Manual validation
  if (!content || content.trim() === '') {
    return res.status(400).json({ errors: [{ msg: 'Content is required' }] });
  }

  if (content.length > 280) {
    return res.status(400).json({ errors: [{ msg: 'Content exceeds 280 characters' }] });
  }

  try {
    const newTweet = new Tweet({
      user: req.user.id,
      content,
    });

    const tweet = await newTweet.save();
    res.json(tweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Update tweet
export const updateTweet = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user.id; // Assuming you have user ID in req.user from authentication middleware

  try {
    let tweet = await Tweet.findById(id);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    if (tweet.user.toString() !== userId) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    tweet.content = content;
    await tweet.save();

    res.status(200).json({ message: 'Tweet updated successfully', tweet });
  } catch (error) {
    console.error('Error in updateTweet controller:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete tweet
export const deleteTweet = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    if (tweet.user.toString() !== userId) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    await tweet.deleteOne();

    res.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTweet controller:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getMyTweet = async()=>{
    const userId = req.user.id
}

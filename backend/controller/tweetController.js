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

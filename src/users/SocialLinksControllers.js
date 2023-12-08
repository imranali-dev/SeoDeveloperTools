const SocialLinks = require("./VidieosModel");
const showVideos = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      if (!videoId) {
        return res.status(404).send('Video ID not provided');
      }
        const socialLinks = await SocialLinks.find({ videoId });
        if (!socialLinks || !socialLinks.length) {
        return res.status(404).send('Earning Media Panel Data Not Found');
      }
        res.status(200).json({ socialLinks });
    } catch (error) {
      console.error('Error Fetching Earning Media Panel Data:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  const AdminVideo = async (req, res) => {
    try {
      const socialLinks = await SocialLinks.find();
  
      if (!socialLinks || socialLinks.length === 0) {
        return res.status(404).json({ message: 'Earning Media Panel Data Not Found' });
      }
  
      let allVideos = [];
  
      socialLinks.forEach(socialLink => {
        const { socialMedia, video } = socialLink;
        const {url } = video;
  
        allVideos.push({
          socialMedia,
          video: {
            videoId: socialLink.videoId ,
            url
            
          }
        });
      });
        res.render("GetAllVideos", { videos: allVideos });
    } catch (error) {
      console.error('Error Fetching Earning Media Panel Data:', error);
      res.status(500).json({ origin: 'Internal Server Error origin', error: error.message });
    }
  };
  
     
const showVideo = async (req, res) => {
    try {
        const socialLinks = await SocialLinks.find();

        if (!socialLinks || !socialLinks.length) {
            return res.status(404).json({ message: 'Earning Media Panel Data Not Found' });
        }

        let allVideos = [];

        socialLinks.forEach(socialMedia => {
            allVideos.push({
                socialMedia: socialMedia.socialMedia,
                video: socialMedia.video
            });
        });
        res.status(200).json(allVideos);
    } catch (error) {
        console.error('Error Fetching Earning Media Panel Data:', error);
        res.status(500).send({ origin: 'Internal Server Error origin', error: error.message });
    }
};
const updateVideoByID = async (req, res) => {
  try {
    const videoId = req.params.videoId; 
    const updatedFields = req.body;

    console.log('Video ID:', videoId);
    console.log('Updated Fields:', updatedFields);

    const video = await SocialLinks.findOne({ videoId });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (updatedFields.socialMedia !== undefined) {
      video.socialMedia = updatedFields.socialMedia;
    }
    // if (updatedFields.title !== undefined) {
    //   video.video.title = updatedFields.title;
    // }
    if (updatedFields.url !== undefined) {
      video.video.url = updatedFields.url;
    }
    // if (updatedFields.description !== undefined) {
    //   video.video.description = updatedFields.description;
    // }

    const updatedVideo = await video.save();

    // console.log('Updated Video:', updatedVideo);

    res.status(200).json({ message: 'Video Updated Successfully', updatedVideo });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
const addVideo = async (req, res) => {
  try {
    const { socialMedia,
      //  videoTitle, 
      videoUrl,
      //  videoDescription, 
       videoId } = req.body;

    if (!videoUrl || !videoId) {
      return res.status(400).json({ message: 'Video URL and videoId are required' });
    }

    const existingVideo = await SocialLinks.findOne({ 'video.url': videoUrl });
    if (existingVideo) {
      return res.status(400).json({ message: 'Video with this link already exists' });
    }

    const newVideo = new SocialLinks({
      videoId,
      socialMedia,
      video: {
        // title: videoTitle,
        url: videoUrl,
        // description: videoDescription,
      },
    });

    const savedVideo = await newVideo.save();

    res.status(200).json({ message: 'Video Successfully Added', id: savedVideo._id });
  } catch (error) {
    console.error('Error adding video:', error);
    if (error.code === 11000) { 
      return res.status(400).json({ message: 'Video with this link already exists' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
};
const deleteVideoByID = async (req, res) => {
  try {
    const { videoId } = req.params; 
    const deletedVideo = await SocialLinks.findOneAndDelete({ videoId });
    
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    res.status(200).json({ message: 'Video Successfully Seleted', deletedVideo });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
    deleteVideoByID,
    showVideos,
    updateVideoByID,
    addVideo,
    showVideo,
    AdminVideo
};

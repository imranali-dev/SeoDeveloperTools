const express = require('express');

const router = express.Router();

const {
  deleteVideo,
  addVideo,
  updateSocialLinks,
  showVideo,
  deleteVideoByID,
  AdminVideo,
  updateVideoByID,
} = require('../src/users/SocialLinksControllers'); 
router.delete('/social-links/deleteVideo/videos/:videoId', deleteVideoByID);
router.get('/social-links/deleteVideo/videos', renderDeleteVideo); 
router.post('/social-links/addVideo/videos', addVideo); 
router.get('/show-videos', AdminVideo);
router.get('/add-video', renderAddVideo); 
// ahemd ya front ka route hai is ko fetch krna hai
router.get('/social-links/videos', showVideo);
router.put('/social-links/updateSocialLinks/videos/:videoId', updateVideoByID); 
router.get('/social-links/updateSocialLinks/videos', renderUpdateSocialLinks);
router.get('/home',HomepageofSocialLinks)
function renderDeleteVideo(req, res) {
  const videoId = '';
  res.render('DeleteVideo', { videoId });
}
function renderAddVideo(req, res) {
  res.render('AddVideo');
}
function renderUpdateSocialLinks(req, res) {
  HomepageofSocialLinks
  res.render('Updatelinks');
}
function HomepageofSocialLinks(req, res) {
  res.render('HomeSo');
}
router.get('/WelcomeEarningVideo',WelcomeEarningVideo)
function WelcomeEarningVideo(req, res) {
  res.render('WelcomeSocialVideo');
}
module.exports = router;
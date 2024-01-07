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
const authenticateToken = require('../middlewares/authMiddleware');
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
router.get('/WelcomeEarningVideo',authenticateToken,WelcomeEarningVideo)
function WelcomeEarningVideo(req, res) {
  res.render('WelcomeSocialVideo');
}
router.delete('/social-links/deleteVideo/videos/:videoId', authenticateToken,deleteVideoByID);
router.get('/social-links/deleteVideo/videos', authenticateToken,renderDeleteVideo); 
router.post('/social-links/addVideo/videos', authenticateToken,addVideo); 
router.get('/show-videos', authenticateToken,AdminVideo);
router.get('/add-video', authenticateToken,renderAddVideo); 
router.get('/social-links/videos', showVideo);
router.put('/social-links/updateSocialLinks/videos/:videoId', authenticateToken,updateVideoByID); 
router.get('/social-links/updateSocialLinks/videos', authenticateToken,renderUpdateSocialLinks);
router.get('/home',authenticateToken,HomepageofSocialLinks)
module.exports = router;
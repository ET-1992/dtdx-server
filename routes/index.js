const Router = require('koa-router');

const { initGroup, initImage, updateImageUrl, initCategory, updateCategory } = require('../bin/init');
const { getAll, getCategoryAll } = require('../controllers/index');

const router = new Router({
    prefix: '/api/v1'
});

router.get('/create/img', initImage);
router.get('/create/category', initCategory);
router.get('/update/img', updateImageUrl);
router.get('/update/category', updateCategory);
router.get('/create/group', initGroup);
router.get('/create/all', getAll);
router.get('/create/category/all', getCategoryAll);

module.exports = router;
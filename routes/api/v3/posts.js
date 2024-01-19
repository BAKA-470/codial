const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/api/v3/posts_api');

router.get('/', postsApi.index);

module.exports = router;
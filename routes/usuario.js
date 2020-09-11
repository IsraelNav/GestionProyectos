const express =  require('express');
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');

const { userById,uId, list, update } = require('../controller/usuario');

router.get("/secret/:userId", requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});


router.put("/usuario/:uId/:userId",requireSignIn, isAuth, update);
router.get("/usuarios/:userId", requireSignIn,isAuth, list);

router.param("uId",uId);
router.param("userId", userById);


module.exports = router;



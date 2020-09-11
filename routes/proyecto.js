const express = require('express');
const router = express.Router();

const { projectNameValidator } = require('../validator');

const {  
    requireSignIn,
    isAuth,
    isAdmin
} = require('../controller/auth');

const { userById } = require('../controller/usuario');

const {projectById ,createProjects, listProjects, updateProjects, removeProject } = require('../controller/proyecto');


router.post('/proyecto/crear/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    projectNameValidator,
    createProjects
);


router.get('/proyectos/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    listProjects
);

router.put('/proyecto/:projectId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    updateProjects
);

router.delete('/proyecto/:projectId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    removeProject
);

router.param('projectId',projectById);
router.param('userId',userById);

module.exports = router;
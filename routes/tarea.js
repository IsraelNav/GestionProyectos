const express = require('express');
const router = express.Router();

const { taskNameValidator } = require('../validator');

const { userById } = require('../controller/usuario');

const {  
    requireSignIn,
    isAuth,
    isAdmin
} = require('../controller/auth');

const { tasktById ,createTask, listTaskForProjects, updateTask, deleteTask } = require('../controller/tarea');

router.post('/tarea/create/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    taskNameValidator,
    createTask
);

router.get('/tareas/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    listTaskForProjects
);

router.put('/tarea/:taskId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    updateTask
);

router.delete('/tarea/:taskId/:userId',
    requireSignIn,
    isAuth,
    isAdmin,
    deleteTask
);

router.param('taskId',tasktById);
router.param('userId',userById);

module.exports = router;
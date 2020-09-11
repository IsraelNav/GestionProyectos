exports.userSignupValidator = (req, res, next) => {
    req.check('nombre', 'El Nombre es obligatorio').notEmpty();
    req.check('email', 'El email debe contener entre 2 y 32 caracteres')
        .matches(/.+\@.+\..+/)
        .withMessage('El Email debe contener @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'El Password es requerido').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('El Password debe contener al menos 6 caracteres')
        .matches(/\d/)
        .withMessage('El Password debe contener al menos 1 numero');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.projectNameValidator = (req,res,next) =>{
    req.check('nombre', 'El Nombre es obligatorio').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.taskNameValidator = (req,res,next) =>{
    req.check('nombre', 'El Nombre es obligatorio').notEmpty();
    req.check('proyecto', 'El Proyecto es obligatorio').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

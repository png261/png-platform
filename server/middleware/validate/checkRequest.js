const checkRequest = (req, res, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };

    const { error } = schema.validate(req.body, options);
    if (error) {
        const message = {};
        error.details.map((err) => (message[err.context.label] = err.message));

        return res.status(422).json({
            success: false,
            message,
        });
    }

    next();
};

module.exports = checkRequest;

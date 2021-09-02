const catchForm = async (req, res, func) => {
    try {
        await func();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = catchForm;

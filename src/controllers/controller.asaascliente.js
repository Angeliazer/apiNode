const Add = (req, res) =>
{
    try {
        const user = {...req.body};

        console.log(user);
        res.status(200).send(user);


    } catch (error) {
        res.status(500).json({error: error});
    }
}

export default {Add}


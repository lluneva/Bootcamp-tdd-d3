const getAllDogs = async (req, res) => {res.status(200).send({ message: `dog here and name here` })};
const getAllCats = async (req, res) => {res.status(200).send({ message: `cats here and name here` })};

export { getAllDogs, getAllCats};
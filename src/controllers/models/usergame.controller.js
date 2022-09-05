const { Usergame, Game, User } = require('../../database/models/index');

// const getAll = async (req, res) => {
//     const userGames = await Usergame.findAll({
//         include: [
//             {
//                 model: 'Game',
//                 attributes: ['idGame', 'name', 'image']
//             },
//             {
//                 model: 'User',
//                 attributes: ['idUser', 'name', 'surname']      
//             }
//         ]
//     });
//     res.status(200).json({ userGames });
// };

const create = async (req, res) => {
    try{
        // Recibo las id de user y game
        const idGame = req.params.id;
        const idUser = req.userId;

        const ug = await Usergame.create({idGame, idUser});
        if (ug) {
            res.status(200).json({ msg: 'Compra realizada con exito' });
        } else {
            res.status(404).json({ msg: 'No se pudo realizar la compra' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = {
    create
};
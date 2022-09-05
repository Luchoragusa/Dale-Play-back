const { Game, Category, Developer, User, Usergame } = require('../../database/models/index');

const findGamesByCategory = async (req,res) => {
    try{
        const id = req.params.id
        if(await Category.findByPk(id)) {
            // La categoria existe en la DB
            let games = await Game.findAll({ where: { idCategory: id } });
            // Si obtengo un array vacio, es porque no hay juegos de esa categoria
            // Puse el .length porque sino me daba error
            if (games.length > 0) { 
                return res.status(200).json({games, 'msg':'Encontrados correctamente'})
            } else {
                // Si no hay juegos de esa categoria, devuelvo un 404
                return res.status(404).json({'msg':'No hay juegos para esa categoria'})
            }
        }else{
            // La categoria no existe en la DB
            return res.status(404).json({'msg':'La categoria no existe en la DB'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const findGamesByDeveloper = async (req,res) => {
    try{
        const id = req.params.id
        if(await Developer.findByPk(id)) {
            // El developer existe en la DB
            let games = await Game.findAll({ where: { idDeveloper: id } });
            // Si obtengo un array vacio, es porque no hay juegos de ese developer
            // Puse el .length porque sino me daba error
            if (games.length > 0) { 
                return res.status(200).json({games, 'msg':'Encontrados correctamente'})
            } else {
                // Si no hay juegos de esa developer, devuelvo un 404
                return res.status(404).json({'msg':'No hay juegos para ese developer'})
            }
        }else{
            // El developer no existe en la DB
            return res.status(404).json({'msg':'El developer no existe en la DB'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const findGamesByUser = async (req,res) => {
    try{
        const id = req.params.id
        if(await User.findByPk(id)) {
            // El usuario existe en la DB
            let usergames = await Usergame.findAll({ where: { idUser: id } });
            // Si obtengo un array vacio, es porque no hay juegos comprados por ese usuario
            // Puse el .length porque sino me daba error
            if (usergames.length > 0) { 
                // Tengo un array de objetos con los juegos comprados por el usuario
                const games = [];
                const promises = usergames.map(async (usergame) => {
                    const game = await Game.findByPk(usergame.idGame);
                    games.push(game);
                });
                // Espero a que se resuelvan todas las promesas
                await Promise.all(promises);

                return res.status(200).json({games, 'msg':'Encontrados correctamente'})
            } else {
                // Si no hay juegos de ese usuario, devuelvo un 404
                return res.status(404).json({'msg':'No hay juegos para ese usuario'})
            }
        }else{
            // El usuario no existe en la DB
            return res.status(404).json({'msg':'El usuario no existe en la DB'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = {
    findGamesByCategory,
    findGamesByDeveloper,
    findGamesByUser
};
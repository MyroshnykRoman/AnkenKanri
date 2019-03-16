const Anken = require('mongoose').model('Anken');
module.exports = (req, res) => {
    const { ankenId } = req.body;

    Anken.deleteAnken(ankenId, (err, deletedAnken) => {
        if(err){
            res.status(300).json({
                error:'案件を削除できませんでした'
            })
        }else{
            res.status(200).json({
                deletedAnken
            })
        }
    })
};
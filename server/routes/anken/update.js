const Anken = require('mongoose').model('Anken');
module.exports = (req, res) => {
    const {ankenId, ankenName, postalCode, prefecture } = req.body;

    Anken.updateAnken(ankenId, ankenName, postalCode, prefecture, (err, updatedAnken)=>{
        if(err){
            res.status(300).json({
                error:'案件を更新できませんでした'
            })
        }else{
            res.status(200).json({
                updatedAnken
            })
        }
    })
};
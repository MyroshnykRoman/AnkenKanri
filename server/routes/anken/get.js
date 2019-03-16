const Anken = require('mongoose').model('Anken');
module.exports = (req, res) => {
    Anken.getAnkens((err, ankens) => {
        if(err){
            res.status(300).json({
                error:'案件を取得できませんでした'
            })
        }else{
            res.status(200).json({
                ankens
            })
        }
    })
};
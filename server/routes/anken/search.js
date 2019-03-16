const Anken = require('mongoose').model('Anken');
module.exports = (req, res) => {
    const { filterString } = req.body;
    console.log(filterString)
    console.log(req.body)
    Anken.filterAnkens(filterString, (err, filteredAnkens) => {
        if(err){
            console.log(err)
            res.status(300).json({
                error:'案件のフィルタリングに失敗しました'
            })
        }else{
            res.status(200).json({
                filteredAnkens
            })
        }
    })
};
const Anken = require('mongoose').model('Anken');
const fetch = require('node-fetch');

 
module.exports = (req, res) => {
    const { ankenName, postalCode } = req.body;
  //  console.log(ankenName)
  //  console.log(postalCode)
  //  console.log(`http://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`)
    fetch(`http://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`)
    .then(res => res.json())
    .then((data)=>{
    // /    console.log(data); // 都道府県
      let prefecture = data.results[0].address1;
     
      Anken.addAnken(ankenName, postalCode, prefecture, (err, newAnken) =>{
          if(err){
              console.log(err)
              res.status(300).json({
                  error:'案件を追加できませんでした'
              })
          }else{
              res.status(200).json({
                  newAnken
              })
          }
    })
    }).catch((err)=>{
        console.log(err)
        res.status(300).json({
            error:'都道府県を検出できませんでした'
        })
    })
};
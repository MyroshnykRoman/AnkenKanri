const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Prefectures = [
        '北海道', 
        '青森県', 
        '岩手県', 
        '宮城県', 
        '秋田県', 
        '山形県', 
        '福島県', 
        '茨城県', 
        '栃木県', 
        '群馬県', 
        '埼玉県', 
        '千葉県', 
        '東京都', 
        '神奈川県', 
        '新潟県', 
        '富山県', 
        '石川県', 
        '福井県', 
        '山梨県', 
        '長野県', 
        '岐阜県', 
        '静岡県', 
        '愛知県', 
        '三重県', 
        '滋賀県', 
        '京都府', 
        '大阪府', 
        '兵庫県', 
        '奈良県', 
        '和歌山県', 
        '鳥取県', 
        '島根県', 
        '岡山県', 
        '広島県', 
        '山口県', 
        '徳島県', 
        '香川県', 
        '愛媛県', 
        '高知県',
        '福岡県', 
        '佐賀県', 
        '長崎県', 
        '熊本県', 
        '大分県', 
        '宮崎県', 
        '鹿児島県',
         '沖縄県'
        ]



const ankenSchema = new mongoose.Schema({
    ankenId: Number,
    ankenName: {
        type: String,
        required:[true, '案件名が必修です']
    },
    postalCode:{
        type:String,
        required:[true, '郵便番号が必修です']
    },
    prefecture:{
        type:String,
    }
});

ankenSchema.statics.addAnken = function(ankenName, postalCode, prefecture, callback){
    let anken = new this({
    ankenName, 
    postalCode, 
    prefecture
  });
  anken.save(callback);
  
}

ankenSchema.statics.deleteAnken = function(ankenId, callback){
    const conditions = { ankenId };
    this.deleteOne(conditions, callback);
}

ankenSchema.statics.updateAnken = function(ankenId, ankenName, postalCode, prefecture, callback){
    const conditions = { ankenId };
    
    let update = {}
    ankenName && (update.ankenName = ankenName);
    postalCode && (update.postalCode = postalCode);
    prefecture && (update.prefecture = prefecture);
    
    const opts = { upsert:false, new:true };
    
    this.findOneAndUpdate(
        conditions,
        update,
        opts,
        callback
    )
}

ankenSchema.statics.getAnkens = function(callback){
    const conditions = {};
    this.find(conditions)
        .exec(callback);
};

ankenSchema.statics.filterAnkens = function( filterString, callback){
    const conditions = {$text:{$search:filterString}}
    this.find(conditions)
    .exec(callback)
}

ankenSchema.index({
    '$**': 'text'
}, {
    weights:{
        ankenName:5,
        prefecture:3,
        postalCode:1,
    }
})
//案件モデル構成
ankenSchema.plugin(autoIncrement.plugin, {model: 'Anken', field: 'ankenId'});
mongoose.model('Anken', ankenSchema);



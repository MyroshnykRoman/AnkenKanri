let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

const dbURI = 'mongodb://localhost:27017/anken';

//データベースに接続
mongoose.connect(
    dbURI, { useNewUrlParser: true }
);

autoIncrement.initialize(mongoose.connection);

mongoose.connection.on('connected', function(){
    console.log(dbURI+' :データベースに接続しました');
});

mongoose.connection.on('error', function(err){
    console.log(err+' : データベースに接続エラー');
});

mongoose.connection.on('disconnected', function(){
    console.log('データベース接続が終了しました');
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('データベース接続が強制的に終了しました');
        process.exit(0);
    });
});

require('./model/anken/anken');


module.exports = autoIncrement;
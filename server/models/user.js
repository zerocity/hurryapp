define(['mongoose'],function(mongoose ){"use strict";
  var Schema = mongoose.Schema;
  var User = new Schema({
      name: String,
			email: String,
			pw: String,//HASH SHA256 (pw + SALT) 
			salt : String,//RANDOM NUMBER  
			regDate:{ type: Date, default: Date.now },
			active: { type: Boolean, default: false },
			randomNumber: Number
  });

  return mongoose.model('User', User);
});

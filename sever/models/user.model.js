import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name: {
        type :  String,
        trim : true,
        required:"Name is required"
    },
    email:{
        type :String,
        trim : true,
        unique:'Already Exist',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
},
created:{
    type:Date,
    data:Date.now
},
Updated:Date,
hashed_password:{
    type : string,
    required:'Password is required'
},
salt:String


})
UserSchema
.virtual('password')
.set(function(password){
    this._password=password
    this_salt=this.makeSalt()
    this.hashed_password=this.encryptPassword(password)
}).get(function(){})
export default mongoose.model("User",UsersSchema)

UserSchema.methods={
    authenticate:(plaintext)=>{
        this.encryptPassword(plaintext)===this.hashed_password
        
    },
    encryptPassword:function(password){
        if (!password) return''
        try{
            return crypto
                .createHmac('shal',this.salt)
                .update(password)
                .digest('hex')
        }catch(err){
            return  ''
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}
UserSchema.path('hash_password').validate(function(v){
if (this._password &&  this._password.length<6){
    this.invalidate('password','Password must be at least 6 characters')
}
if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
    }
    }, null)

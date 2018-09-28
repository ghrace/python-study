const koa =require('koa')
const bodyParser = require('koa-bodyparser');
const app = new koa();
app.use(bodyParser());  // 解析request的body

// const db=mongoose.connect('mongodb://localhost')
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
const User = mongoose.model('User',UserSchema);

const router = require('koa-router')()
router.get('/', async (ctx, next) => {
    // todo
    let val = null
	const data = await User.findOne({username: 'ydj'})
	console.log('data', data)
	const result = {
		code:200,
		response: data,
		ts: 12345
	}
	ctx.response.body = result
	return result
})
app.use(router.routes());
app.listen(9000);
console.log('app started at port 9000...')

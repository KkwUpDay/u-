import {
	request
} from '@/utils/tools.js';

//轮播图
async function getbanner() {
	return await request("/api/getbanner");
}

//获取商品全部分类信息
async function getcates() {
	return await request("/api/getcates");
}


//详情页一条数据
async function getgoodsinfo(id) {
	return await request("/api/getgoodsinfo", {
		id
	});
}
//添加到购物车
async function cartadd(uid,goodsid,num,token){
	return await request("/api/cartadd",{uid,goodsid,num},"GET",{
		 authorization:token
	})
}

//获取验证码
async function smss(phone) {
	return await request("/api/sms", {
		phone
	});
}

//执行登录
async function Wxlogin(phone) {
	return await request("/api/wxlogin", {
		phone
	})
}


//购物车列表
async function cartlist(uid,token){
	return await request("/api/cartlist",{uid},"GET",{
		authorization:token
	})
}

//购物车修改
async function cartedit(id,num,checked,token){
	return await request("/api/cartedit",{id,num,checked},"GET",{
		authorization:token
	})
}
//购物车删除
async function cartdelete(id,token){
	return await request("/api/cartdelete",{id},"GET",{
		authorization:token
	})
}


export {
	getbanner,
	getgoodsinfo,
	cartadd,
	smss,
	Wxlogin,
	cartlist,
	cartedit,
	getcates,
	cartdelete
}

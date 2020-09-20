const baseUrl = "http://localhost:3000"

function request(url="",data={},method="GET",header={}){
	return uni.request({
		url: baseUrl+url,
		data:data,
		method:method,
		header:header
	})
}
export{
	baseUrl,
	request
}
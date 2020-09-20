<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list"  :class="activeIndex==index?'activeList':''"  v-for="(item,index) in list " :key="item.id" @click="menuClick(index)">
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="(item,index) in list[activeIndex].children" :key="item.id">
						<!-- 每个最多显示6个 -->
						<view >
							<image :src="item.img" alt="" />
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
	</view>
</template>
<script>
	import {getcates} from "@/utils/api.js";
	import {baseUrl} from "@/utils/tools.js"
	export default{
		data(){
			return{
				list:[],     //左侧分类來表
				activeIndex:0     //active被点击的下标
			}
		},
		methods:{
			//点击左侧获取active
				
			menuClick(index){
				this.activeIndex = index
			}
		},
		async onLoad() {
			var res = await getcates()
			console.log(res)
			var list = res[1].data.list
			
			list.forEach(item=>{
				// console.log(item)
				if(item.children){
					item.children.forEach(item1=>{
						item1.img = baseUrl+item1.img
					})
				} 
			})
			this.list = list
			// console.log(list)
		}
	}
	
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>

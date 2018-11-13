		var alen=50;//模拟内存的大小
		var list=new Array(alen);//模拟内存的数组
		var haslist=new Array();//内存分配表
		var i=0;//内存分配次数
		var jishu=0;//日记记录显示级数
		var start=0;//开始指针
		var time=200;//相隔时间
		
		chushihuaneicun(list);//初始化内存
		setInterval(function(){//每一s调用一次
				var size=Math.floor(Math.random()*50);
					clog("随机申请"+size+"kb内存");
					fengpei(size,list,haslist);//分配内存
					i++;
					if(i>3)//4次之后释放内存
					{
						shifang();//释放内存
						i=0;
						}
						
					},time);
		
		
		function fengpei(size,list,haslist)
		{
				var temp= myfengpei(size,list,haslist);
				if(temp==-1)
				{
					clog("内存分配失败。空间不够了");
				
					}
				else {
					
						for(var i=temp;i<(temp+size);i++)
						{
							list[i]=1;//更改内存状态
							}
					}
				show("my",list);
				
				function myfengpei(size,list)
				{
					
					var sum=0;
					var tempsize=0;
					var tempstart=0;
				for(var i=start,n=i;i<(start+alen);i++)
				{
					sum++;
					if(sum>alen)
					{
						
						}
					if(i<alen)
					{
						n=i;
						}
					else{
							n=i-alen;
							tempstart=0;
						}
						
						if(tempsize>=size)
						{
							if(n>99)
							{
									start=0;
								}
								else{
										start=n;
									}
								clog("已经成功分配"+size+"kb内存+++++++起始地址："+tempstart);
								haslist.push([tempstart,size]);
								return tempstart;
							}
					if(list[n]==0)
					{
						if(tempsize==0)
						{
								tempstart=n;
							}
							tempsize++;
						}
						if(list[n]==1)
						{
								tempsize=0;
							}
					}
					clog("没有可供分配的内存");
						return -1;
					}
			
			}
		
		function show(id,array)
		{
			//id是展示div的id
			// array是传入的数字数组
			var mydiv=document.getElementById(id);
			if(mydiv==null)
			{
				alert("传入的id无效");
				return 0;
				}
			if(array.length==0)
			{
				alert("传入数组为0");
				return 0;
				}
			var max=1000;//最大长度
			var len=array.length;//获取表格长度
			var temp="";
			for(var i=0;i<len;i++)
			{
				if(array[i]==0){
				temp+='<td ></td>';
				}
				if(array[i]!=0)
				{
					temp+='<td bgcolor="#CC0000"></td>';
					}
				}
			mydiv.innerHTML='<table  style="height:40px; width:'+max+'px" border="1"   ><tr style="height:120">'+temp+'</tr></table>';
		}
		function clog(str)
		{
			
			str+="<br>";
			var zhuangtai=document.getElementById("state");
			if(jishu==10)
			{
				zhuangtai.innerHTML="";
				jishu=0;
				}
			zhuangtai.innerHTML+=str;
			jishu++;
			}
		function chushihuaneicun(list)
		{
			for(var i=0;i<list.length;i++)
			{
				list[i]=0;//初始化内存
				
				}
			clog("内存初始化完成");
			clog("内存大小为"+list.length+"kb");
			}
			
		function shifang()
		{
			var len=Math.floor(Math.random()*(haslist.length));
			if(len<0)
				len=0;
				var mystart=haslist[len][0];
				var size=haslist[len][1];
				haslist.splice(len,1);
				clog("释放内存  大小为"+size);
				for(var i=mystart;i<size+mystart;i++)
				{	
					
					list[i]=0;
					
					}
			
				show("my",list);
			}
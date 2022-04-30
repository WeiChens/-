
let xqpos=[];
for(let i=0;i<10;i++){
    for(let j=0;j<9;j++){
        xqpos.push({x:j,y:i})
    }

}
// document.getElementById('back').play()
const xq={
    template:'#xq',
    data(){
        return{
            isbegin:false,
            isred:false,
            isgreen:false,
			xuanzhong:document.getElementById('xuanzhong')		//选中音乐标签
        }
        
    },
    props:{
        hom:{
            type:String
        },
        dos:{
            type:String,
            dafault:'空'
        },
        pos:{
            type:Object,
            default(){
                return{
                    x:1,
                    y:1
                }
            }
        },
        life:{
            type:Boolean,
            default:true
        },
        ind:{
            type:Number
        }
    },
    mounted(){
        if(this.hom=='红方'){
            this.isred=true
        }else{
            this.isgreen=true
        }
    },
    methods:{
        move(x,y){
            this.x=x
        },
        down(){
            this.$emit('butxq',this.ind)
        },
        cdsn(){
            this.isbegin=!this.isbegin;
			this.xuanzhong.play();
        },
        showpos(pos){
            const company=38
            let x=this.pos.x*company+8;
            let y=this.pos.y*company+11
            return 'left:'+x +'px; bottom:'+y+'px;'
        },
        kill(){
            this.life=false
            console.log(this.life);
        }
    },
}

const xq_read={
    template:'#xq_read',
    props:{
        pos:{
            type:Object,
            default(){
                return{
                    x:0,
                    y:0
                }
            }
        }
    },
    methods:{
        showpos(pos){
            const company=38.5
            let x=this.pos.x*company+15;
            let y=this.pos.y*company+15
            return 'left:'+x +'px; bottom:'+y+'px;'
        },
        retpos(){
            this.$emit('xqmove',this.pos);
        }
    }
}
const app=new Vue({
    el:'#app',
    data:{
        currcom:null,										//选择的棋子组件
		intoXqdata:null,									//初始化所有棋子数据
		lastXqdata:'null'	,								//上一步所有棋子数据
        xq_Data:[
            {
                hom:'红方',
                life:true,
                x:4,
                y:0,
                dos:'帅'
            },
            {
                hom:'红方',
                life:true,
                x:5,
                y:0,
                dos:'士'
            },
            {
                hom:'红方',
                life:true,
                x:3,
                y:0,
                dos:'士'
            },
            {
                hom:'红方',
                life:true,
                x:2,
                y:0,
                dos:'相'
            },
            {
                hom:'红方',
                life:true,
                x:6,
                y:0,
                dos:'相'
            },
            {
                hom:'红方',
                life:true,
                x:1,
                y:0,
                dos:'马'
            },
            {
                hom:'红方',
                life:true,
                x:7,
                y:0,
                dos:'马'
            },
            {
                hom:'红方',
                life:true,
                x:0,
                y:0,
                dos:'车'
            },
            {
                hom:'红方',
                life:true,
                x:8,
                y:0,
                dos:'车'
            },
            {
                hom:'红方',
                life:true,
                x:0,
                y:3,
                dos:'兵'
            },
            {
                hom:'红方',
                life:true,
                x:2,
                y:3,
                dos:'兵'
            },
            {
                hom:'红方',
                life:true,
                x:4,
                y:3,
                dos:'兵'
            },
            {
                hom:'红方',
                life:true,
                x:6,
                y:3,
                dos:'兵'
            },
            {
                hom:'红方',
                life:true,
                x:8,
                y:3,
                dos:'兵'
            },
            {
                hom:'绿方',
                life:true,
                x:4,
                y:9,
                dos:'将'
            },
            {
                hom:'绿方',
                life:true,
                x:3,
                y:9,
                dos:'士'
            },
            {
                hom:'绿方',
                life:true,
                x:5,
                y:9,
                dos:'士'
            },
            {
                hom:'绿方',
                life:true,
                x:2,
                y:9,
                dos:'象'
            },
            {
                hom:'绿方',
                life:true,
                x:6,
                y:9,
                dos:'象'
            },
            {
                hom:'绿方',
                life:true,
                x:1,
                y:9,
                dos:'马'
            },
            {
                hom:'绿方',
                life:true,
                x:7,
                y:9,
                dos:'马'
            },
            {
                hom:'绿方',
                life:true,
                x:0,
                y:9,
                dos:'车'
            },
            {
                hom:'绿方',
                life:true,
                x:8,
                y:9,
                dos:'车'
            },
            {
                hom:'绿方',
                life:true,
                x:6,
                y:6,
                dos:'卒'
            },
            {
                hom:'绿方',
                life:true,
                x:8,
                y:6,
                dos:'卒'
            },
            {
                hom:'绿方',
                life:true,
                x:4,
                y:6,
                dos:'卒'
            },
            {
                hom:'绿方',
                life:true,
                x:2,
                y:6,
                dos:'卒'
            },
            {
                hom:'绿方',
                life:true,
                x:0,
                y:6,
                dos:'卒'
            },
            {
                hom:'绿方',
                life:true,
                x:7,
                y:7,
                dos:'炮'
            },
            {
                hom:'绿方',
                life:true,
                x:1,
                y:7,
                dos:'炮'
            },
            {
                hom:'红方',
                life:true,
                x:7,
                y:2,
                dos:'炮'
            },
            {
                hom:'红方',
                life:true,
                x:1,
                y:2,
                dos:'炮'
            }
            
        ],
        xqpos:xqpos,										//棋子位置坐标对象数组
        round:"红方",            							//当前的回合方
		log:'',												//提示数据
        ectAudio: document.getElementById('eat'),			//‘吃’音频标签
        jiangjunAudio: document.getElementById('jiangjun'), //将军音频标签
        juesha:document.getElementById('juesha'),			//绝杀音频标签
		move:document.getElementById('move'),				//移动音频标签
		backmusic:document.getElementById('backmusic'),		//背景音乐标签
		xuanzhong:document.getElementById('xuanzhong'),		//选中音乐表情
		backmusicSwitch:'关',
		gameplayMusic:'开'
    },
	mounted(){
		this.intoXqdata = JSON.parse(JSON.stringify(this.xq_Data));
		
	},
    components:{
        xq,
        xq_read
    },
    methods:{
        butXq(ind){
            if(this.currcom==null&&this.$refs.chin[ind].hom==this.round){
                this.currcom=this.$refs.chin[ind]
                this.currcom.cdsn();
            }else if(this.currcom!=null){
                if(this.currcom.ind==ind){
                    this.currcom.cdsn();
                    this.currcom=null
                }else{
                    this.xqMove({x:this.xq_Data[ind].x,y:this.xq_Data[ind].y})
                }
            }else{
                this.log='不是你的回合'
            }
        },
        xqMove(pos){
            if(this.currcom!=null){
                let dos=this.currcom.dos;
                let hom=this.currcom.hom;
                let read=true;    //判断是否为路
                let ind=-1;
                for(let i=0;i<this.xq_Data.length;i++){
                    let item =this.xq_Data[i];
                    if(item.life&&item.x==pos.x&&item.y==pos.y){
                        ind=i;
                        read=false;
                        break;
                    }
                }
                if(read){
                    if(this.ismove(pos,this.currcom.ind,this.xq_Data)){
                        let cp_xqData=JSON.parse(JSON.stringify(this.xq_Data));
                        cp_xqData[this.currcom.ind].x=pos.x;
                        cp_xqData[this.currcom.ind].y=pos.y;

                        if(this.isJiangjun(cp_xqData,(this.round=='红方') ? '绿方':'红方')){
                            this.log='无法下子，被将军'
                        }else{
							
							this.lastXqdata=JSON.parse(JSON.stringify(this.xq_Data));//记录上一次棋局数据
							
                            this.xq_Data[this.currcom.ind].x=pos.x;
                            this.xq_Data[this.currcom.ind].y=pos.y;
                            this.currcom.isbegin=false
                            this.currcom=null
                            this.round =(this.round=='红方') ? '绿方':'红方'
							this.move.play();
                            if(this.isJiangjun(cp_xqData,(this.round=='红方') ? '绿方':'红方')){
                                if(this.forecast(this.round)){
                                    this.juesha.play()
									this.log='绝杀'
                                }else{
                                    this.jiangjunAudio.play();
									this.log='将军'
                                }
                            }else{
								this.log=''
							}
                        }
                    }
                }else{
                    if(this.currcom.hom==this.xq_Data[ind].hom){
                        this.log='不能吃同类'
                        this.currcom.isbegin=false;
                        this.currcom=null
                    }else{
                        if(this.ismove(pos,this.currcom.ind,this.xq_Data)){

                            let cp_xqData=JSON.parse(JSON.stringify(this.xq_Data));

                            for(let i=0;i<cp_xqData.length;i++){
                                let item=cp_xqData[i]
                                if(item.x==pos.x&&item.y==pos.y&&item.life){
                                     item.life=false;
                                }
                            }
                            cp_xqData[this.currcom.ind].x=pos.x;
                            cp_xqData[this.currcom.ind].y=pos.y;

                            if(this.isJiangjun(cp_xqData,(this.round=='红方') ? '绿方':'红方')){
                                this.log='无法下子，被将军'
                            }else{//吃掉
								this.lastXqdata=JSON.parse(JSON.stringify(this.xq_Data));//记录上一次棋局数据
                                for(let i=0;i<this.xq_Data.length;i++){
                                    let item=this.xq_Data[i]
                                    if(item.x==pos.x&&item.y==pos.y&&item.life){
                                         item.life=false;
                                         break
                                    }
                                }
                                this.xq_Data[this.currcom.ind].x=pos.x;
                                this.xq_Data[this.currcom.ind].y=pos.y;

                                this.currcom.isbegin=false
                                this.currcom=null
                                this.round =(this.round=='红方') ? '绿方':'红方'
								this.move.play();
                                if(this.isJiangjun(cp_xqData,(this.round=='红方') ? '绿方':'红方')){
                                    if(this.forecast(this.round)){
                                        console.log(1);
                                        this.juesha.play()
										this.log='绝杀'
                                    }else{
                                        this.jiangjunAudio.play();
										this.log='将军'
                                    }
                                }else{
                                    this.ectAudio.play()
									this.log=''
                                }
                            }


                        }
                    }
                }
            }
        },
        ismove(pos,currcomind,cp_xqData){//pos:棋子位移的坐标，currcomind:棋子的的index,cp_xqData:运算的棋子数据
            let isMove=false
            let item=cp_xqData[currcomind]//获取移动棋子对象
			let JiangObj=null;
			let ShuaiObj=null;
			
			for(let i=0;i<cp_xqData.length;i++){
				if(cp_xqData[i].dos=='帅'){
					ShuaiObj=cp_xqData[i];
				}else if(cp_xqData[i].dos=='将'){
					JiangObj=cp_xqData[i]
				}
			}
            switch(item.dos){
                        case '帅': {
                            if(pos.x<=5&&pos.x>=3&&pos.y<=2){
                                let move_x=pos.x-item.x;
                                let move_y=pos.y-item.y;
                                if(Math.abs(move_x)+Math.abs(move_y)==1){
                                    isMove=true;
                                }
                            }else if(pos.x==JiangObj.x&&pos.y==JiangObj.y&&item.x==JiangObj.x){
								let isFly=true;
								for(let i=0;i<cp_xqData.length;i++){
									let tre = cp_xqData[i];
									if(tre.x==pos.x&&tre.y<JiangObj.y&&tre.y>ShuaiObj.y&&tre.life){
										isFly=false;
										break;
									}
								}
								isMove=isFly
							}
                        }  break;
                        case '将': {
                            if(pos.x<=5&&pos.x>=3&&pos.y>=7){
                                let move_x=pos.x-item.x;
                                let move_y=pos.y-item.y;
                                if(Math.abs(move_x)+Math.abs(move_y)==1){
                                    isMove=true;
                                }
                            }else if(pos.x==ShuaiObj.x&&pos.y==ShuaiObj.y&&item.x==ShuaiObj.x){
								
								let isFly=true;
								for(let i=0;i<cp_xqData.length;i++){
									let tre = cp_xqData[i];
									if(tre.x==pos.x&&tre.y<JiangObj.y&&tre.y>ShuaiObj.y&&tre.life){
										isFly=false;
										break;
									}
								}
								isMove=isFly
							}
                        }  break;
                        case '士': {
                            if(item.hom=='红方'){
                                if(pos.x<=5&&pos.x>=3&&pos.y<=2){
                                    let move_x=pos.x-item.x;
                                    let move_y=pos.y-item.y;
                                    if(Math.abs(move_x)==1&&Math.abs(move_y)==1){
                                        isMove=true
                                    }
                                }
                            }else{
                                if(pos.x<=5&&pos.x>=3&&pos.y>=7){
                                    let move_x=pos.x-item.x;
                                    let move_y=pos.y-item.y;
                                    if(Math.abs(move_x)==1&&Math.abs(move_y)==1){
                                        isMove=true
                                    }
                                }
                            }
                        }  break;
                        case '相': {
                            if(pos.y<=4){
                                let move_x=pos.x-item.x;
                                let move_y=pos.y-item.y;
                                if(Math.abs(move_x)==2&&Math.abs(move_y)==2){
                                    isMove=true
                                }
                            }
                        }  break;
                        case '象': {
                            if(pos.y>=5){
                                let move_x=pos.x-item.x;
                                let move_y=pos.y-item.y;
                                if(Math.abs(move_x)==2&&Math.abs(move_y)==2){
                                    isMove=true
                                }
                            }
                        }  break;
                        case '兵': {
                            let move_x=pos.x-item.x;
                            let move_y=pos.y-item.y;
                            if((Math.abs(move_x)==0&&move_y==1)||(Math.abs(move_x)==1&&move_y==0)){
                                    isMove=true
                                if(item.y<5&&move_x!=0){
                                    isMove=false;
                                }
                            }
                        }  break;
                        case '卒': {
                            let move_x=pos.x-item.x;
                            let move_y=pos.y-item.y;
                            if((Math.abs(move_x)==0&&move_y==-1)||(Math.abs(move_x)==1&&move_y==0)){
                                    isMove=true
                                if(item.y>=5&&move_x!=0){
                                    isMove=false;
                                }
                            }
                        }  break;
                        case '马': {
                                let move_x=pos.x-item.x;
                                let move_y=pos.y-item.y;
                                let move=true;
                                if(Math.abs(move_x)*Math.abs(move_y)==2){
                                    if(move_x==2){
                                        for(let i=0;i<cp_xqData.length;i++){
                                            let item2=cp_xqData[i];
                                            if(item2.x==item.x+1&&item2.y==item.y&&item2.life){
                                                move=false;
                                            }
                                        }
                                    }else if(move_x==-2){
                                        for(let i=0;i<cp_xqData.length;i++){
                                            let item2=cp_xqData[i];
                                            if(item2.x==item.x-1&&item2.y==item.y&&item2.life){
                                                move=false;
                                            }
                                        }
                                    }else if(move_y==-2){
                                        for(let i=0;i<cp_xqData.length;i++){
                                            let item2=cp_xqData[i];
                                            if(item2.x==item.x&&item2.y==item.y-1&&item2.life){
                                                move=false;
                                            }
                                        }
                                    }else if(move_y==2){
                                        for(let i=0;i<cp_xqData.length;i++){
                                            let item2=cp_xqData[i];
                                            if(item2.x==item.x&&item2.y==item.y+1&&item2.life){
                                                move=false;
                                            }
                                        }
                                    }
                                    isMove=move;
                                }
                        }  break;
                        case '车': {
                                let move_x=pos.x-item.x;
                                let move_y=pos.y-item.y;
                                let move=true
                                if(Math.abs(move_x)==0){
                                    if(pos.y>item.y){
                                        for(let i=item.y+1;i<pos.y;i++){
                                            for(let j=0;j< cp_xqData.length;j++){
                                                let item2 =cp_xqData[j];
                                                if(item2.x==pos.x&&item2.y==i&&item2.life){
                                                    move=false;
                                                    break;
                                                }
                                            }
                                            if(!move){
                                                break;
                                            }
                                        }
                                    }else{
                                        for(let i=item.y-1;i>pos.y;i--){
                                            for(let j=0;j< cp_xqData.length;j++){
                                                let item2 =cp_xqData[j];
                                                if(item2.x==pos.x&&item2.y==i&&item2.life){
                                                    move=false;
                                                    break;
                                                }
                                            }
                                            if(!move){
                                                break;
                                            }
                                        }
                                    }
                                    if(move){
                                       isMove=true
                                    }
                                }else if(Math.abs(move_y)==0){
                                    if(pos.x>item.x){
                                        for(let i=item.x+1;i<pos.x;i++){
                                            for(let j=0;j< cp_xqData.length;j++){
                                                let item2 =cp_xqData[j];
                                                if(item2.x==i&&item2.y==pos.y&&item2.life){
                                                    move=false;
                                                    break;
                                                }
                                            }
                                            if(!move){
                                                break;
                                            }
                                        }
                                    }else{
                                        for(let i=item.x-1;i>pos.x;i--){
                                            for(let j=0;j< cp_xqData.length;j++){
                                                let item2 =cp_xqData[j];
                                                if(item2.x==i&&item2.y==pos.y&&item2.life){
                                                    move=false;
                                                    break;
                                                }
                                            }
                                            if(!move){
                                                break;
                                            }
                                        }
                                    }
                                    if(move){
                                        isMove=true
                                    }
                                }
                        }break;
                        case '炮': {
                                let move_x=pos.x-item.x;
                                let move_y=pos.y-item.y;
                                let move=true
                                let movenum=0;
                                let isread=true;

                                for(let i=0;i<cp_xqData.length;i++){
                                    let item2=cp_xqData[i]
                                    if(item2.x==pos.x&&item2.y==pos.y&&item2.life){
                                        isread=false;
                                        break;
                                    }
                                }
                                if(isread){ //当走路时
                                    if(Math.abs(move_x)==0){
                                        if(pos.y>item.y){
                                            for(let i=item.y+1;i<pos.y;i++){
                                                for(let j=0;j< cp_xqData.length;j++){
                                                    let item2 =cp_xqData[j];
                                                    if(item2.x==pos.x&&item2.y==i&&item2.life){
                                                        move=false;
                                                        break;
                                                    }
                                                }
                                                if(!move){
                                                    break;
                                                }
                                            }
                                        }else{
                                            for(let i=item.y-1;i>pos.y;i--){
                                                for(let j=0;j< cp_xqData.length;j++){
                                                    let item2 =cp_xqData[j];
                                                    if(item2.x==pos.x&&item2.y==i&&item2.life){
                                                        move=false;
                                                        break;
                                                    }
                                                }
                                                if(!move){
                                                    break;
                                                }
                                            }
                                        }
                                        if(move){
                                        isMove=true
                                        }
                                    }else if(Math.abs(move_y)==0){
                                        if(pos.x>item.x){
                                            for(let i=item.x+1;i<pos.x;i++){
                                                for(let j=0;j< cp_xqData.length;j++){
                                                    let item2 =cp_xqData[j];
                                                    if(item2.x==i&&item2.y==pos.y&&item2.life){
                                                        move=false;
                                                        break;
                                                    }
                                                }
                                                if(!move){
                                                    break;
                                                }
                                            }
                                        }else{
                                            for(let i=item.x-1;i>pos.x;i--){
                                                for(let j=0;j< cp_xqData.length;j++){
                                                    let item2 =cp_xqData[j];
                                                    if(item2.x==i&&item2.y==pos.y&&item2.life){
                                                        move=false;
                                                        break;
                                                    }
                                                }
                                                if(!move){
                                                    break;
                                                }
                                            }
                                        }
                                        if(move){
                                            isMove=true
                                        }
                                    }    
                                }else{//当吃时
                                    if(Math.abs(move_x)==0){
                                        if(pos.y>item.y){
                                            for(let i=item.y+1;i<pos.y;i++){
                                                for(let j=0;j< cp_xqData.length;j++){
                                                    let item2 =cp_xqData[j];
                                                    if(item2.x==pos.x&&item2.y==i&&item2.life){
                                                        movenum++;
                                                    }
                                                }
                                            }
                                        }else{
                                            for(let i=item.y-1;i>pos.y;i--){
                                                for(let j=0;j< cp_xqData.length;j++){
                                                    let item2 =cp_xqData[j];
                                                    if(item2.x==pos.x&&item2.y==i&&item2.life){
                                                        movenum++;
                                                    }
                                                }
                                            }
                                        }
                                        if(movenum==1){
                                        isMove=true
                                        }
                                    }else if(Math.abs(move_y)==0){
                                        if(pos.x>item.x){
                                            for(let i=item.x+1;i<pos.x;i++){
                                                for(let j=0;j< cp_xqData.length;j++){
                                                    let item2 =cp_xqData[j];
                                                    if(item2.x==i&&item2.y==pos.y&&item2.life){
                                                        movenum++;
                                                    }
                                                }
                                            }
                                        }else{
                                            for(let i=item.x-1;i>pos.x;i--){
                                                for(let j=0;j< cp_xqData.length;j++){
                                                    let item2 =cp_xqData[j];
                                                    if(item2.x==i&&item2.y==pos.y&&item2.life){
                                                        movenum++;
                                                    }
                                                }
                                            }
                                        }
                                        if(movenum==1){
                                            isMove=true
                                        }
                                    }
                                }
                        }break;
                    }
            return isMove
        },
        isJiangjun(newdata,atcHom){//newdata:运算的棋子（可能没更新）的数据，actHom:进攻的回合一方（红方或绿方）
            let boss=null;
            let iskill=false
            if(atcHom=='红方'){
                for(let i=0;i<newdata.length;i++){
                    if(newdata[i].dos=='将'){
                        boss={pos:{x:newdata[i].x,y:newdata[i].y}}
                        break
                    }
                }
                if(boss!=null){
                    for(let i=0;i<newdata.length;i++){
                        if(newdata[i].hom==atcHom&&newdata[i].life){
                            if(this.ismove(boss.pos,i,newdata)){
                                iskill=true;
                                break;
                            }
                        }
                    }
                }else{
                    console.log('找不到将');
                }
            }else{
                for(let i=0;i<newdata.length;i++){
                    if(newdata[i].dos=='帅'){
                        boss={pos:{x:newdata[i].x,y:newdata[i].y}}
                        break
                    }
                }
                if(boss!=null){
                    for(let i=0;i<newdata.length;i++){
                        if(newdata[i].hom==atcHom&&newdata[i].life){
                            if(this.ismove(boss.pos,i,newdata)){
                                iskill=true;
                                break;
                            }
                        }
                    }
                }else{
                    console.log('找不到帅');
                }
            }
            return iskill;
        },
        forecast(forecastHom){//forecastHom:预测的一方，
            let newXqDataArray=[];
            for(let i=0;i<this.xq_Data.length;i++){
                
                if(this.xq_Data[i].life&&this.xq_Data[i].hom==forecastHom){
                    for(let j=0;j<this.xqpos.length;j++){
                        if(this.ismove(this.xqpos[j],i,this.xq_Data)){
                            
                            let isread=true
                            for(let s=0;s<this.xq_Data.length;s++){
                                if(this.xq_Data[s].hom!=forecastHom&&this.xq_Data[s].x==this.xqpos[j].x
                                    &&this.xq_Data[s].y==this.xqpos[j].y&&this.xq_Data[s].life){
                                    //预期吃子
                                    let newXqData = JSON.parse(JSON.stringify(this.xq_Data));
                                    newXqData[s].life=false;
                                    newXqData[i].x=this.xqpos[j].x;
                                    newXqData[i].y=this.xqpos[j].y;
                                    newXqDataArray.push(newXqData)
                                    isread = false;
                                    break;
                                }else if(this.xq_Data[s].hom==forecastHom&&this.xq_Data[s].x==this.xqpos[j].x
                                    &&this.xq_Data[s].y==this.xqpos[j].y&&this.xq_Data[s].life){
                                    //当同类时
                                    isread=false
                                    break;
                                }
                            }
                            if(isread){
                                let newXqData = JSON.parse(JSON.stringify(this.xq_Data));
                                
                                newXqData[i].x=this.xqpos[j].x;
                                newXqData[i].y=this.xqpos[j].y;
                                newXqDataArray.push(newXqData)
                            }
                        }
                    }
                }

            }

            for(let i=0;i<newXqDataArray.length;i++){
                if(!this.isJiangjun(newXqDataArray[i],(forecastHom=='红方'?'绿方':'红方'))){
                    //无法将死逻辑
					console.log(newXqDataArray[i]);
                    return false;
                }
            }
            return true;
        },
		Again(){
			
			if(this.currcom!=null){
				this.currcom.cdsn();
				this.currcom=null;
			}
			this.xq_Data=JSON.parse(JSON.stringify(this.intoXqdata));
			this.round='红方'
			this.lastXqdata='null'
			this.log=''
		},
		Regret(){
			if(this.lastXqdata!=null){
				
				if(this.lastXqdata=='null'){
					this.log='刚开始悔什么棋？'
				}else{
					if(this.currcom!=null){
						this.currcom.cdsn();
						this.currcom=null;
					}
					this.xq_Data=this.lastXqdata;
					this.round = (this.round=='红方')? '绿方':'红方'
					this.lastXqdata=null;
					this.log=''
				}
			}else{
				this.log='只能悔一次哦'
			}
		},
		setback(){
			this.backmusicSwitch=(this.backmusicSwitch=='开')?'关':'开'
		},
		setplay(){
			this.gameplayMusic=(this.gameplayMusic=='开')?'关':'开'
		}
    },
	watch:{
		backmusicSwitch(val){
			if(val=='开'){
				this.backmusic.play();
			}else{
				this.backmusic.pause();
			}
		},
		gameplayMusic(val){
			if(val=='开'){
				this.ectAudio.volume=1
				this.juesha.volume=1
				this.jiangjunAudio.volume=1
				this.move.volume=1
				this.xuanzhong.volume=1
			}else{
				this.ectAudio.volume=0
				this.juesha.volume=0
				this.jiangjunAudio.volume=0
				this.move.volume=0
				this.xuanzhong.volume=0
			}
		}
	}
})


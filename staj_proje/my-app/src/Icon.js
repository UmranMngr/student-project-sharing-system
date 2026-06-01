import React,{Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
class Icon extends Component{

    constructor(props){
     
      super(props);
      this.color=['primary','primary','primary','primary','primary','primary','primary','primary','primary']
      this.colorr=['primary','primary','primary','primary','primary']
      this.color1=['secondary','secondary','secondary','secondary','secondary','secondary','secondary','secondary']
      this.color2=['secondary','secondary','secondary','secondary','secondary','secondary','secondary','secondary']
      this.color3=['secondary','secondary','secondary','secondary','secondary','secondary','secondary','secondary']
      this.color4=['secondary','secondary','secondary','secondary','secondary','secondary','secondary','secondary']
      this.color5=['secondary','secondary','secondary','secondary','secondary','secondary','secondary','secondary']
      this.color6=['secondary','secondary','secondary','secondary','secondary','secondary','secondary','secondary']
      this.randomislem=['25+32=57','120/6=20','70*2=140','97-45=53','3*75=225','130+5=135']
      this.state={
        tümifade:'',
        tümifadee:'',
        tümifade1:'',
        tümifade2:'',
        tümifade3:'',
        tümifade4:'',
        tümifade5:'',
        tümifade6:'',
        randomislemm:'',
        marker:1,
        q:-1,
        sayı1:0,
        sayı2:0,
        sonuc:0,
        finish:0,
        lost:0,
        start:0,
        yenioyun:0
        
      }
      this.tahmin=this.tahmin.bind(this)
    }
  
  
tahmin=(event)=>{
  this.setState({tümifadee:event.target.value})
}
ekle=(event)=>{
  if(this.state.start===1 &&this.state.randomislemm!== ''){
    if(this.state.tümifade.length<8 ){
      var lastifade=this.state.tümifade
      this.setState({tümifade:lastifade+event});;
    }
    
  }
 
}

sil=()=>{
  var a=this.state.tümifade.length
  this.setState({tümifade:this.state.tümifade.substring(0,(a-1))})
}

satirkontrol(z,s){
  if(s===this.state.marker){
    switch(z){
      case 1:
        return 0;
      case 2:
        return 1;
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
        return 4;
      case 6:
        return 5;
      case 7:
        return 6;
      case 8:
        return 7;
    }
   
  }
  
  }

setcolor=(ifade,clr)=>{ 
  var newcolor=clr;
  for(var i=0;i<9;i++){
    if (ifade === this.state.randomislemm){
       this.setState({finish:1})
    }else{
      this.setState({lost:this.state.lost + 1})
    }
    if(this.state.randomislemm.includes(ifade.charAt(i)))
    {
      if (ifade.charAt(i) === this.state.randomislemm.charAt(i)) {
        newcolor[i]='success';
      }else{
        newcolor[i]='warning';
      }
    
    }else{
      newcolor[i]='dark';
    }
  }
}
kazandin=()=>{
 this.setState({finish:0})
 this.setState({lost:0})
 this.setState({start:0})
 this.setState({tümifade:''})
 this.setState({tümifadee:''})
 this.setState({tümifade1:''})
 this.setState({tümifade2:''})
 this.setState({tümifade3:''})
 this.setState({tümifade4:''})
 this.setState({tümifade5:''})
 this.setState({tümifade6:''})
 this.setState({marker:1})
 this.setState({sayı1:0})
 this.setState({sayı2:0})
 this.setState({sonuc:0})
 this.setState({})
 this.color=Array(8).fill('primary')
 this.colorr=Array(8).fill('primary')
 this.color1=Array(8).fill('secondary')
 this.color2=Array(8).fill('secondary')
 this.color3=Array(8).fill('secondary')
 this.color4=Array(8).fill('secondary')
 this.color5=Array(8).fill('secondary')
 this.color6=Array(8).fill('secondary')
}
play=()=>{
  this.kazandin()
  this.setState({randomislemm:this.randomislem[this.state.yenioyun]})
  this.setState({start:1})
  this.setState({yenioyun:this.state.yenioyun+1})
  document.getElementById("kontrol2").disabled = false;
}
hesapla=()=>{
  if(this.state.tümifadee.length===8){
    this.setState({tümifade:this.state.tümifadee})
  }
  var h=0;
  var j=0;
  var k=0;
  var c='';
  var y='';
  var m='';
  var sonuc2;
  for(var i=0;i<this.state.tümifade.length;i++){
    if(this.state.tümifade[i]==='+'||this.state.tümifade[i]==='-'||this.state.tümifade[i]==='*'||this.state.tümifade[i]==='/'){
      j=i
      c=this.state.tümifade[i]
    }
    else if(this.state.tümifade[i]==='='){
      k=i
  }
  }
  const sayı1 = parseInt(this.state.tümifade.substring(0, j));
  const sayı2 = parseInt(this.state.tümifade.substring(j + 1, k));
  const sonuc = parseInt(this.state.tümifade.substring(k + 1));
  
  if(c==='+'){sonuc2=sayı1+sayı2;}
  if(c==='-'){sonuc2=sayı1-sayı2;}
  if(c==='*'){sonuc2=sayı1*sayı2;}
  if(c==='/'){sonuc2=sayı1/sayı2;}

  if(sonuc!==sonuc2){
    alert("That guess doesnt compute!")
  }
  else if(this.state.tümifade.length!==8){
    alert("You can only enter 8 characters!")
  }
  if(this.state.tümifade.length===8){
    
      switch(this.state.marker){
        case 1:
          this.setState({marker:this.state.marker+1})
          this.setState({tümifade1:this.state.tümifade})
          m=this.color1;
          break;
        case 2:
          this.setState({marker:this.state.marker+1})
          this.setState({tümifade2:this.state.tümifade})
          m=this.color2;
          break;
        case 3:
          this.setState({marker:this.state.marker+1})
          this.setState({tümifade3:this.state.tümifade})
          m=this.color3;
          break;
        case 4:
          this.setState({marker:this.state.marker+1})
          this.setState({tümifade4:this.state.tümifade})
          m=this.color4;
          break;
        case 5:
          this.setState({marker:this.state.marker+1})
          this.setState({tümifade5:this.state.tümifade})
          m=this.color5;
          break;
        case 6:
          this.setState({marker:this.state.marker+1})
          this.setState({tümifade6:this.state.tümifade})
          m=this.color6;
          break;
        default:
          return 0;
      }
      y=this.state.tümifade;
      this.setcolor(y,m);
     
      
  this.setState({tümifade:''})
     
     
  }
 
}







    render(){
      const customButtonStyle = {
        width: '45px',
        height: '55px',
        borderRadius: '5px'
      };
      const customButtonStyle2 = {
        width: '80px',
        height: '55px',
        borderRadius: '5px'
      };
      const customButtonStyle3 = {
        width: '80px',
        height: '50px',
        borderRadius: '5px'
      };
      const customButtonStyle4 = {
        width: '200px',
        height: '50px',
        borderRadius: '4px'
      };
      const customButtonStyle5 = {
        width: '80px',
        height: '50px',
        borderRadius: '4px'
      };
        const columnButtonStyle={
            display:'flex',
            flexDirection:'column',
            gap:'4px',
          };
          const rowButtonStyle={
            display:'flex',
            flexDirection:'row',
            gap:'4px',
          };

       return(
        <>
        <form>
        <ButtonGroup style={columnButtonStyle} vertical>
        <ButtonGroup  style={rowButtonStyle} className="me-2" aria-label="First group">
        <Button variant={this.color1[0]} style={customButtonStyle} ><h3>{this.state.marker!==1? this.state.tümifade1[0]:this.state.tümifade[this.satirkontrol(1,1)]}</h3></Button>{' '}
        <Button variant={this.color1[1]} style={customButtonStyle} ><h3>{this.state.marker!==1? this.state.tümifade1[1]:this.state.tümifade[this.satirkontrol(2,1)]}</h3></Button>{' '}
        <Button variant={this.color1[2]} style={customButtonStyle} ><h3>{this.state.marker!==1? this.state.tümifade1[2]:this.state.tümifade[this.satirkontrol(3,1)]}</h3></Button>{' '}
        <Button variant={this.color1[3]} style={customButtonStyle} ><h3>{this.state.marker!==1? this.state.tümifade1[3]:this.state.tümifade[this.satirkontrol(4,1)]}</h3></Button>{' '}
        <Button variant={this.color1[4]} style={customButtonStyle} ><h3>{this.state.marker!==1? this.state.tümifade1[4]:this.state.tümifade[this.satirkontrol(5,1)]}</h3></Button>{' '}
        <Button variant={this.color1[5]} style={customButtonStyle} ><h3>{this.state.marker!==1? this.state.tümifade1[5]:this.state.tümifade[this.satirkontrol(6,1)]}</h3></Button>{' '}
        <Button variant={this.color1[6]} style={customButtonStyle} ><h3>{this.state.marker!==1? this.state.tümifade1[6]:this.state.tümifade[this.satirkontrol(7,1)]}</h3></Button>{' '}
        <Button variant={this.color1[7]} style={customButtonStyle} ><h3>{this.state.marker!==1? this.state.tümifade1[7]:this.state.tümifade[this.satirkontrol(8,1)]}</h3></Button>{' '}
          </ButtonGroup>
        <ButtonGroup  style={rowButtonStyle} className="me-2" aria-label="First group">
        <Button variant={this.color2[0]} style={customButtonStyle} ><h3>{this.state.marker!==2? this.state.tümifade2[0]:this.state.tümifade[this.satirkontrol(1,2)]}</h3></Button>{' '}
        <Button variant={this.color2[1]} style={customButtonStyle} ><h3>{this.state.marker!==2? this.state.tümifade2[1]:this.state.tümifade[this.satirkontrol(2,2)]}</h3></Button>{' '}
        <Button variant={this.color2[2]} style={customButtonStyle} ><h3>{this.state.marker!==2? this.state.tümifade2[2]:this.state.tümifade[this.satirkontrol(3,2)]}</h3></Button>{' '}
        <Button variant={this.color2[3]} style={customButtonStyle} ><h3>{this.state.marker!==2? this.state.tümifade2[3]:this.state.tümifade[this.satirkontrol(4,2)]}</h3></Button>{' '}
        <Button variant={this.color2[4]} style={customButtonStyle} ><h3>{this.state.marker!==2? this.state.tümifade2[4]:this.state.tümifade[this.satirkontrol(5,2)]}</h3></Button>{' '}
        <Button variant={this.color2[5]} style={customButtonStyle} ><h3>{this.state.marker!==2? this.state.tümifade2[5]:this.state.tümifade[this.satirkontrol(6,2)]}</h3></Button>{' '}
        <Button variant={this.color2[6]} style={customButtonStyle} ><h3>{this.state.marker!==2? this.state.tümifade2[6]:this.state.tümifade[this.satirkontrol(7,2)]}</h3></Button>{' '}
        <Button variant={this.color2[7]} style={customButtonStyle} ><h3>{this.state.marker!==2? this.state.tümifade2[7]:this.state.tümifade[this.satirkontrol(8,2)]}</h3></Button>{' '}
          </ButtonGroup>
        <ButtonGroup  style={rowButtonStyle} className="me-2" aria-label="First group">
        <Button variant={this.color3[0]} style={customButtonStyle} ><h3>{this.state.marker!==3? this.state.tümifade3[0]:this.state.tümifade[this.satirkontrol(1,3)]}</h3></Button>{' '}
        <Button variant={this.color3[1]} style={customButtonStyle} ><h3>{this.state.marker!==3? this.state.tümifade3[1]:this.state.tümifade[this.satirkontrol(2,3)]}</h3></Button>{' '}
        <Button variant={this.color3[2]} style={customButtonStyle} ><h3>{this.state.marker!==3? this.state.tümifade3[2]:this.state.tümifade[this.satirkontrol(3,3)]}</h3></Button>{' '}
        <Button variant={this.color3[3]} style={customButtonStyle} ><h3>{this.state.marker!==3? this.state.tümifade3[3]:this.state.tümifade[this.satirkontrol(4,3)]}</h3></Button>{' '}
        <Button variant={this.color3[4]} style={customButtonStyle} ><h3>{this.state.marker!==3? this.state.tümifade3[4]:this.state.tümifade[this.satirkontrol(5,3)]}</h3></Button>{' '}
        <Button variant={this.color3[5]} style={customButtonStyle} ><h3>{this.state.marker!==3? this.state.tümifade3[5]:this.state.tümifade[this.satirkontrol(6,3)]}</h3></Button>{' '}
        <Button variant={this.color3[6]} style={customButtonStyle} ><h3>{this.state.marker!==3? this.state.tümifade3[6]:this.state.tümifade[this.satirkontrol(7,3)]}</h3></Button>{' '}
        <Button variant={this.color3[7]} style={customButtonStyle} ><h3>{this.state.marker!==3? this.state.tümifade3[7]:this.state.tümifade[this.satirkontrol(8,3)]}</h3></Button>{' '}
          </ButtonGroup>
        <ButtonGroup  style={rowButtonStyle} className="me-2" aria-label="First group">
        <Button variant={this.color4[0]} style={customButtonStyle} ><h3>{this.state.marker!==4? this.state.tümifade4[0]:this.state.tümifade[this.satirkontrol(1,4)]}</h3></Button>{' '}
        <Button variant={this.color4[1]} style={customButtonStyle} ><h3>{this.state.marker!==4? this.state.tümifade4[1]:this.state.tümifade[this.satirkontrol(2,4)]}</h3></Button>{' '}
        <Button variant={this.color4[2]} style={customButtonStyle} ><h3>{this.state.marker!==4? this.state.tümifade4[2]:this.state.tümifade[this.satirkontrol(3,4)]}</h3></Button>{' '}
        <Button variant={this.color4[3]} style={customButtonStyle} ><h3>{this.state.marker!==4? this.state.tümifade4[3]:this.state.tümifade[this.satirkontrol(4,4)]}</h3></Button>{' '}
        <Button variant={this.color4[4]} style={customButtonStyle} ><h3>{this.state.marker!==4? this.state.tümifade4[4]:this.state.tümifade[this.satirkontrol(5,4)]}</h3></Button>{' '}
        <Button variant={this.color4[5]} style={customButtonStyle} ><h3>{this.state.marker!==4? this.state.tümifade4[5]:this.state.tümifade[this.satirkontrol(6,4)]}</h3></Button>{' '}
        <Button variant={this.color4[6]} style={customButtonStyle} ><h3>{this.state.marker!==4? this.state.tümifade4[6]:this.state.tümifade[this.satirkontrol(7,4)]}</h3></Button>{' '}
        <Button variant={this.color4[7]} style={customButtonStyle} ><h3>{this.state.marker!==4? this.state.tümifade4[7]:this.state.tümifade[this.satirkontrol(8,4)]}</h3></Button>{' '}
          </ButtonGroup>
        <ButtonGroup  style={rowButtonStyle} className="me-2" aria-label="First group">
        <Button variant={this.color5[0]} style={customButtonStyle} ><h3>{this.state.marker!==5? this.state.tümifade5[0]:this.state.tümifade[this.satirkontrol(1,5)]}</h3></Button>{' '}
        <Button variant={this.color5[1]} style={customButtonStyle} ><h3>{this.state.marker!==5? this.state.tümifade5[1]:this.state.tümifade[this.satirkontrol(2,5)]}</h3></Button>{' '}
        <Button variant={this.color5[2]} style={customButtonStyle} ><h3>{this.state.marker!==5? this.state.tümifade5[2]:this.state.tümifade[this.satirkontrol(3,5)]}</h3></Button>{' '}
        <Button variant={this.color5[3]} style={customButtonStyle} ><h3>{this.state.marker!==5? this.state.tümifade5[3]:this.state.tümifade[this.satirkontrol(4,5)]}</h3></Button>{' '}
        <Button variant={this.color5[4]} style={customButtonStyle} ><h3>{this.state.marker!==5? this.state.tümifade5[4]:this.state.tümifade[this.satirkontrol(5,5)]}</h3></Button>{' '}
        <Button variant={this.color5[5]} style={customButtonStyle} ><h3>{this.state.marker!==5? this.state.tümifade5[5]:this.state.tümifade[this.satirkontrol(6,5)]}</h3></Button>{' '}
        <Button variant={this.color5[6]} style={customButtonStyle} ><h3>{this.state.marker!==5? this.state.tümifade5[6]:this.state.tümifade[this.satirkontrol(7,5)]}</h3></Button>{' '}
        <Button variant={this.color5[7]} style={customButtonStyle} ><h3>{this.state.marker!==5? this.state.tümifade5[7]:this.state.tümifade[this.satirkontrol(8,5)]}</h3></Button>{' '}
          </ButtonGroup>
        <ButtonGroup  style={rowButtonStyle} className="me-2" aria-label="First group">
        <Button variant={this.color6[0]} style={customButtonStyle} ><h3>{this.state.marker!==6? this.state.tümifade6[0]:this.state.tümifade[this.satirkontrol(1,6)]}</h3></Button>{' '}
        <Button variant={this.color6[1]} style={customButtonStyle} ><h3>{this.state.marker!==6? this.state.tümifade6[1]:this.state.tümifade[this.satirkontrol(2,6)]}</h3></Button>{' '}
        <Button variant={this.color6[2]} style={customButtonStyle} ><h3>{this.state.marker!==6? this.state.tümifade6[2]:this.state.tümifade[this.satirkontrol(3,6)]}</h3></Button>{' '}
        <Button variant={this.color6[3]} style={customButtonStyle} ><h3>{this.state.marker!==6? this.state.tümifade6[3]:this.state.tümifade[this.satirkontrol(4,6)]}</h3></Button>{' '}
        <Button variant={this.color6[4]} style={customButtonStyle} ><h3>{this.state.marker!==6? this.state.tümifade6[4]:this.state.tümifade[this.satirkontrol(5,6)]}</h3></Button>{' '}
        <Button variant={this.color6[5]} style={customButtonStyle} ><h3>{this.state.marker!==6? this.state.tümifade6[5]:this.state.tümifade[this.satirkontrol(6,6)]}</h3></Button>{' '}
        <Button variant={this.color6[6]} style={customButtonStyle} ><h3>{this.state.marker!==6? this.state.tümifade6[6]:this.state.tümifade[this.satirkontrol(7,6)]}</h3></Button>{' '}
        <Button variant={this.color6[7]} style={customButtonStyle} ><h3>{this.state.marker!==6? this.state.tümifade6[7]:this.state.tümifade[this.satirkontrol(8,6)]}</h3></Button>{' '}
          </ButtonGroup>
        </ButtonGroup>
        </form>
        <form>
            <ButtonGroup style={columnButtonStyle} vertical>
               
                <br></br>
                <ButtonGroup  style={rowButtonStyle} className="justify-content-md-center" aria-label="First group">
                  <div className="col">
                  <input type="text"  id="kontrol2" disabled={true}  onChange={this.tahmin} className="justify-content-md-center"size="lg"  ></input>{' '}
                  <Button  onClick={() => this.hesapla()} style={customButtonStyle5} variant='info' size="lg" >Check</Button>{' '}
                  
                  </div>
                  <br></br>
                 </ButtonGroup>
                <ButtonGroup  style={rowButtonStyle} className="justify-content-md-center" aria-label="First group">
                  <Button onClick={() => this.ekle("1")} style={customButtonStyle} variant={this.color[1]}  className="justify-content-md-center"size="lg" >1</Button>{' '}
                  <Button onClick={() => this.ekle("2")} style={customButtonStyle} variant={this.color[2]} size="lg" >2</Button>{' '}
                  <Button onClick={() => this.ekle("3")} style={customButtonStyle} variant={this.color[3]} size="lg" >3</Button>{' '}
                  <Button onClick={() => this.ekle("4")} style={customButtonStyle} variant={this.color[4]} size="lg" >4</Button>{' '}
                  <Button onClick={() => this.ekle("5")} style={customButtonStyle} variant={this.color[5]} size="lg" >5</Button>{' '}
                  <Button onClick={() => this.ekle("6")} style={customButtonStyle} variant={this.color[6]} size="lg" >6</Button>{' '}
                  <Button onClick={() => this.ekle("7")} style={customButtonStyle} variant={this.color[7]} size="lg" >7</Button>{' '}
                  <Button onClick={() => this.ekle("8")} style={customButtonStyle} variant={this.color[8]} size="lg" >8</Button>{' '}
                  <Button onClick={() => this.ekle("9")} style={customButtonStyle} variant={this.color[9]} size="lg" >9</Button>{' '}
                  <Button onClick={() => this.ekle("0")} style={customButtonStyle} variant={this.color[0]} size="lg" >0</Button>{' '}
                </ButtonGroup>

    
                <ButtonGroup className="justify-content-md-center" style={rowButtonStyle} aria-label="First group">
                  <Button onClick={() => this.ekle("+")} style={customButtonStyle} variant={this.colorr[0]} size="lg" >+</Button>{' '}
                  <Button onClick={() => this.ekle('-')} style={customButtonStyle} variant={this.colorr[1]} size="lg" >-</Button>{' '}
                  <Button onClick={() => this.ekle("*")} style={customButtonStyle} variant={this.colorr[2]} size="lg" >*</Button>{' '}
                  <Button onClick={() => this.ekle("/")} style={customButtonStyle} variant={this.colorr[3]} size="lg" >/</Button>{' '}
                  <Button onClick={() => this.ekle("=")} style={customButtonStyle} variant={this.colorr[4]} size="lg" >=</Button>{' '}
                  <Button onClick={() => this.hesapla()} style={customButtonStyle2} variant="primary" size="lg" >Enter</Button>{' '}
                  <Button onClick={() => this.sil()} style={customButtonStyle2} variant="primary" size="lg" >Delete</Button>{' '}
                </ButtonGroup>
                <ButtonGroup  style={rowButtonStyle} className="justify-content-md-center" aria-label="First group">
                  <div className="col">
                  <Button onClick={() => this.play()} style={customButtonStyle3} variant="success" size="lg" >PLAY</Button>{' '}
                  </div>
                </ButtonGroup>
                <ButtonGroup  style={rowButtonStyle} className="justify-content-md-center" aria-label="First group">
                  <div className="col">
                  {this.state.finish===1 && <Button style={customButtonStyle4} variant="info" size="lg" >YOU WON!!</Button>}
                  {this.state.lost===6 && <Button style={customButtonStyle4} variant="warning" size="lg" >YOU LOST</Button>}
                  </div>
                 
                 </ButtonGroup>
                
            </ButtonGroup>
        </form>

        </> 
    )
    }
  }
export default Icon;


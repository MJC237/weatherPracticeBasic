import React from 'react';

import './App.css';
const apiKey = '53df5b52f003d1bd1df16a7f6f299393';


class App extends React.Component{//初始化值
       constructor(){
       super();
      this.state={
      
       zipcode : '27403',
  
       weather:null,
      

      }

  
}



        async componentDidMount(){   //获取天气
          const weather=await this.fetchWeather();
                  this.setState(
                    {
                      weather,
                       
                    }
                  );
                  console.log(weather)
              
               
}

        fetchWeather=async () =>{// 读取天气
             
              return await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zipcode}&appid=${apiKey} `)
              .then(data=>{ return data.json();})
                
              }

      

  render(){

//遍历数据，拿出每天的温度
    const list = () => {

      let {weather}=this.state;
        const res = [];
       
            for(let i = 0; i < weather.list.length; i++) {
              const kelvin=weather.list[i].main.temp;
              const celcius=Math.floor(kelvin-273.15);//转换为celcius
              res.push(

              <li key={i}>
                    <span className="colorFont">第{i+1}天 
                    </span>  {celcius}°C
              </li>)

            }
      return res
    }


          if(!this.state.weather){
            return null;
          }
          if(!this.state.zipcode){
            return null;
          }

   
          let {weather}=this.state;
                                          
        return(
         
            <div className="App">


              <h2> {weather.city.country}  {weather.city.name}  {weather.cnt} 天未来天气预测</h2>
                  <ul className="deteleUnderLine">

                      {list()  }   {/*调用函数释*/}

                  </ul>


                       
                            <input type="text"  value={this.state.zipcode}/> 
                                  

                            <button style={{color:'blue', borderRadius:'10px',marginLeft:"10px",backgroundColor:"yellow"}}>获取天气</button>
                       


          </div>

                
        )

  }
  
}

export default App;

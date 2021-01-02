import {useState,useEffect} from "react";
import "./App.css"; 

function App() {
  let [dateFrom,setDateFrom] = useState(""); 
  let [dateTo,setDateTo] = useState("");
  let [interval,setInterval] = useState(30);
  let [result,setResult] = useState([]);
  let [intervalError,setIntervalError] = useState(false);
  let [validationError,setValidationError] = useState(false);
  
  useEffect(()=>{
    let numInterval = interval*1;
    if(numInterval===30||numInterval===15||numInterval===1) {
      setIntervalError(false); 
    } else {
      setIntervalError(true);
    }
  },[interval])



  const findResult = ()=>{
    let numbers = [];
    let convertedResult = [];
    let from = dateFrom.slice(0,2)*1;
    from =from*60+(dateFrom.slice(3,5)*1); 
    let to = dateTo.slice(0,2)*1; 
    to = to*60+(dateTo.slice(3,5)*1); 
    let numInterval = interval*1; 
    if(from>to){      
      setResult([]);
      setValidationError(true);     
    } else {
      setValidationError(false);
      numbers.push(from);           
      from+=numInterval;   
      while(from<to) {
        numbers.push(from); 
        from+=numInterval; 
      } 
      numbers.push(to); 
      
      numbers.map((item)=>{
        let hours = Math.floor(item/60);
        let minutes = (item-(hours*60));
        if(hours<10){
          hours = "0"+hours; 
        }
        if(minutes<10){
          minutes= "0"+minutes;
        }
        convertedResult.push(" "+hours+":"+minutes+" ");
      })

      setResult(convertedResult);


    }
  }

  return(
   <div>
     <div>
     <label>Time From: <br/></label>
     <input type="time"  value={dateFrom} onChange={(e)=>{setDateFrom(e.target.value)}}/>
     </div>

     <div>
       <label>Time To: <br/></label>
       <input type="time" value={dateTo} onChange={(e)=>{setDateTo(e.target.value)}} />
     </div>

     <div> 
       <label>Interval: <br/></label>
       <input type="text" value={interval} onChange={(e)=>{setInterval(e.target.value)}} /> <br/>
       <label>{intervalError?"Possible Value: 30,15,1":""}</label>
     </div>


     <div>
       <button className={`${intervalError?"btn-disabled":""}`}
       onClick={()=>(findResult())}>Click</button> 
     </div>

     <div>
       <label>Result: <br/></label>
       {validationError?"Validation error. Time from must be less than Time to":""}
       {result}
     </div>
     
   </div>
 )
  
}

export default App;

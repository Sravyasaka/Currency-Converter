let dropdowns=document.querySelectorAll(".select-container select");
let amount=document.querySelector(".amount input");
let btn=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let BASE_URL="https://v6.exchangerate-api.com/v6/bfe94c20137ab818b6a1de72/latest";


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let newImg=element.parentElement.querySelector("img");
    newImg.src=newSrc;
    
};
const CalculateRate= async()=>{
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<0){
        amountVal=1;
        amount.value="1";
    }
    let URL=`${BASE_URL}/${fromCurr.value}`
    let response= await fetch(URL);
    let data= await response.json();
    data=data.conversion_rates;
   // console.log(data);
    let rate=data[toCurr.value];
    finalAmt=amountVal*rate;
    msg.innerText=`${amountVal} ${fromCurr.value}=${finalAmt} ${toCurr.value}`
    
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    CalculateRate();
      
});

window.addEventListener("load", () => {
    CalculateRate();
  });






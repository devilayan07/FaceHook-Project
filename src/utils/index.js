export const getDateDifferenceFromNow=(fromDate)=>{
  let difference=new Date().getTime()-new Date(fromDate).getTime()

   difference/1000;
   let dayDiference=Math.floor(difference/(24*60*60))
  let hourDifference=Math.floor(difference/3600)
  difference -= hourDifference*3600
  let minuteDifference=Math.floor(difference/60)
  difference -= minuteDifference*60

  let message;
  if(dayDiference>1){
    message=`${dayDiference} day`
  }
  if(hourDifference>0){
    message=message ? `${message} ${hourDifference} hour`:`${hourDifference} hour`;
  }
  if(minuteDifference>0){
    message=message ? `${message} ${minuteDifference} minutes`:`${minuteDifference} minutes`;
  }
    if(difference>0){
    message=message ? `${message} ${Math.round(difference)} seconds`:`${Math.round(difference)} seconds`;
  }

return message
}
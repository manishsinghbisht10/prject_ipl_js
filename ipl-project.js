// require csvtojson
const csv=require('csvtojson')

//Question 1- Number of matches played per year of all the years in IPL.
async function matchesPlayedPerYear(){

    var data=await csv().fromFile("matches.csv")

    var map={}
    for(var i in data)
    {
        var yr=data[i].season

        if(map[yr])
        {
            map[yr]=map[yr]+1
        }
        else
        {
            map[yr]=1
        }
    }
    return map
}

//Question 2 - Number of matches won of all teams over all the years of IPL.
async function matchesWonOfAllTeams(){

    var data=await csv().fromFile("matches.csv")

    var map={}
    for(var i=0 in data)
    {
        var winner=data[i].winner
        if(map[winner])
        {
          map[winner]=  map[winner]+1
        }
        else
        {
          map[winner]=1
        }
    }
    return map
}

//Question 3 -For the year 2016 get the extra runs conceded per team.
async function extraRunConcededPerTeam(){

    var matches=await csv().fromFile("matches.csv")
    var deliveries=await csv().fromFile("deliveries.csv")

    var arr=[]
    var map={}

    for(var i=0 in matches)
    {
        var yr=matches[i].season
        if(yr==="2016")
        {
            arr.push(matches[i].id)
        }
    }

    for(var j=0 in deliveries)
    {
        var Id=deliveries[j].match_id

        if(arr.includes(Id))
        {
            let temp=deliveries[j].bowling_team

            if(map[temp])
            {
                map[temp]=map[temp]+parseInt(deliveries[j].extra_runs)
            }
            else
            {
                map[temp]=parseInt(deliveries[j].extra_runs)
            }
        }
    }

    return map
}

//Question 4 -For the year 2015 get the top economical bowlers.
async function topEconmicalBowlers(){

    var matches=await csv().fromFile("matches.csv")
    var deliveries=await csv().fromFile("deliveries.csv")

    var arr=[]
    var dict={}
    var dict2={}

    for(var i=0 in matches)
    {
        var yr=matches[i].season
        if(yr==="2015"){
            arr.push(matches[i].id)
        }
    }

    for(var i=0 in deliveries){
        var Id=deliveries[i].match_id

        if(arr.includes(Id)){

            var bowler=deliveries[i].bowler
            var runs=parseInt(deliveries[i].total_runs)

            if(dict[bowler]){
                dict[bowler]+=runs
                dict2[bowler]+=1
            }else{
                dict[bowler]=runs
                dict2[bowler]=1
            }
        }
    }

    for(var key in dict){
        var temp=dict2[key]
        temp=temp/6;
        dict[key]=dict[key]/temp; // values are in float
    }


     var economyOfBowler = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
      }).sort(function(a, b){
        return a[1] - b[1]; });

    return economyOfBowler
}

// end of the code
//call for  QUESTION: 1
var matches=matchesPlayedPerYear()

matches.then((data)=>{
    console.log("Number of matches played per year of all the years in IPL")
    console.log(data)
}).catch((err)=>{
    console.log(err)
})


//call for  QUESTION: 2
var winners=matchesWonOfAllTeams()

winners.then((data)=>{
    console.log("Number of matches won of all teams over all the years of IPL.")
    console.log(data)
}).catch((err)=>{
    console.log(err)
})

//call for  QUESTION: 3
var runs=extraRunConcededPerTeam()

runs.then((data)=>{
    console.log("For the year 2016 get the extra runs conceded per team.")
    console.log(data)
}).catch((err)=>{
    console.log(err)
})

//call for  QUESTION: 4
var bowlers=topEconmicalBowlers()
bowlers.then((data)=>{
    console.log("For the year 2015 get the top economical bowlers.")
    data.reverse()
    for(let i=0;i<10;i++){
        console.log(data[i])
    }
}).catch((err)=>{
    console.log(err)
})

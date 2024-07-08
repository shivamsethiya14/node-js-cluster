// const cluster=require("cluster"); 
// const express=require("express"); 
// const app=express(); 
// const total_cpus=require("os").cpus().length; 
import cluster from "cluster"
import express from "express"
const app=express(); 
import os from "os"
const total_cpus=os.cpus().length;

if(cluster.isMaster){ 
	console.log(`Master process ${process.pid} is running`); 
	
	// Fork child processes(workers) 
	for(let i=0;i<total_cpus;i++){ 
	cluster.fork(); 
	} 
	
	cluster.on("exit",(worker,code,signal)=>{ 
	console.log(`Worker process ${worker.process.pid} died`); 
	}); 
} else { 
	console.log(`Worker process ${process.pid} started running`); 
	
	const port=2323; 
    app.get("/",(req,res)=>{
        
            return  res.json({message:`hellow from express server ${process.pid}`})
    
    })
	app.listen(port,(req,res)=>{ 
	console.log(`server running at port ${port}`); 
	}); 
}

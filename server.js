import cluster from "node:cluster"
import os from "os"
import express from "express"


const totalcpu= os.cpus().length;
// console.log(totalcpu);
if (cluster.isPrimary) {
    for (let i = 0; i < totalcpu; i++) {
        cluster.fork();
        
    }
}
else{
    const app =express();
    const PORT=8000;
    app.get("/",(req,res)=>{
        return  res.json({message:`hellow from express server ${process.pid}`})
    })
    app.listen(PORT,()=>console.log(`Server started at port:${PORT}`))
}
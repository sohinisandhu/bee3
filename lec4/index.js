let product = [{
    name:"Samsung",
    amount:70000,  
},
{
    name:"Iphone 16",
    amount:100000
}
]
function buyProduct(product_Name,cb){
    //do some aysc operation
    // setTimeout(()=>{
    //     console.log("all thr I/O is completed and all the details")
    //     cb();
    // },0)
    let isProduct = product.filter((p)=>p.name==product_Name)[0];
    // console.log(isProduct)
    if(!isProduct){
        // agar yha hum return karte heh toh else lagane ki jarurat nahi heh
        cb("Product is not available",null)
    }
    else{
        cb(null,isProduct.amount);
    }  
}
let avalamount = 20000
function deductbankamount(amount,cb){
    if(amount>avalamount){
        return cb("Bank Balance is low",null)
    }
    else{
        avalamount -= amount;
        cb(null,"amount deducted");
    }
    
}
buyProduct("Iphone 16",function(err,amount){
    //console.log("produt is purchased!!");
    if(err){
        return console.log(err);
    }
    console.log(amount);
    deductbankamount(amount,function(err,message){
        if(err){
            return console.log(err);
        }
    console.log(message);
    })
})
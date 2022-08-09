var clientName=document.getElementById("fname");
var paymentAmount= document.getElementById("Fee");
var serviceDescription = document.getElementById("Descr");
var startDate = document.getElementById("stDate");
var endDate = document.getElementById("endDate");
var Form = document.getElementById("frm");
var btnSubmit = document.getElementById("submit");
var btnDownload = document.getElementById("btnDown");
var error = document.getElementById("error");
var error2 = document.getElementById("errDownload");
var downloadName= document.getElementById("Dname");
var downloadAmount= document.getElementById("Damount");
var downloadDescription= document.getElementById("Ddescr");
var downloadStartDate = document.getElementById("DstDate");
var downloadEndDate = document.getElementById("DendDate");
var downloadLocation1 = document.getElementById("loc1");
var downloadLocation2 = document.getElementById("loc2");
var downloadSign1 = document.getElementById("Sign1");
var downloadSign2 = document.getElementById("Sign2");

var stDate;
var enDate;
var Clname;
var amount;
var description;
var formAvailable=false;
var Clients=[];
var i=0 //Counter tracks amount of 
            //fields that have ben completed

Form.addEventListener('submit',(e) => {
    e.preventDefault();

    checkInputs();

    }
)

//Saves all inputs into variables
function checkInputs()
{
  
    if (clientName.value != ""){
        Clname=clientName.value;
        i++;
    }
    if (startDate.value != ""){
        stDate= startDate.value;
        i++;
    }
    if (endDate.value != ""){
        enDate= endDate.value;
        //Check if date is valid
        if(enDate<stDate){
            errorMessage();
        }
        else{
            i++;
            error.innerHTML = ""
        }
        
       
    }
    if (paymentAmount.value!= ""){
        amount= paymentAmount.value;
        i++;
    }
    if (serviceDescription.value != ""){
        description= serviceDescription.value;
        i++;
    } 
      
    if(i>=5)
    {
        formAvailable=true;
        //Object for client details
        let Client=
        {
            id:Date.now(),
            Name: Clname,
            start_Date: stDate,
            end_Date: enDate,
            service_Cost:amount,
            service_Description: description

        }
        //Clients pushed into an array of Clients
        Clients.push(Client)
    }  
 
}


btnDownload.onclick= function(){download()


} 


function download()
{
   
    
    if(formAvailable)
    {
        //The following is for display on PDF purposes only
        error2.innerHTML="";
        downloadName.innerHTML=Clients[0].Name;
        downloadAmount.innerHTML= Clients[0].service_Cost;
        downloadDescription.innerHTML = Clients[0].service_Description;
        downloadStartDate.innerHTML = Clients[0].start_Date;
        downloadEndDate.innerHTML = Clients[0].end_Date;
        downloadLocation1.innerHTML = document.getElementById("location").value;
        downloadLocation2.innerHTML = document.getElementById("location2").value;
        downloadSign1.innerHTML = document.getElementById("Jobox_Sign").value;
        downloadSign2.innerHTML = document.getElementById("Signature").value;

        var doc = new jsPDF( {orientation: 'landscape'});
        var elementHTML = document.getElementById("contr");
        
        doc.fromHTML(elementHTML 
        );

        // Save the PDF
        doc.save('Contract.pdf');
        downloadName.innerHTML="";
        downloadAmount.innerHTML= "";
        downloadDescription.innerHTML = "";
        downloadStartDate.innerHTML = "";
        downloadEndDate.innerHTML = "";
        downloadLocation1.innerHTML = "";
        downloadLocation2.innerHTML = "";
        downloadSign1.innerHTML = "";
        downloadSign2.innerHTML = "";
            
                
    }
    else{
        errorMessage2();
    }
   
}

function errorMessage() {
    error.innerHTML = "Invalid dates";
   
    
}

function errorMessage2() {
    error2.innerHTML = "No form(s) available for download";
    
}
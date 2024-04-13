// var description = `CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface Port-channel10 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface Port-channel12 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TenGigabitEthernet1/1/2 on Node BHPODOSMIN15 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/3 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/41 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/43 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/44 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/45 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/7 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/8 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/9 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/1 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/35 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/41 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/43 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/44 on Node AU-OLP-ADM-IT-DSW01 is Down.
// Site Info: BHPB1036-AU/OLP/Olympic Dam Mine
// Device details:
// au-olp-adm-it-dsw01-10.149.151.1
// bhpodosmin15-10.149.14.15`


function print_all_Interfaces() {

    document.getElementById('result').value = "";
    var input = document.getElementById('description').value.trim();
    var total_Count = 0;
    deviceBox = [];
    let word = input.replace(/\n/g, " ").split(' ')
    //get devices details
    DEVICES_LIST = word.forEach(function (device, currentIndex) {
        //  console.log(device + ": " + currentIndex);
        if (device == 'details:') {
            // console.log('Device Details:');
            for (let i = currentIndex + 1; i < word.length; i++) {
                let node_full_name = word[i];
                let ip = node_full_name.substr(node_full_name.lastIndexOf("-") + 1)
                let node_name = node_full_name.slice(0, node_full_name.lastIndexOf("-"));
                //  console.log(node_name);
                deviceBox.push({ "Node_Name": node_name, "IP": ip, "Interfaces_Name": [] })

            }

        }

    });
    //  console.log(deviceBox)


    // Get Interfaces details of corresponding nodes
    INTERFACES_LIST = word.map(function (elem, currentIndex) {
        if (elem === 'Interface') {
            deviceBox.forEach(nodeObj => {
                //    console.log(nodeObj.Node_Name.toUpperCase() +"<->"+ word[currentIndex + 4].toUpperCase())
                if (nodeObj.Node_Name.toUpperCase() === word[currentIndex + 4].toUpperCase()) {

                    nodeObj.Interfaces_Name.push(elem + " " + word[currentIndex + 1]);
                }
                // accumulator.push(deviceBox)
            });
            total_Count++;

        }

    })





    // console.log("Update: ")
    //  console.log(" - Total " + total_Count + " interfaces are down from " + deviceBox.length + " devices. \n");
    str1 = "- Total " + total_Count + " interfaces are down from " + deviceBox.length + " devices. \n"
    

    str2 = "";
    deviceBox.forEach((nodeObj, index) => {

        // console.log("\t   " + (index + 1) + ". " + nodeObj.Node_Name + "(" + nodeObj.IP + ") ----> "
        //     + nodeObj.Interfaces_Name.length + " interfaces down.");

        let str3 = "\t   " + (index + 1) + ". " + nodeObj.Node_Name + "(" + nodeObj.IP + ") ----> "
            + nodeObj.Interfaces_Name.length + " interfaces down.\n";

        str2 += str3;

    })
    let str4 = "____________________________________________________________________________________\n\n"
    
   // console.log("____________________________________________________________________________________\n")

    str5 = "";
    str10 = ""
    deviceBox.forEach((nodeObj, index) => {
        
        // console.log((index + 1) + " -> Node name: " + nodeObj.Node_Name);
        // console.log("     IP Address: " + nodeObj.IP);
       
        // console.log("--------------Below " + nodeObj.Interfaces_Name.length + " interfaces are down------------------\n");
        let str6 = (index + 1) + " -> Node name: " + nodeObj.Node_Name;
        let str7 = "\n     IP Address: " + nodeObj.IP;
        let str8 = "\n\n--------------Below " + nodeObj.Interfaces_Name.length + " interfaces are down------------------\n\n"
        str5 = str10 + str6 + str7 + str8;
        //  console.log(nodeObj.Interfaces_Name.join("\n"))
        str9 = ""
        nodeObj.Interfaces_Name.forEach(interface => (
            // console.log(interface + "\n")
             str9 +=  interface + "\n"
        ))
       
        let str11 = "\n=========================================================================\n\n";
      //  console.log("=========================================================================\n")

      str10 = str5 + str9 + str11;

    });
    
    document.getElementById('result').value =  `UPDATE:\n` + str1 + str2 + str4 + str10;
    
    return deviceBox;
}

function copyToClipboard() {
    var result = document.getElementById('result');
    result.select();
    document.execCommand('copy');
    showBanner();
   // alert("Text copied successfully!");
}
function showBanner() {
    var banner = document.getElementById('banner');
    banner.style.display = 'block';
    setTimeout(function() {
        banner.style.display = 'none';
    }, 3000);
}

// var description = `CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface Port-channel10 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface Port-channel12 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TenGigabitEthernet1/1/2 on Node BHPODOSMIN15 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/3 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/41 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/43 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/44 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/45 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/7 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/8 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE1/0/9 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/1 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/35 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/41 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/43 on Node AU-OLP-ADM-IT-DSW01 is Down. CRITICAL_INTERFACE_DOWN: Device NET-CORE_SWITCH Interface TwentyFiveGigE2/0/44 on Node AU-OLP-ADM-IT-DSW01 is Down.
// Site Info: BHPB1036-AU/OLP/Olympic Dam Mine
// Device details:
// au-olp-adm-it-dsw01-10.149.151.1
// bhpodosmin15-10.149.14.15`


var isClickingFirstTime = true;

function print_all_Interfaces() {
    document.getElementById('result').value = "";
    // var input = e.target.value
    var currentInput = document.getElementById('description').value.trim();

    var total_Count = 0;
    deviceBox = [];

    let word = currentInput.replace(/\n/g, " ").split(' ')
    //get devices details
    DEVICES_LIST = word.forEach(function (device, currentIndex) {
        // console.log(device + ": " + currentIndex);
        if (device == 'details:') {
            // console.log('Device Details:');
            for (let i = currentIndex + 1; i < word.length; i++) {
                let node_full_name = word[i].trim();
                if (isIP_Found(node_full_name) !== false) {
                    let ip = isIP_Found(node_full_name);
                    let startIndexOfIP = node_full_name.indexOf(ip);
                    let node_name = node_full_name.slice(0, startIndexOfIP - 1);
                    // console.log("node_name: " + node_name + " and IP: " + ip);
                    deviceBox.push({ "Node_Name": node_name, "IP": ip, "Interfaces_Name": [] })
                }
                else {
                    continue;
                }

                // let ip = node_full_name.substr(node_full_name.lastIndexOf("-") + 1)
                // let node_name = node_full_name.slice(0, node_full_name.lastIndexOf("-"));


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
            str9 += interface + "\n"
        ))

        let str11 = "\n============================================================\n\n";
        //  console.log("=========================================================================\n")

        str10 = str5 + str9 + str11;

    });

    document.getElementById('result').value = `UPDATE:\n` + str1 + str2 + str4 + str10;


    createNodesButtons(deviceBox)


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
    setTimeout(function () {
        banner.style.display = 'none';
    }, 3000);
}
async function copyNodeUpCmd() {
    var copy_cmd = document.getElementById('copy_cmd');
    // Add a click event listener to the button

    // Select all the <p> elements inside the button
    var pElements = copy_cmd.querySelectorAll('p');

    // Create an array to hold the texts to be copied
    var textsToCopy = [];

    // Loop over the <p> elements and add their text to the array
    pElements.forEach(function (pElement) {
        textsToCopy.push(pElement.textContent.trim());
    });

    // Join the texts with newlines and copy to the clipboard
    try {
        await navigator.clipboard.writeText(textsToCopy.join('\n'));

        // Display the banner
        showBanner();
    } catch (error) {
        // An error occurred while trying to copy the text
        console.error('Error copying text: ', error);
    }


    // alert("Text copied successfully!");
}

function createNodesButtons(Nodes) {


    // Select the div with the class 'button-container'
    var nodesContainer = document.querySelector('.AllNodeButtons');
    while (nodesContainer.firstChild) {
        nodesContainer.removeChild(nodesContainer.firstChild);
    }


    // Define the number of buttons you want to create
    var numberOfButtons = Nodes.length;

    // Loop to create buttons
    for (let i = 0; i < numberOfButtons; i++) {
        // Create a new button element
        var button = document.createElement('button');

        // Set the button's type to 'button'
        button.type = 'button';

        // Set the button's text
        button.innerHTML = Nodes[i].Node_Name + '-' + Nodes[i].IP;
        //  console.log(Nodes[i])

        // Add a click event listener to the button
        // We can use an Immediately Invoked Function Expression (IIFE) to create a new scope for each button.
        button.addEventListener('click', function (Nodes) {
            return function () {
                selectedButton(button, Nodes[i].Interfaces_Name, Nodes[i].Interfaces_Name.length);
            }

        }(Nodes));


        // Add the button to the button container
        nodesContainer.appendChild(button);
        // alert(i)

    }


}

async function selectedButton(button, Interfaces_Name, numberOfInterfaces) {
    //  console.log(Nodes[i])


    // Define the text you want to copy
    var INTF_CMD_TextToCopy = ''
    for (var j = 0; j < numberOfInterfaces; j++) {

        let interfaceName = Interfaces_Name[j];
        let lineBreak = ' \n\n ';
        let cmd1 = ' sh ' + interfaceName + '\n';
        let cmd2 = ' sh run ' + interfaceName + '\n';
        let cmd3 = ' sh logg | i ' + interfaceName.substr(interfaceName.indexOf(" ") + 1) + '\n'; 
        INTF_CMD_TextToCopy += cmd1 + lineBreak + cmd2 + lineBreak + cmd3 + lineBreak + lineBreak + lineBreak;

    }
    // console.log( INTF_CMD_TextToCopy)

    // Copy the text to the clipboard
    try {
        // Copy the text to the clipboard
        await navigator.clipboard.writeText(INTF_CMD_TextToCopy);

        // Create a span element to display the message
        var span = document.createElement('span');
        span.textContent = ' Copied Command Successfully!';
        span.style.color = 'green';
        span.style.border = '1px solid green';
        span.style.padding = '5px';
        span.style.marginLeft = '10px';
        span.style.borderRadius = '5px';

        // Add the span to the button
        button.parentNode.insertBefore(span, button.nextSibling);

        // Remove the span after 3 seconds
        setTimeout(function () {
            span.remove();
        }, 1000);
        // The text has been copied to the clipboard
        console.log('Text copied to clipboard');
    } catch (error) {
        // An error occurred while trying to copy the text
        console.error('Error copying text: ', error);
    }
}

function isIP_Found(currentInput) {
  
    // let ipPattern = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/gm;
    let ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

    // match(sentence) return all matched regex in a array, null otherwise
    let matches = currentInput.match(ipPattern);
    // console.log(currentInput)
    // console.log(matches == null)
    if (matches === null) {
        return false;
    }
    else {
        // returning IP
        return matches[0];
    }
    
}

function print_all_IPs(){
     document.getElementById('result').value = "";
    // var input = e.target.value
    var currentInput = document.getElementById('description').value.trim();
    IP_Box = "";

    let word = currentInput.replace(/\n/g, " ").split(' ')
    //get devices details
    word.forEach(function (device) {
        // console.log(device +" -> "+isIP_Found(device))
        if (isIP_Found(device) !== false) {
            let cmd = 'ping ' + isIP_Found(device) + '\n';
            IP_Box += cmd;

        }
    })


    document.getElementById('result').value = IP_Box;
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show the selected page
    document.getElementById(pageId).classList.add('active');
}

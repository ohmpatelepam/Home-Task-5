export class view {
    //Helper function to setup
    constructor(controller) {
        this.cntrl = controller;
        this.init();
    }
    
    init = () => {
        this.setupHeader();
        this.setupFooter();
        this.setupMain();
        this.cntrl.removeLoader();
    }
    //setting up the footer
    setupFooter = () => {

        var h1 = this.createElement("h1", "footer1", "");
        h1.innerHTML = " © NewsFeed 2019";
        document.getElementById("footer").appendChild(h1);
    }
    //setting up the header
    setupHeader = () => {
        var h1 = this.createElement("h2", "", "head");
        h1.innerHTML = "NEWSFEED <span class=" + "subhead" + "> Yet another Newsfeed </span>";
        document.getElementById("heading").appendChild(h1);

        let input = this.createElement("input", "", "input");
        input.type = "text";
        input.placeholder = " Email Address";
        document.getElementById("heading").appendChild(input);

        let subscribe_button = this.createElement("button", "", "subscribe-button");
        subscribe_button.innerHTML = "Subscribe";
        subscribe_button.addEventListener("click", this.validateEmail);
        document.getElementById("heading").appendChild(subscribe_button);
    }
    //helper function to set up the main content
    setupMain = () => {

        var main_tag = document.getElementById("main_content");
        this.createAside(main_tag);
        this.createContentDiv(main_tag);
        this.createPopUp();
    }
    //setting up the side pannel
    createAside = (parent_node) => {
        let aside = this.createElement("aside", "", "");
        parent_node.appendChild(aside);
        let category = this.createElement("p", "", "");
        category.innerHTML = "SELECT CATEGORY";
        category.style.fontStyle = "bold";
        aside.appendChild(category);

        var newList = this.createElement("select", "", "dropdown");
        newList.addEventListener("change", this.setupdropdown);
        newList.appendChild(new Option("All", "all"));
        const data = this.cntrl.getAllKeys();
        
        for (var key of data) {
            newList.appendChild(new Option(key, key));
        }
        aside.appendChild(newList);

        let error_text = this.createElement("p", "", "error_text");
        error_text.innerHTML = "";
        aside.appendChild(error_text);

        let headlines = this.createElement("button","","headline-button");
        headlines.innerHTML = "Headlines";
        headlines.onclick = () => {
            this.cntrl.loadHeadlineFile();
        }
        aside.appendChild(headlines);
    }
    //creating main content of each cell
    createContentDiv = (parent_node) => {
        window.Content_Div = this.createElement("div", "content-div", "");
        parent_node.appendChild(window.Content_Div);
        window.Content_Div.innerHTML = "";
        this.showAllChannels(Content_Div);
    }
    // creating the elements of main content
    createInsideDiv = (parent_node,key,v) => {


        var inside_div = this.createElement("div", "inside-div", "");
        parent_node.appendChild(inside_div);

        let img = this.createElement("img", "img", "");
        img.src = (v.imageurlText == null) ? ("assets/errorimage.jpg") : (v.imageurlText);
        inside_div.appendChild(img);

        let h1 = this.createElement("h1", "title", "news_title");
        h1.innerHTML = v.sourceText;
        h1.title = v.sourceText;
        inside_div.appendChild(h1);

        let p = this.createElement("p", "subscript", "")
        p.innerHTML = `<span class=" + "posted" + ">Posted on: </span> ${(v.dateText)} <span class=" + "posted" + ">// Author: </span> ${v.authorText}`;
        inside_div.appendChild(p);

        let lorem = this.createElement("p", "lorem", "");
        lorem.innerHTML = (v.contentText != null) ? (v.contentText) : (v.descriptionText);
        lorem.appendChild(this.createElement("br", "", ""));
        inside_div.appendChild(lorem);

        let Continue_reading_button = this.createElement("button", "button", "");
        Continue_reading_button.innerHTML = "Continue Reading";
        Continue_reading_button.addEventListener("click", () => {
            this.showPopUP(key,v);
        });
        inside_div.appendChild(Continue_reading_button);
        parent_node.appendChild(document.createElement("hr"));
    }
   
    //Implemented Popup
    createPopUp = () => {
        let parent = document.getElementById("heading");
        let modal = this.createElement("div", "modal", "myModal");
        parent.appendChild(modal);

        let modal_content = this.createElement("div", "modal-content", "");

        modal.appendChild(modal_content);

        let modal_header = this.createElement("div", "modal-header", "");

        modal_content.appendChild(modal_header);

        let close = this.createElement("span","close","");
        close.onclick = () => {
            modal.style.display = "none";
        }
        close.innerHTML = "&times";
        modal_header.appendChild(close);

        let heading = this.createElement("h2", "", "modal-header")
        modal_header.appendChild(heading);

        let modal_body = this.createElement("div", "", "modal-body")

        modal_content.appendChild(modal_body);

        let para = this.createElement("p", "", "modal-para");
        modal.style.display = "none";
        modal_body.appendChild(para);

    }
    // helper function to show all the channels
    showAllChannels = (Content_Div) => {

        Content_Div.innerHTML = "";
        const data = this.cntrl.getAll();
        for (var [key,val] of data) {
            for(var v of val){
                this.createInsideDiv(Content_Div,key, v);
            }
        }
    }
    // helper function to show specif channel based on channel selection
    showSpecificChannel = (option) => {

        let news_channel = option;
        window.Content_Div.innerHTML = "";
        const arr = (this.cntrl.getAll()).get(news_channel);
        for(var v of arr){
            this.createInsideDiv(window.Content_Div,news_channel,v);
        }
    }

    //Implemented dropdown
    setupdropdown = () => {
        let e = document.getElementById("dropdown");
        let option = e.options[e.selectedIndex].value;
        
        (option != "all") ? (this.showSpecificChannel(option)): (this.showAllChannels(window.Content_Div));
    }

    //helper function to validate the email
    validateEmail = () => {

        const email = document.getElementById("input").value;
        const error_text_field = document.getElementById("error_text");
        error_text_field.style.visibility = "visible";
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

            let emails = JSON.parse(localStorage.getItem("email"));
            if (emails == null) {
                emails = [];
            }
            if (emails.includes(email)) {

                error_text_field.innerHTML = "Email Already Exist..!";
                error_text_field.style.backgroundColor = "yellow";
                error_text_field.style.visibility = "visible";
                document.getElementById("input").value = ""
                setTimeout(this.Clear, 1000);
                return
            }
            emails.push(email);
            localStorage.setItem("email", JSON.stringify(emails));
            error_text_field.innerHTML = "Email Saved";
            error_text_field.style.backgroundColor = "Green";
            error_text_field.style.visibility = "visible";
            document.getElementById("input").value = "";
            setTimeout(this.Clear, 1000);
            return;
        }
        error_text_field.innerHTML = "Email Wrong";
        error_text_field.style.backgroundColor = "red";
        setTimeout(this.Clear, 1000);
    }
    //helper function to show the popup on button click
    showPopUP = (key,v) => {
        
        var full_news = (v.contentText != null) ? (v.contentText) : (v.descriptionText);
        document.getElementById("modal-para").innerHTML = full_news;
        document.getElementById("modal-header").innerHTML = key;
        document.getElementById("myModal").style.display = "block";
    }

    //function to clear the error text
    Clear = () => {
        document.getElementById("error_text").style.visibility = "hidden";
    }
    // helper function to create elements
    createElement = (type, classname, id) => {

        var element = document.createElement(type);
        element.className = classname || "";
        element.id = id || "";
        return element;
    }
}






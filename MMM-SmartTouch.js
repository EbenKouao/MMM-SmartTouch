/* Magic Mirror
 * MMM-SmartTouch.js
 *
 * By SmartBuilds.io - Pratik and Eben
 * https://smartbuilds.io
 * MIT Licensed.
 */

Module.register("MMM-SmartTouch", {
    // Default module config.
    defaults: {
        text: "",
        position: "bottom_center",
        refreshInterval: 0
    },

    start: function() {

        console.log(this.name + " has started...");

        this.sendSocketNotification("CONFIG", this.config);
    },

    getStyles: function () {
        return [this.file('css/mmm-smarttouch.css'),'font-awesome.css'];
    },


    // Override dom generator.
    getDom: function() {
    
        var wrapper = document.createElement("div");
        wrapper.className = 'simple-logo__container';
        wrapper.innerHTML = "Hello, World!"
        wrapper.classList.add(this.config.position);
        wrapper.style.width = this.config.width;
        var text = document.createTextNode(this.config.text);
        wrapper.appendChild(text);
        var img = document.createElement("img");
        img.setAttribute('src', this.config.fileUrl);
        //wrapper.appendChild(img);

        //Home Button
        var home_div = document.createElement("div");

        var simpleBlock = document.createElement("div");
        simpleBlock.id = 'standby';
        home_div.appendChild(simpleBlock);


        home_div.className = 'icons';

        var home_icon = document.createElement("div");


        home_icon.className = 'home-icon';

        home_div.appendChild(home_icon);
        var home_span = document.createElement("span");
        home_icon.appendChild(home_span);
        home_div.classList.add(this.config.position);
        home_div.style.width = this.config.width;
        home_div.appendChild(text);


        function StandBy() {
          var x = document.getElementById("standby");
          var hideUI = document.body;
          document.body.className = "hideUI";


          if (x.style.display === "none") {
            x.style.display = "block";
            hideUI.classList.toggle('fade');
            home_div.style.visibility = "visible"
   
          } else {
            x.style.display = "none";
            hideUI.classList.toggle('show');
            home_div.style.visibility = "visible"

          }
        }

        //Menu Button
        var mobile_toggle_div = document.createElement("div");
        mobile_toggle_div.className = 'mobile-toggle';
        mobile_toggle_div.id = "show"
        home_div.appendChild(mobile_toggle_div)

        
        var one_icon = document.createElement("div");
        one_icon.className = 'mobile-toggle one';
        mobile_toggle_div.appendChild(one_icon);

        var two_icon = document.createElement("div");
        two_icon.className = 'two';
        mobile_toggle_div.appendChild(two_icon);

        var three_icon = document.createElement("div");
        three_icon.className = 'three';
        mobile_toggle_div.appendChild(three_icon);
        
        //mobile_toggle_div.classList.add(this.config.position);
        //mobile_toggle_div.style.width = this.config.width;

        home_icon.addEventListener("click", () => StandBy());


        function SideMenu() {
          
        //#BGN #DBH Commenting out the SideMenu because I don't like it
        // Eventually, I might make this configurable from the Config file
        //
        //var mobile_toggle_div_t = document.getElementById("show")
        //mobile_toggle_div.classList.toggle('show');
        //var main_menu_t = document.getElementById("navbar")
        //main_menu.classList.toggle('show')
        return
        
        }

        //mobile_toggle_div.addEventListener("click", () => SideMenu());
        //#END #DBH

        //Main Menu Bar
        var main_menu = document.createElement("div");
        main_menu.className = "main-menu"
        main_menu.id = "navbar"
        home_div.appendChild(main_menu)
        var main_menu_ul = document.createElement("ul");
        main_menu_ul.className = "navbar-nav"
        main_menu.appendChild(main_menu_ul)
        
        //Power Off Button
        var main_menu_li_shutdown = document.createElement("li");
        main_menu_li_shutdown.innerHTML = "<span class='fa fa-power-off fa-3x'></span>" + "<br>Shutdown <hr>";
        main_menu_li_shutdown.className = "li-t"
        main_menu_ul.appendChild(main_menu_li_shutdown)

        //Onclick event to send shutdown notification
        main_menu_li_shutdown.addEventListener("click", () => this.sendSocketNotification("SHUTDOWN", {}));

        //Restart Button
        var main_menu_li_restart = document.createElement("li");
        main_menu_li_restart.innerHTML = "<span class='fa fa-repeat fa-3x'></span>" + "<br>Restart";
        main_menu_li_restart.className = "li-t"
        main_menu_ul.appendChild(main_menu_li_restart)
        main_menu_li_restart.addEventListener("click", () => this.sendSocketNotification("RESTART", {}));


        
        return home_div;
    },

    notificationReceived: function(notification, payload, sender) {
        
        if (notification === "Recieved") {
            //this.doMenuAction(payload);
            console.log("Hi")
        }

    },

    //Recieve notification from sockets via nodehelper.js
    socketNotificationReceived: function(notification, payload) {
    

    switch(notification) {
      case "Sent":
          
        console.log("Hi");
         
      break;

  }
},

});

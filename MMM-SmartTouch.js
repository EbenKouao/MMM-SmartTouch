/* Magic Mirror
 * MMM-SmartTouch.js
 *
 * By SmartBuilds.io - Pratik and Eben
 * https://smartbuilds.io
 * MIT Licensed.
 */

Module.register("MMM-SmartTouch", {
  // Default module config."
  defaults: {
    text: "",
    position: "bottom_center",
    refreshInterval: 0
  },

  start: function () {
    console.log(this.name + " has started...");
    this.sendSocketNotification("CONFIG", this.config);
  },

  getStyles: function () {
    return [this.file("css/mmm-smarttouch.css"), "font-awesome.css"];
  },

  createContainerDiv: function() {
    const homeDiv = document.createElement("div");
    homeDiv.className = "st-container";
  },

  createStandByButtonDiv: function () {
    const standByDiv = document.createElement("div");
    standByDiv.className = "st-container__standby";

    return standByDiv;
  },

  createMenuToggleButtonDiv: function () {
    const mobileToggleDiv = document.createElement("div");
    mobileToggleDiv.className = "st-container__menu-toggle";

    const hamburgerLineOne = document.createElement("div");
    hamburgerLineOne.className = "st-toggle__line_one";

    const hamburgerLineTwo = document.createElement("div");
    hamburgerLineTwo.className = "st-toggle__line_two";

    const hamburgerLineThree = document.createElement("div");
    hamburgerLineThree.className = "st-toggle__line_three";

    mobileToggleDiv.appendChild(hamburgerLineOne);
    mobileToggleDiv.appendChild(hamburgerLineTwo);
    mobileToggleDiv.appendChild(hamburgerLineThree);

    return mobileToggleDiv;
  },

  createMainMenuDiv: function() {
    const homeDiv = document.createElement("div");
    homeDiv.className = "smart-touch-container";
  },

  createHomeDiv: function () {
    const homeDiv = document.createElement("div");
    homeDiv.className = "icons";

    // StandBy Icon
    const standByDiv = this.createStandByDiv();
    homeDiv.appendChild(standByDiv);

    // Home Icon
    const homeIconDiv = this.createHomeIconDiv();

    function StandBy() {
      const x = document.getElementById("standby");
      const hideUI = document.body;
      document.body.className = "hideUI";

      if (x.style.display === "none") {
        x.style.display = "block";
        hideUI.classList.toggle("fade");
        homeDiv.style.visibility = "visible"
      } else {
        x.style.display = "none";
        hideUI.classList.toggle("show");
        homeDiv.style.visibility = "visible"
      }
    }

    homeIconDiv.addEventListener("click", () => StandBy());
    homeDiv.appendChild(homeIconDiv);

    return homeDiv;
  },

  createHomeIconDiv: function () {
    const homeIconDiv = document.createElement("div");
    homeIconDiv.className = "home-icon";

    const homeSpan = document.createElement("span");
    homeIconDiv.appendChild(homeSpan);

    return homeIconDiv;
  },

  getDom: function () {
    const container = this.createContainerDiv();

    return container;
  },

  // Override dom generator.
  getDom2: function () {
    // View
    const container = this.createContainerDiv()

    const standByButton = this.createStandByButtonDiv()
    container.appendChild(standByButton)

    const menuToggleButton = this.createMenuToggleButtonDiv()
    container.appendChild(menuToggleButton)

    const mainMenu = this.createMainMenuDiv()
    container.appendChild(mainMenu)

    // Controller



    // Home Button
    const homeButtonDiv = this.createHomeDiv();

    // Menu Toggle Button
    const menuToggleButtonDiv = this.createMenuToggleButtonDiv();
    function SideMenu() {
      const mobile_toggle_div_t = document.getElementById("show")
      menuToggleButtonDiv.classList.toggle("show");

      const main_menu_t = document.getElementById("navbar")
      main_menu.classList.toggle("show")
    }
    menuToggleButtonDiv.addEventListener("click", () => SideMenu());

    homeButtonDiv.appendChild(menuToggleButtonDiv)

    // Main Menu Bar
    var main_menu = document.createElement("div");
    main_menu.className = "main-menu"
    main_menu.id = "navbar"
    homeButtonDiv.appendChild(main_menu)
    var main_menu_ul = document.createElement("ul");
    main_menu_ul.className = "navbar-nav"
    main_menu.appendChild(main_menu_ul)

    //Power Off Button
    var main_menu_li_shutdown = document.createElement("li");
    main_menu_li_shutdown.innerHTML = "<span class='fa fa-power-off fa-3x'></span>"
        + "<br>Shutdown <hr>";
    main_menu_li_shutdown.className = "li-t"
    main_menu_ul.appendChild(main_menu_li_shutdown)

    //Onclick event to send shutdown notification
    main_menu_li_shutdown.addEventListener("click",
        () => this.sendSocketNotification("SHUTDOWN", {}));

    //Restart Button
    var main_menu_li_restart = document.createElement("li");
    main_menu_li_restart.innerHTML = "<span class='fa fa-repeat fa-3x'></span>"
        + "<br>Restart";
    main_menu_li_restart.className = "li-t"
    main_menu_ul.appendChild(main_menu_li_restart)
    main_menu_li_restart.addEventListener("click",
        () => this.sendSocketNotification("RESTART", {}));

    return homeButtonDiv;
  },

  notificationReceived: function (notification, payload, sender) {
    if (notification === "Recieved") {
      //this.doMenuAction(payload);
      console.log("Hi")
    }
  },

  //Recieve notification from sockets via nodehelper.js
  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case "Sent":
        console.log("Hi");
        break;
    }
  },

});

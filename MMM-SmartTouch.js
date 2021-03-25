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

  createContainerDiv: function () {
    const containerDiv = document.createElement("div");
    containerDiv.className = "st-container";

    return containerDiv;
  },

  toggleStandby: function () {
    const existingBodyClass = document.body.className;
    if (existingBodyClass === "st-standby show") {
      document.body.className = "st-standby fade";
    } else {
      document.body.className = "st-standby show";
    }
  },

  createStandByButtonDiv: function () {
    const standByButtonDiv = document.createElement("div");
    standByButtonDiv.className = "st-container__standby-button";

    standByButtonDiv.appendChild(document.createElement("span"))
    standByButtonDiv.addEventListener("click", () => this.toggleStandby());

    return standByButtonDiv;
  },

  toggleSideMenu: function () {
    const menuToggleDiv = document.getElementById("st-menu-toggle")
    menuToggleDiv.classList.toggle('show');

    const mainMenuDiv = document.getElementById("st-main-menu")
    mainMenuDiv.classList.toggle('show')
  },

  createMenuToggleButtonDiv: function () {
    const menuToggleButtonDiv = document.createElement("div");
    menuToggleButtonDiv.className = "st-container__menu-toggle";
    menuToggleButtonDiv.id = "st-menu-toggle";

    const hamburgerLineOne = document.createElement("div");
    hamburgerLineOne.className = "st-container__menu-toggle st-toggle__bar_one";

    const hamburgerLineTwo = document.createElement("div");
    hamburgerLineTwo.className = "st-toggle__bar_two";

    const hamburgerLineThree = document.createElement("div");
    hamburgerLineThree.className = "st-toggle__bar_three";

    menuToggleButtonDiv.appendChild(hamburgerLineOne);
    menuToggleButtonDiv.appendChild(hamburgerLineTwo);
    menuToggleButtonDiv.appendChild(hamburgerLineThree);

    menuToggleButtonDiv.addEventListener("click", () => this.toggleSideMenu());

    return menuToggleButtonDiv;
  },

  createMainMenuDiv: function () {
    const mainMenuDiv = document.createElement("div");
    mainMenuDiv.className = "st-container__main-menu";
    mainMenuDiv.id = "st-main-menu";

    return mainMenuDiv;
  },

  getDom: function () {
    // Initial standby state
    document.body.className = "st-standby show";

    const container = this.createContainerDiv();

    const standByButton = this.createStandByButtonDiv();
    container.appendChild(standByButton);

    const menuToggleButton = this.createMenuToggleButtonDiv();
    container.appendChild(menuToggleButton);

    const mainMenu = this.createMainMenuDiv();
    container.appendChild(mainMenu);

    return container;
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

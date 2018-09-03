var openPanel;
$(document).ready(function() {
  openPanel = function(evt, panel_name) {
    // Declare all variables
    var i, panel, tool_button;

    // Get all elements with class="panel" and hide them
    panel = document.getElementsByClassName("panel");
    for(i = 0; i < panel.legth; i++)
      panel[i].style.display = "none";

    // Get all elements with class="tool_button" and remove the class "active"
    tool_button = document.getElementsByClassName("tool_button");
    for(i = 0; i < tool_button.length; i++)
      tool_button[i].className = tool_button[i].className.replace(" active", "");

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(panel_name).style.display = "flex";
    evt.currentTarget.className += " active";

    // document.getElementById("defaultOpen").click();
  }
});

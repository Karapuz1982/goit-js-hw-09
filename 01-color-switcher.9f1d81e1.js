!function(){var t,e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]"),n=function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"));document.body.style.backgroundColor=t};e.addEventListener("click",(function(){e.disabled=!0,t=setInterval(n,1e3)})),a.addEventListener("click",(function(){e.disabled=!1,clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.9f1d81e1.js.map

// ==UserScript==
// @name         Pokéfarm Tweaks
// @namespace    https://sus.omg.lol
// @version      0.1.7
// @description  Enhancements for Pokefarm!
// @author       Vukky
// @match        https://pokefarm.com
// @match        https://pokefarm.com/users/*
// @match        https://pokefarm.com/user/*
// @match        https://pokefarm.com/summary**
// @match        https://pokefarm.com/party
// @match        https://pokefarm.com/forum/thread/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pokefarm.com
// @downloadURL  https://raw.githubusercontent.com/Vukkyy/userscripts/main/pokefarmtweaks.user.js
// @updateURL    https://raw.githubusercontent.com/Vukkyy/userscripts/main/pokefarmtweaks.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.head.innerHTML += "<style>.boingo { animation:boingo 2s; } .goawayy { animation:goawayy 2s; } @keyframes boingo {from {margin:0;animation-timing-function:ease-out;}10% {margin:-12px 0 12px;animation-timing-function:ease-in;}20% {margin:0;animation-timing-function:ease-out;}30% {margin:-12px 0 12px;animation-timing-function:ease-in;}40% {margin:0;}} @keyframes goawayy {from {margin:0;}5% {margin:0 6px 0 -6px;}10% {margin:0 -6px 0 6px;}15% {margin:0;}}"

    window.addEventListener("click", function(event) {
        console.log(event.target);
        if(event.target.parentNode.parentNode.classList.contains("action")) {
            let pokename = nameMappery(event.target.parentNode.parentNode.parentNode.querySelector(".name .summarylink").innerText.toLowerCase(), event.target.parentNode.parentNode.parentNode);
            new Audio("https://play.pokemonshowdown.com/audio/cries/" + pokename + ".mp3").play();
            event.target.parentNode.parentNode.parentNode.querySelector(".pokemon").classList.add("boingo")
            event.target.parentNode.parentNode.parentNode.querySelector(".icon").classList.add("boingo")
        }
        if(event.target.parentNode.parentNode.querySelector(".egg") && event.target.parentNode.classList.contains("action")) {
            new Audio("https://play.pokemonshowdown.com/audio/notification.wav").play();
            event.target.parentNode.parentNode.querySelector(".egg").classList.add("goawayy")
        }
        if(event.target.getAttribute("data-hatch") == "") {
            console.log("HATCING!!");
            setTimeout(function(gus) {
                console.log(gus);
                let pokename = nameMappery(gus.querySelector(".name .summarylink").innerText.toLowerCase(), gus);
                new Audio("https://play.pokemonshowdown.com/audio/cries/" + pokename + ".mp3").play();
            }, 3500, event.target.parentNode.parentNode);
        }
    });

    function nameMappery(pokename, partyitem) {
        let mappedSpecials = {
            "flying pikachu": "pikachu",
            "apocalyptic growlithe": "growlithe",
            "birthday eltafez": "mightyena",
            "birthday novan": "pikachu",
            "birthday riley": "rockruff",
            "birthday ravyne": "jirachi",
            "birthday salamence": "salamence",
            "birthsei": "poochyena",
            "birthday garthic": "riolu",
            "birthday absol": "absol",
            "let's go eevee": "eevee-starter",
            "let's go pikachu": "pikachu-starter",
            "shooting star cleffa": "cleffa",
            "shooting star clefable": "clefable",
            "shooting star clefairy": "clefairy",
            "snoralts": "ralts",
            "snolia": "kirlia",
            "frosvoir": "gardevoir",
            "glaillade": "gallade"
        }
        if(mappedSpecials[pokename]) pokename = mappedSpecials[pokename]
        return pokename;
    }
})();

// ==UserScript==
// @name         Dark Mode for Skribbl
// @author       positivelypositive
// @include      *https://skribbl.io/*
// @run-at       document-start
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @require      https://raw.githubusercontent.com/pie6k/jquery.initialize/master/jquery.initialize.js
// @require      http://code.jquery.com/ui/1.12.1/jquery-ui.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */
//Credit to pie6k on GitHub for jquery.initialize.js.

(function(){
    var elem;
    var accessory = 'black';
    let loop = setInterval(function(){
        if ($('body').css('background-image') == 'url("https://skribbl.io/res/background.png")'){
            elem = $('<div id="overlay" style="background-color:black; opacity:1; position:fixed; pointer-events:none; top:0; z-index: 99999"></div>').appendTo(document.body);
            clearInterval(loop);
        }
    }, 4);

    $(document).ready(() => {
        main();
    });

    async function main(){

        $('#containerBoard').append($(`<div id="darken" name="darken" style="width:100%; height:100%; top:0; background-color:black; border:black; pointer-events:none; position:absolute; opacity:0.15">`));
        $('#boxChat').before($(`<div style="text-align:bottom">
<input id="scroll" name="scroll" style="width:117px;" type="range"; min:0; max:100; value:15; position: relative;>
<label for="scroll" style="all: initial; color:white; position: absolute; padding-top: 5px; font-family:calibri; width:100%;">Canvas Darkness: 15</label><br>`));
        $('#boxMessages').css('margin-top', '20px');
        $('#boxMessages').css('height', 'calc(100% - 87px)');
        $("body").css('background-size', 'auto');
        var darkness = localStorage.getItem('darkness');

        if (darkness == null){
            darkness = 15;
        }

        $('#scroll').attr('value', darkness);
        $('#darken').css('opacity', darkness/100);
        localStorage.setItem('darkness', darkness);
        label(darkness);

        $('#scroll').on('input', function() {
            $('#darken').css('opacity', this.value/100);
            label(this.value);
        });
        $("#formLogin").append($(`<div style="background-color:transparent; position:relative; float:left;
top:0px; width:25%; text-align:center; margin:0;">
<input id="black" name="black" style="width:16px; height:16px; margin-top:15px" type="radio">
<label for="black" style="all: initial; color:white; font-family:calibri; vertical-align:2px; width:25%;">Black</label><br>`))
            .append($(`<div style="background-color:transparent; position:relative; float:left;
top:0px; width:25%; text-align:center; margin:0;">
<input id="grey" name="grey" style="width:16px; height:16px; margin-top:15px" type="radio">
<label for="grey" style="all: initial; color:white; font-family:calibri; vertical-align:2px; width:25%;">Grey</label><br>`))
            .append($(`<div style="background-color:transparent; position:relative; float:left;
top:0px; width:25%; text-align:center; margin:0;">
<input id="carbon" name="carbon" style="width:16px; height:16px; margin-top:15px" type="radio">
<label for="carbon" style="all: initial; color:white; font-family:calibri; vertical-align:2px; width:25%;">Carbon</label><br>`))
            .append($(`<div style="background-color:transparent; position:relative; float:left;
top:0px; width:25%; text-align:center; margin:0;">
<input id="wood" name="wood" style="width:16px; height:16px; margin-top:15px" type="radio">
<label for="wood" style="all: initial; color:white; font-family:calibri; vertical-align:2px; width:25%;">Wood</label><br>`));

        var preset = localStorage.getItem('background');
        if (preset !== null){
            if (preset == "black"){black();}
            else if (preset == "grey"){grey();}
            else if (preset == "carbon"){carbon();}
            else{wood();}
        }
        else{black();}

        $(".logo").attr('src', 'https://i.imgur.com/qsHVGvg.png');
        $("#logoAvatarContainer").remove();
        $(".loginPanelContent")
            .css('background-color','transparent')
            .css('box-shadow', 'none')
            .eq(1).css('margin-top','31px');
        $("small").css('font-size','75%');
        $("#loginAvatarCustomizeContainer")
            .css('background-color','transparent')
            .css('border','transparent');
        $(".btn")
            .css('background-color','transparent')
            .css('border-color','white')
            .css('color','white')
            .css('padding','2px 16px')
            .css('font-size','16px')
            .css('border-radius','4px');
        $(".form-control")
            .css('background-color', 'transparent')
            .css('color', 'white')
            .css('padding','4px 12px');
        $("body")
            .css('font-family','calibri')
            .css('color','white');
        $(".avatarArrow")
            .css('width','25px')
            .css('height','25px');
        $(".avatarArrow.avatarArrowLeft, .avatarArrow.avatarArrowRight").css('background-image', 'url(https://i.imgur.com/aM3Wi4I.png)');
        $("#audio")
            .css('width','32px')
            .css('height','32px')
            .css({
            left: "unset",
            right: "0px",
        });
        if ($('#audio').attr("style") == 'width: 32px; height: 32px; left: unset; right: 0px;'){
            $("#audio").css('background', 'url(https://i.imgur.com/EalUCVJ.gif)');
        }
        else if ($('#audio').attr("style") == 'background-image: url("res/audio_off.gif"); width: 32px; height: 32px; left: unset; right: 0px;'){
            $("#audio").css('background', 'url(https://i.imgur.com/EbWX9aT.gif)');
        }

        $(".updateInfo")
            .css('background-color', 'transparent')
            .css('color', 'white')
            .css('border', 'white');
        $('.lobbyName')
            .css('color', 'white')
            .css('background-color', 'transparent');
        $('a, a:visited').css('color', 'white');
        $('.informationTabs a').css('color', 'white');
        $(".gameHeader").css('background-color', 'transparent');
        $("#timer").css('background', 'transparent');
        $('.modal-content').css('background-color', accessory);
        $('.score').css('color', 'white');
        $('.rank').css('color', 'white');
        $('.tool').css('background-color', 'transparent');
        $("#boxChat").css('background', 'transparent');
        $(".size").css('background-color','white');
        $('.player').css('background', 'transparent');
        $('.lobbyContent').css('background-color', 'transparent');
        $('.invite-overlay').remove();
        $('#invite').css('background-color', 'transparent');
        $("#containerChat").css('background', 'transparent');
        $("#containerFreespace").css('background', 'transparent');
        $(".brushSize").css('background-color','transparent');

        await delay(400);
        fadeout(400);

        setInterval(function(){
            $('.player').css('background', 'transparent');
            $('#containerGamePlayers').find('.rank, .name, .score').css('color', 'white');
            $('.name:contains(" (You)")').css('color', 'rgb(75, 160, 255)');
            $('.player.guessedWord')
                .find('.rank, .name, .score').css('color', 'rgb(86, 206, 39)');
        }, 20);

        $('#black').click(function() {
            black();
        });

        $('#grey').click(function() {
            grey();
        });

        $('#wood').click(function() {
            wood();
        });

        $('#carbon').click(function() {
            carbon();
        });

        $.initialize('p[style="color: rgb(0, 0, 0);"]', function(){
            $(this).css("color", "white");
        });

        $.initialize('p[style="color: rgb(0, 0, 0); background: transparent;"]', function(){
            $(this).css("color", "white");
        });

        $.initialize('p', function(){
            $(this).css("background", "transparent");
            if ($(this).text().includes("The word was '")){
                $('.player').css('background', 'transparent');
            }
        });

        $.initialize('.word', function(){
            $(this).css('background-color', accessory);
        });

        $('#audio').click(function() {
            if ($('#audio').attr("style").includes("res/audio_off.gif")){
                $("#audio").css('background', 'url(https://i.imgur.com/EbWX9aT.gif)');
            }
            else if ($('#audio').attr("style").includes("res/audio.gif")){
                $("#audio").css('background', 'url(https://i.imgur.com/EalUCVJ.gif)');
            }
        });

        function label(darkness){
            var text = "Canvas Darkness: " + String(darkness);
            localStorage.setItem('darkness', darkness);
            if (darkness < 100){$('label[for="scroll"]').text(text);}
            else {$('label[for="scroll"]').text("Canvas Darkness: Blind");}
        }
    }

    function black(){
        localStorage.setItem("background","black");
        $("body").css('background-image', 'none');
        $("body").css('background-color', 'black');
        accessory = 'black';
        $('#black').prop("checked",true);
        $('#grey').prop("checked",false);
        $('#carbon').prop("checked",false);
        $('#wood').prop("checked",false);
    }

    function grey(){
        localStorage.setItem("background","grey");
        $("body").css('background-image', 'none');
        $("body").css('background-color', '#2c2f33');
        accessory = '#2c2f33';
        $('#grey').prop("checked",true);
        $('#black').prop("checked",false);
        $('#carbon').prop("checked",false);
        $('#wood').prop("checked",false);
    }

    function wood(){
        localStorage.setItem("background","wood");
        $("body").css('background-color', 'rgb(35,35,35)');
        $("body").css('background-image', 'url(https://i.imgur.com/7Prf6.jpg)');
        accessory = 'rgb(35,35,35)';
        $('#wood').prop("checked",true);
        $('#black').prop("checked",false);
        $('#carbon').prop("checked",false);
        $('#grey').prop("checked",false);
    }

    function carbon(){
        localStorage.setItem("background","carbon");
        $("body").css('background-color', 'rgb(25,25,25)');
        $("body").css('background-image', 'url(https://st.depositphotos.com/1915171/3376/v/600/depositphotos_33765721-stock-illustration-carbon-fiber-texture-seamless-vector.jpg)');
        accessory = 'rgb(25,25,25)';
        $('#carbon').prop("checked",true);
        $('#black').prop("checked",false);
        $('#wood').prop("checked",false);
        $('#grey').prop("checked",false);
    }

    function delay(n){ return new Promise(resolve => { setTimeout(() => { resolve(); }, n); }); } //synchronous delay for n ms

    async function fadeout(time){
        const interval = 10;
        const rate = interval/time;
        for (let i=0; i<1/rate; i++){
            elem.css('opacity', elem.css('opacity') - rate);
            await delay(interval);
        }
        elem.remove();
    }
})();

/*global $: false, document: false, window: fals setTimeout: false*/
$(document).ready(function () {

    // Net following the mouse move
    $(document).mousemove(function (e) {
        $("#net").css('left', e.pageX + "px");
        $("#net").css('top', e.pageY + "px");
    });

    // launching the butterfly after the DOM is loaded.
    butterflyMovement(3000);

    //setting the apples at the start to a random position using the function.
    applesBackOnTree()
});

// positino for setting the drops relativ to the watering can
var wateringcanPos = $("#wateringcan").offset();

// waterdrops function
function moveWaterdrops(idref) {

    if ($("#wateringcan").hasClass("rotated")) {

        $(idref).show().css({

            "top": wateringcanPos.top + (Math.random() * 40),

            "left": wateringcanPos.left - (Math.random() * 20),

        }).animate({

            "top": $(window).height() + "px"

        }, {

            duration: 3000 + (Math.random() * 2000),

            easing: "linear",

            complete: function () {

                moveWaterdrops(this)
            }
        })
    }
}


// watering can rotating
$("#wateringcan").on("click", function () {

    $("#wateringcan").toggleClass("rotated");

    $(".waterdrop").each(function () {

        setTimeout(moveWaterdrops, 8000)

        moveWaterdrops(this);
    })
})

// Butterfly random movement position generator.
function movementRandom() {
    var windowWidth = $(window).width();
    var windowHight = $(window).height();


    var butterflyWidth = $("#butterfly").width();
    var butterflyHight = $("#butterfly").height();

    var xMovement = windowWidth - butterflyWidth;
    var yMovement = windowHight - butterflyHight;

    var moveX = Math.floor(Math.random() * xMovement);
    var moveY = Math.floor(Math.random() * yMovement);

    return [moveX, moveY];
}

// Butterfly random movement 
function butterflyMovement(speed) {
    var butterfly = $("#butterfly");
    var move = movementRandom();
    butterfly.animate({
        left: move[0],
        top: move[1]
    }, speed, function () {
        butterflyMovement(3000)
    });
}

// Butterfly escape function
function butterflyEscape() {
    var butterfly = $("#butterfly");
    butterfly.stop(true);
    butterflyMovement(400);
    butterflyMovement(3000);
}

// butterfly to scull toggle
function butterflySurprise() {
    var img1 = "images/butterfly.png",
        img2 = "images/funnyScull.png";
    var imgElement = $("#butterfly").attr("src");

    imgElement = imgElement == img1 ? img2 : img1;

    $("#butterfly").attr("src", imgElement);
}


// Butterfly escape on mouseover and img toggle
$("#butterfly").on("mouseover", function () {
    butterflySurprise();
    butterflyEscape();
})

// Getting the position of the tree. I but more complicated as the tree is set as background. Could have used z-index: -1;
var backgroundPos = $("body").css("background-position");
backgroundPos = backgroundPos.replaceAll("%", "");
backgroundPos = backgroundPos.replaceAll(",", "");
var res = backgroundPos.split(" ");


var treePosLeft = res[0] - 30;
var treePosTop = res[1] - 80;

var basketPos = $("#basketfront").offset();

// Moving the apples to the basket when clicked on them.
$(".apple").on("click", function () {
    $(this).animate({
        top: basketPos.top - 45,
        left: basketPos.left + (Math.random() * 50),
    }, 2000)
})

// Setting the apples back on the tree when clicking on the basket front.
$("#basketfront").on("click", function () {
    applesBackOnTree()
})

// Setting apples to random position within the tree crown.
function applesBackOnTree() {
    $(".apple").hide().each(function () {
        $(this).css({
            top: (treePosTop + (Math.random() * 30)) + "%",
            left: (treePosLeft + (Math.random() * 30)) + "%",
        }).fadeIn(3000);
    })
}

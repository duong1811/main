$(function () {
    getHome();
    getGallery();
    var menu = {
        menuCZ: 'menuCZ',
        menuEN: 'menuEN'
    }
    var link = {
        menuCZ: 'linkmenuCZ',
        menuEN: 'linkmenuEN',
        launchmenuCZ: 'linklaunchMenuCZ',
        launchmenuEN: 'linklaunchMenuEN'
    }
    var folderMenu = Object.keys(link);
    getMenu(folderMenu, link);
    window.addEventListener('resize', function() {
        getGallery();
    });
    review()
    $("#button-menu").click(function () {
        $('#close-menu').css({ 'opacity': 1 })
        $('#open-menu').css({ 'opacity': 0 })
        if ($('#close').attr('class') === 'close d-md-none d-none') {
            $('#close').removeClass("d-none")
        } else {
            $('#close').addClass("d-none")
        }
    })
    $('#close').click(function () {
        $("#button-menu").click()
        $(this).addClass("d-none")
        $('#close-menu').css({ 'opacity': 0 })
        $('#open-menu').css({ 'opacity': 1 })
    })
    setText(localStorage.getItem('key'))

    $('.menu .nav-link').click(function () {
        if (window.innerWidth < 500) {
            $("#button-menu").click()
            $('#close-menu').css({ 'top': '-100%', 'opacity': 0 })
            $('#open-menu').css({ 'top': '-25%', 'opacity': 1 })
        }
    })
    let prevScrollPos = window.pageYOffset;
    window.onscroll = function () {
        const currentScrollPos = window.pageYOffset;
        const navbar = document.getElementById('header');
        if (prevScrollPos <= currentScrollPos && currentScrollPos > 20) {
            navbar.style.top = '-80px';
            navbar.style.opacity = '0';
        } else {
            navbar.style.top = '0';
            navbar.style.opacity = '1';
        }
        prevScrollPos = currentScrollPos;
    };
    document.getElementById("persons").addEventListener("input", function () {
        let inputValue = parseInt(this.value);
        let maxValue = parseInt(this.getAttribute("max"));

        if (inputValue > maxValue) {
            this.value = maxValue;
        }
    });
})

const stars = document.querySelectorAll('.feedback-rating input[type="radio"]');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.value;
        console.log('User rated: ' + rating + ' stars');
    });
});
function getHome() {
    var ListImage = document.getElementById('list-home');
    $.ajax({
        url: "/nodejs/firebase/img?folder=home",
        type: "GET",
        dataType: "json",
        success: function (data) {
             $.each(data, function (index, val) {
                 const img = `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                   <div class="img-gallery" style="background-image: url('${val.url}');"></div>
                               </div>`;
                 ListImage.insertAdjacentHTML("beforeend", img);
             });
        },
        error: function (xhr, status, error) {
            console.error("Request failed:", error);
        }
    });
}
function getGallery() {
            var ListImage = document.getElementById('list-gallery');
            $.ajax({
                url: "/nodejs/firebase/img?folder=gallery",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    ListImage.innerHTML = ''
                    if (window.innerWidth >= 1280) {
                        $.each(data, function (index, val) {
                            getDimensionsFromImageUrl(val.url).then(dimensions => {
                                var cols = document.querySelectorAll(".col");
                                let added = false;
                                if (index < data.length - 1) {
                                    if (dimensions.width < dimensions.height) {
                                        cols.forEach(col => {
                                            if (!added && col.querySelectorAll(".img-gallery").length < 2 && col.getAttribute('add') === 'false') {
                                                const img = `<div class="img-gallery" style="background-image: url('${val.url}');width: 50vw"></div>`;
                                                col.insertAdjacentHTML("beforeend", img);
                                                col.setAttribute('add', 'true');
                                                added = true;
                                            }
                                        });
                                        if (!added) {
                                            const div_col = `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                    <div class="d-flex col" add="false">
                                                        <div class="img-gallery" style="background-image: url('${val.url}');width: 50vw">
                                                    </div>
                                                </div>`;
                                            ListImage.insertAdjacentHTML("beforeend", div_col);
                                        }
                                    } else {
                                        const img = `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                               <div class="img-gallery" style="background-image: url('${val.url}');"></div>
                                           </div>`;
                                        ListImage.insertAdjacentHTML("beforeend", img);
                                    }
                                } else {
                                    if (index === data.length - 1) {
                                        if (!added) {
                                            const div_col = `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                    <div class="d-flex col" add="false">
                                                        <div class="img-gallery" style="background-image: url('${val.url}');width: 50vw">
                                                    </div>
                                                </div>`;
                                            ListImage.insertAdjacentHTML("beforeend", div_col);
                                        } else{
                                          const img = `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                         <div class="img-gallery" style="background-image: url('${val.url}');"></div>
                                                     </div>`;
                                           ListImage.insertAdjacentHTML("beforeend", img);
                                        }
                                        
                                    }
                                }
                            }).catch(error => {
                                console.error('Error:', error);
                            });
                        });
                    } else {
                        $.each(data, function (index, val) {
                            const img = `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                     <div class="img-gallery" style="background-image: url('${val.url}');"></div>
                                 </div>`;
                            ListImage.insertAdjacentHTML("beforeend", img);
                        });
                    }

                },
                error: function (xhr, status, error) {
                    console.error("Request failed:", error);
                }
            });
        }
function getDimensionsFromImageUrl(imageUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = function () {
            resolve({ width: this.width, height: this.height });
        };
        image.onerror = function () {
            reject(new Error('Failed to load image'));
        };
        image.src = imageUrl;
    });
}

function getMenu(folderMenu, link) {
    if (folderMenu.length === 0) {
        return;
    }
    $.each(link, function (index, val) {
        $.ajax({
          url: 'nodejs/'+val,
          type: 'GET',
          success: function(data) {
            $("#"+index).attr('href',data.newestFilePath.replace('/home/restaurance/','../'))
          },
          error: function(xhr, status, error) {
            console.error('Lỗi khi gọi AJAX:', error);
          }
        });
    });
}
function checkVisibleElements() {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const position = section.getBoundingClientRect();
        const isVisible = (position.top >= 0 && position.y <= window.innerHeight / 2);
        if (isVisible) {
            $('.nav-link').removeClass('active')
            let name = section.getAttribute('name')
            $("#" + name).addClass('active')
        }
    });
}
window.addEventListener('scroll', checkVisibleElements);
window.addEventListener('load', checkVisibleElements);
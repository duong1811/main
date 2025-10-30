function setText(storedValue) {
    $('.language').css('color', '#d6d1bd')
    if (storedValue === "En") {
        $('.' + storedValue).css('color', '#C64D1F')
        $('#header .nav-link:eq(0)').html('About us')
        $('#header .nav-link:eq(1)').html('Menu')
        $('#header .nav-link:eq(2)').html('Booking')
        $('#header .nav-link:eq(3)').html('Gallery')
        $('#header .nav-link:eq(4)').html('Contact')

        $('#about-us .content:eq(0)').html(`
                Bếp = Kitchen. The heart of the home.<br>
                <br>
                            A place where food is cooked, stories and experiences are shared.<br>
                            Our story began almost ten years ago with the opening of Gỗ = wood, a restaurant that still
                            focuses on Vietnamese street food. We wanted to support the idea that food can be a bridge
                            between cultures.<br>
                            Later, together with friends, we founded Rễ = roots, a restaurant that combines fusion
                            cuisine with the atmosphere of the city of Hội An. Originally, we wanted to work with
                            recipes directly from Hội An, but at Rễ this vision didn’t come to life since our guests’
                            preferences took a different direction.<br>
                            With the same design studio Hrdina & Pavlík, we continued our original vision, which
                            eventually becameBếp.<br>
                            Bếp is inspired by Hội An and the Vietnamese countryside. We live a family life with
                            children, and we know how important it is to have a space for a calm meal, that’s why we
                            created a small children’s corner.<br>
                            From time to time, we host little events with friends, inspired by what we are experiencing
                            at the moment.<br>
                            At Bếp, we come not only to work, but also to learn and support one another.<br>
                            Not all of us speak Czech fluently, but each of us brings something unique to this place.<br>
                            <br>
                            Through food, we seek understanding between different worlds because food is a language
                            everyone understands.<br>
                            We cook fresh dishes, following recipes we remember from our homes.<br>
                            We hope you’ll feel the comfort of home here with us. Come by, you are warmly welcome.
                `)

        $('#booking label:eq(0)').html('Name Surname')
        $('#booking input:eq(0)').attr('placeholder', 'Fill in your name')
        $('#booking label:eq(1)').html('Phone Number')
        $('#booking input:eq(1)').attr('placeholder', 'Phone number')
        $('#booking label:eq(3)').html('Number of guests')
        $('#booking label:eq(4)').html('Date and time')
        $('#booking label:eq(5)').html('Estimated time of visit')
        $('#booking label:eq(6)').html('Note (special requests, ...)')
        $('#booking input:eq(6)').attr('placeholder', 'Note')
        $('#booking .title h1').html('Booking')
        $('#booking h5').html('* Online reservations should be made at least 24 hours in advance.')
        $('#booking .phone h6').html('Reserve by phone:')
        $('.booking-success h5').html('Thank you for your interest. We will check the availability and get back to you soon through email.')
        $('.booking-error h5').html('Sorry, the reservation could not be completed. Please try again or contact us for assistance.<br>+420 724 332 258')

        $('#feedback .title h1').html('Feedback')
        $('#feedback .input label:eq(0)').html('Rating')
        $('#feedback .name label:eq(0)').html('Your name')
        $('#feedback .name input:eq(0)').attr('placeholder', 'Fill in your name')
        $('#feedback .feedback label:eq(0)').html('Feedback')
        $('#feedback .feedback textarea:eq(0)').attr('placeholder', 'Write feedback')
        $('.noti').html('This field is required.')

        $('#contact .google-map h5').html('Find us on Google Maps')
        $('#contact h5:eq(5)').html('Gift Voucher<br>Get in touch with us and we will discuss how the voucher will reach you.')
        $('#contact h5:eq(2)').html('Opening hours')
        $('#contact h5:eq(3)').html('Mon — Sun 10.30 — 22.00')
    } else {
        $('.Cz').css('color', '#C64D1F')
        $('#header .nav-link:eq(0)').html('O nás')
        $('#header .nav-link:eq(1)').html('Menu')
        $('#header .nav-link:eq(2)').html('Rezervace')
        $('#header .nav-link:eq(3)').html('Galerie')
        $('#header .nav-link:eq(4)').html('Kontakty')

        $('#about-us .content:eq(0)').html(`
                Bếp = kuchyně. Srdce domova.<br>
                <br>
Místo, kde se vaří, sdílí příběhy a prožitky.<br>
Náš příběh začal před téměř deseti lety otevřením restaurace Gỗ = dřevo, která se dodnes zaměřuje na vietnamský street food. Chtěli jsme podpořit myšlenku, že jídlo může být mostem mezi kulturami.<br>
Později jsme spolu s přáteli založili restauraci Rễ = kořeny, která spojuje fusion kuchyni s atmosférou města Hội An. Původně jsme chtěli pracovat s recepty přímo z Hội An, ale v Rễ se to nepodařilo naplnit, protože preference hostů se ubíraly jiným směrem. Se stejným ateliérem Hrdina & Pavlík jsme proto pokračovali v původní vizi a tak vzniklo Bếp.<br>
Do Bếp přicházíme nejen pracovat, ale i se učit a navzájem se podporovat. Ne všichni mluvíme plynně česky, ale každý z nás sem přináší něco jedinečného.<br>
<br>
Přes jídlo hledáme porozumění mezi různými světy, protože jídlo je jazyk, kterému rozumí každý.<br>
Vaříme čerstvě a podle receptů, které si pamatujeme z našich domovů.<br>
Přejeme si, abyste u nás cítili pohodu domova. Zastavte se, jste u nás srdečně vítáni.<br>

                `)

        $('#booking label:eq(0)').html('Jméno a příjmení')
        $('#booking input:eq(0)').attr('placeholder', 'Vyplňte jméno')
        $('#booking label:eq(1)').html('Tel.číslo')
        $('#booking input:eq(1)').attr('placeholder', 'Tel.číslo')
        $('#booking label:eq(3)').html('Počet hostů')
        $('#booking label:eq(4)').html('Datum a čas')
        $('#booking label:eq(5)').html('Předpokládaná doba návštěvy')
        $('#booking label:eq(6)').html('Poznámka (zvláštní požadavky,...)')
        $('#booking input:eq(6)').attr('placeholder', 'Poznámka')
        $('#booking .title h1').html('Rezervace')
        $('#booking h5').html('* Online rezervace provádějte min. 24h předem.')
        $('#booking .phone h6').html('Rezervace na tel.:')
        $('.booking-success h5').html('Děkujeme za váš zájem. Zkontrolujeme dostupnost a ozveme se vám brzy emailem.')
        $('.booking-error h5').html('Omlouváme se, rezervace nemohla být dokončena. Zkuste to prosím znovu nebo nás kontaktujte pro pomoc.<br>+420 724 332 258')

        $('#feedback .title h1').html('Zpětná vazba')
        $('#feedback .input label:eq(0)').html('Hodnocení')
        $('#feedback .name label:eq(0)').html('Tvé jméno')
        $('#feedback .name input:eq()').attr('placeholder', 'Vyplňte své jméno')
        $('#feedback .feedback label:eq(0)').html('Zpětná vazba')
        $('#feedback .feedback textarea:eq(0)').attr('placeholder', 'Napište zpětnou vazbu')
        $('.noti').html('Toto pole je povinné.')

        $('#contact .google-map h5').html('Najděte nás na Google Maps')
        $('#contact h5:eq(5)').html('Dárkový poukaz<br>Ozvěte se nám a domluvíme se, jakým způsobem k Vám poukaz dorazí.')
        $('#contact h5:eq(2)').html('Otevírací doba')
        $('#contact h5:eq(3)').html('Po – Ne 10.30 — 22.00')
    }
}
// function review() {
//     const storedValue = localStorage.getItem('key');
//     var dataList = document.getElementById('comment-review');
//     dataList.innerHTML = ""
//     $.ajax({
//         url: "/nodejs/firebase/review",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             $.each(data, function (index, val) {
//                 const div = `
//                           <div class="comment pb-5">
//                               <div class="comment-content">
//                                   <h5 class="fst-italic fw-bolder">${storedValue === "En" ? data[index].reviewEN : data[index].reviewCZ}</h5>
//                               </div>
//                               <div class="rate d-flex justify-content-between small">
//                                   <span class="name">${data[index].name}</span>
//                               </div>
//                           </div>`;
//                 dataList.insertAdjacentHTML("beforeend", div);
//             })
//         },
//         error: function (xhr, status, error) {
//             console.error("Request failed:", error);
//         }
//     });
// }
function language(chara) {
    localStorage.setItem('key', chara.innerText);
    $('.language').css('color', '#d6d1bd')
    $(chara).css('color', '#C64D1F')
    const storedValue = localStorage.getItem('key');
    setText(storedValue)
    // review()
}
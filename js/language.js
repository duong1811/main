    function setText(storedValue){
        $('.language').removeClass('text-white')
        if (storedValue === "En") {
            $('.'+storedValue).addClass('text-white')
            $('#header .nav-link:eq(0)').html('About us')
            $('#header .nav-link:eq(1)').html('Menu')
            $('#header .nav-link:eq(2)').html('Booking')
            $('#header .nav-link:eq(3)').html('Gallery')
            $('#header .nav-link:eq(4)').html('Contact')
          
            $('#about-us .content:eq(0)').html('Rễ means roots.')
            $('#about-us .content:eq(1)').html('We are a family business, our environment is friendly and at the same time mystical. The journey to the roots deepened as we, in creating the story of Rễ, reminisced about our homeland. We have planted roots in the Czech Republic, each stage of our journey has its significant place. We feel gratitude for our foundations, diverse local cuisine and we love to pass on this knowledge.')
            $('#about-us .content:eq(2)').html('We present Vietnamese, Japanese, and Korean cuisine in our own way and through the interconnection of cultures. We also offer a selection of vegetarian and vegan dishes.')
            $('#about-us .content:eq(3)').html('We drew inspiration from ports where cultures intertwine, and Faifo (formerly known as Hội An) particularly resonated with us. The cultural fusion in this region represents a unique blend of countries from the Far East.')
            $('#about-us .content:eq(4)').html('The interior was designed by the studio Hrdina & Pavlík, who captured our thought flow excellently and transformed it into its final form.')
            $('#about-us .content:eq(5)').html('Mindfulness and mindful dining<br>Is it possible to walk slowly in a fast-paced world? Allow yourself to rest, let intuition guide you in the unfamiliar landscape of cuisine where you will sit today and what dish you will choose. You will have space to savor the present moment and once again enjoy the joy of the little things.')
            $('#about-us .content:eq(6)').html('🌿 Stop in time with Rễ')
            $('#about-us .content:eq(7)').html('Rễ is located in the heart of Brno at Běhounská 8.')
          
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
            $('#feedback .name input:eq(0)').attr('placeholder','Fill in your name')
            $('#feedback .feedback label:eq(0)').html('Feedback')
            $('#feedback .feedback textarea:eq(0)').attr('placeholder','Write feedback')
            $('.noti').html('This field is required.')
          
            $('#contact .google-map h5').html('Find us on Google Maps')
            $('#contact h5:eq(5)').html('Gift Voucher<br>Get in touch with us and we will discuss how the voucher will reach you.')
            $('#contact h5:eq(2)').html('Opening hours')
            $('#contact h5:eq(3)').html('Mon — Sun 10.30 — 22.00')
        } else {
            $('.Cz').addClass('text-white')
            $('#header .nav-link:eq(0)').html('O nás')
            $('#header .nav-link:eq(1)').html('Menu')
            $('#header .nav-link:eq(2)').html('Rezervace')
            $('#header .nav-link:eq(3)').html('Galerie')
            $('#header .nav-link:eq(4)').html('Kontakty')
            
            $('#about-us .content:eq(0)').html('Rễ znamená kořeny. ')
            $('#about-us .content:eq(1)').html('Jsme rodinný podnik, naše prostředí je přátelské a zároveň mystické. Pouť ke kořenům se prohloubila, když jsme se při vytváření příběhu Rễ vrátily ve vzpomínkách k našemu kraji. Kořeny jsme zapustili i v Česku, přičemž každá etapa naší cesty má své důležité místo. Cítíme vděčnost za naše základy, rozmanitou lokální kuchyni a rádi toto poznání předáváme dál. ')
            $('#about-us .content:eq(2)').html('Ukazujeme Vám vietnamskou, japonskou a korejskou kuchyni naší vlastní cestou a propojením kultur. Nabízíme také výběr vegetariánských a veganských jídel.')
            $('#about-us .content:eq(3)').html('Nechali jsme se inspirovat přístavy, kde se prolínájí kultury a zvláště nás oslovil Faifo (bývalý název Hội An). Kulturní fúze v tomto regionu představuje jedinečnou směs zemí z Dálného východu. ')
            $('#about-us .content:eq(4)').html('Interiér vytvořil ateliér Hrdina & Pavlík, kteří výborně zachytili náš tok myšlenek a dokázali jej proměnit do finální podoby. ')
            $('#about-us .content:eq(5)').html('Všímavost a vědomé stravování<br>Je možné pomalu chodit ve zrychlené době? Dovolte si odpočinout, nechat se vést intuicí v neznámé krajině jídel, kam dnes usednete a jaké jídlo si vyberete. Budete mít prostor na vychutnání přítomného okamžiku a opět si užívat radost z maličkostí.')
            $('#about-us .content:eq(6)').html('🌿 Zastavte se v čase s Rễ ')
            $('#about-us .content:eq(7)').html('Rễ sídlí v srdci Brna na adrese Běhounská 8.')
          
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
            $('#feedback .name input:eq()').attr('placeholder','Vyplňte své jméno')
            $('#feedback .feedback label:eq(0)').html('Zpětná vazba')
            $('#feedback .feedback textarea:eq(0)').attr('placeholder','Napište zpětnou vazbu')
            $('.noti').html('Toto pole je povinné.')
          
            $('#contact .google-map h5').html('Najděte nás na Google Maps')
            $('#contact h5:eq(5)').html('Dárkový poukaz<br>Ozvěte se nám a domluvíme se, jakým způsobem k Vám poukaz dorazí.')
            $('#contact h5:eq(2)').html('Otevírací doba')
            $('#contact h5:eq(3)').html('Po – Ne 10.30 — 22.00')
        }
    }
function review() {
    const storedValue = localStorage.getItem('key');
    var dataList = document.getElementById('comment-review');
    dataList.innerHTML = ""
    $.ajax({
        url: "/nodejs/firebase/review",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, val) {
                const div = `
                          <div class="comment pb-5">
                              <div class="comment-content">
                                  <h5 class="fst-italic fw-bolder">${storedValue === "En" ? data[index].reviewEN : data[index].reviewCZ}</h5>
                              </div>
                              <div class="rate d-flex justify-content-between small">
                                  <span class="name">${data[index].name}</span>
                              </div>
                          </div>`;
                dataList.insertAdjacentHTML("beforeend", div);
            })
        },
        error: function (xhr, status, error) {
            console.error("Request failed:", error);
        }
    });
}
    function language(chara) {
        localStorage.setItem('key', chara.innerText);
        $('.language').removeClass('text-white')
        $(chara).addClass('text-white')
        const storedValue = localStorage.getItem('key');
        setText(storedValue)
        review()
    }
var storedValue = localStorage.getItem('key');
function getBooking() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        telephone: document.getElementById("phone").value,
        persons: document.getElementById("persons").value,
        date: document.getElementById("date").value,
        estimatedTime: document.getElementById("estimatedTime").value,
        note: document.getElementById("note").value,
    };
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var phone = /^[1-9][0-9]{8}$/;
    var phoneRegex = /^\+420[1-9][0-9]{8}$/;
    $("#booking form .noti").remove()
    if (!emailPattern.test(params.email)) {
        if (params.email.trim() === "") {
            if (storedValue === "En") {
              $('#booking .input-email').append('<span class="noti text-danger">This field is required.</span>')
            }else {
              $('#booking .input-email').append('<span class="noti text-danger">Toto pole je povinné.</span>')
            }
        } else {
            if (storedValue === "En") {
              $('#booking .input-email').append('<span class="noti noti-email text-danger">The email address entered is invalid, please check the formatting (e.g. email@domain.com)</span>')
            }else {
              $('#booking .input-email').append('<span class="noti noti-email text-danger">Zadaná e-mailová adresa je neplatná, zkontrolujte prosím formátování (např. email@domena.com)</span>')
            }
        }
    }
    if(params.telephone.trim() === ""){
       if (storedValue === "En") {
          $('#booking .input-phone').append('<span class="noti noti-phone text-danger">This field is required.</span>')
        }else {
          $('#booking .input-phone').append('<span class="noti noti-phone text-danger">Toto pole je povinné.</span>')
        }
    } else{
       if (phone.test(params.telephone.replace(/\s/g, '')) || phoneRegex.test(params.telephone.replace(/\s/g, ''))) {
            console.log('success')
        } else {
            if (storedValue === "En") {
              $('#booking .input-phone').append('<span class="noti text-danger">The information you entered is invalid. Please check again.</span>')
            }else {
              $('#booking .input-phone').append('<span class="noti text-danger">Zadané informace nejsou platné. Zkontrolujte prosím znovu.</span>')
            }
        }
    }

    if (params.name.trim() === "") {
        if (storedValue === "En") {
          $('#booking .input-name').append('<span class="noti text-danger">This field is required.</span>')
        }else {
          $('#booking .input-name').append('<span class="noti text-danger">Toto pole je povinné.</span>')
        }
    }
    if (params.estimatedTime.trim() === "") {
        if (storedValue === "En") {
          $('#booking .input-estimatedTime').append('<span class="noti text-danger">This field is required.</span>')
        }else {
          $('#booking .input-estimatedTime').append('<span class="noti text-danger">Toto pole je povinné.</span>')
        }
    }
    if (params.note.trim() === "") {
        if (storedValue === "En") {
          $('#booking .input-note').append('<span class="noti text-danger">This field is required.</span>')
        }else {
          $('#booking .input-note').append('<span class="noti text-danger">Toto pole je povinné.</span>')
        }
    }
    if (params.date.trim() === "") {
        if (storedValue === "En") {
          $('#booking .input-date').append('<span class="noti text-danger">This field is required.</span>')
        }else {
          $('#booking .input-date').append('<span class="noti text-danger">Toto pole je povinné.</span>')
        }
    }
}
$(function(){
  $("#send-booking").on("click", function (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", $("#name").val());
    formData.append("telephone", $("#phone").val());
    formData.append("email", $("#email").val());
    formData.append("persons", $("#persons").val());
    formData.append("date", $("#date").val());
    formData.append("estimatedTime", $("#estimatedTime").val());
    formData.append("note", $("#note").val());
    getBooking()
    const number_span1 = $("#booking form .noti").length;
    if (number_span1 === 0) {
        $.ajax({
            type: 'POST',
            url: '/nodejs/firebase/add-booking',
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('#booking .loading').removeClass("d-none");
                $('#send-booking').addClass("d-none");
            },
            success: function (data) {
                $('.box-noti, .booking-success').removeClass("d-none")
            },
            error: function (error) {
                console.log('Error sending email: ' + error.responseText);
                $('.box-noti, .booking-error').removeClass("d-none")
            },
            complete: function () {
                $('#booking .loading').addClass("d-none");
                $('#send-booking').removeClass("d-none");
            }
        });
    }
  });
})

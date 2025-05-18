$(function(){
  $("#accept").one("click", function (e) {
    e.preventDefault();
    const tr = this.closest('tr')
    const email = tr.find('.email').text()
    const content = `Dobrý den,
                    děkujeme Vám za Vaši rezervaci. Těšíme se na Vaši návštěvu.
                    S pozdravem,
                    Tým Re
                    ---
                    Hello,
                    Thank you for your reservation. We look forward to your visit.
                    Best regards,
                    Team Re
                    `
    const id = tr.find('.id').text()
    var formData = new FormData();
    formData.append("email", email);
    formData.append("status", 2);
    formData.append('content', content)
    $.ajax({
            type: 'POST',
            url: '/booking/update-booking',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                $('.box-noti, .booking-success').removeClass("d-none")
            },
            error: function (error) {
                console.log('Error sending email: ' + error.responseText);
                $('.box-noti, .booking-error').removeClass("d-none")
            },
        });
  });
})

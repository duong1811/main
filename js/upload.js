function File_image(file) {
    var span = file.closest('form').querySelector('span');
    span.innerHTML = ''
    for (var i = 0; i < file.files.length; i++) {
        let name_file = `<li>${file.files[i].name}</li>`
        span.insertAdjacentHTML("beforeend", name_file);
    }
    var buttons = file.closest('form').querySelectorAll('.btn');
    buttons.forEach(function (button) {
        button.disabled = false;
    });
}
$(document).ready(function(){
  $.ajax({
      url: 'nodejs/newest-file',
      type: 'GET',
      success: function(data) {
        console.log('Đường dẫn của tệp mới nhất:', data.newestFilePath);
        $("#menuCZ").attr('href',data.newestFilePath.replace('/home/restaurance/','../'))
      },
      error: function(xhr, status, error) {
        console.error('Lỗi khi gọi AJAX:', error);
      }
    });
});
function uploadFile() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  
  if (!file) {
    showMessage('Please select a file.');
    return;
  }
  
  var formData = new FormData();
  formData.append('file', file);

  fetch('/nodejs/menuCZ', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      showMessage('File uploaded successfully.');
    } else {
      showMessage('Error uploading file.');
    }
  })
  .catch(error => {
    showMessage('Error uploading file.');
    console.error('Error:', error);
  });
}
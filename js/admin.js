
function refreshDataList() {
    var dataList = document.getElementById('review');
    $.ajax({
        url: "/nodejs/firebase/review",
        type: "GET",
        dataType: "json",
        success: function (data) {
            dataList.innerHTML = ""
            $.each(data, function (index, val) {
                const div = `
                          <form class="comment mb-3 py-2" onsubmit="updateReview(event)" style=" background: #e3e3e3; border-radius: 20px;">
                            <h4>Review ${index+1}</h4>
                              <div class="row">
                                 <div class="col-12 col-lg-12">
                                  <h5>Name</h5>
                                  <input type="text" name="name" class="col-12" value="${data[index].name}"/>
                                </div>
                                <div class="col-12 col-lg-6 d-none">
                                  <h5>Rating</h5>
                                  <input type="text" name="rating" class="col-12" value="${data[index].rating}">
                                </div>
                                <input type="text" name="reviewId" class="d-none" value="review${index+1}"/>
                              <div class="col-12 col-lg-6 mt-2">
                                <h5>ReviewEN</h5>
                                <textarea name="reviewEN" class="col-12" rows="4">${data[index].reviewEN.replace('<br>', '\n')}</textarea>
                              </div>
                              <div class="col-12 col-lg-6 mt-2">
                                <h5>Review CZ</h5>
                                <textarea name="reviewCZ" class="col-12" rows="4">${data[index].reviewCZ.replace('<br>', '\n')}</textarea>
                              </div>
                             </div>
                             <div class="mt-2">
                               <button class="btn btn-danger d-none">Delete</button>
                               <button class="btn btn-success" type="submit">Update</button>
                            </div>
                        </form>`;
                dataList.insertAdjacentHTML("beforeend", div);
            })
        },
        error: function (xhr, status, error) {
            console.error("Request failed:", error);
        }
    });
}

function updateFormData(form, callback) {
    var reviewData = new FormData(form);
    if (callback && typeof callback === "function") {
        callback(reviewData);
    }
}

function updateReview(e) {
    e.preventDefault();
    var form = e.target.closest('form');
    var formData = new FormData(form);
    $.ajax({
        url: "/nodejs/firebase/update-review",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false, 
        success: function(response) {
            var div_success = `<div class="text-success">Review updated successfully</div>`
            form.insertAdjacentHTML("beforeend", div_success);
        },
        error: function(xhr, status, error) {
            console.error("Update failed:", error);
        }
    });
}

function getImgage(folderKeys, obj) {
    if (folderKeys.length === 0) {
        return;
    }
    var key = folderKeys.shift();
    var ListImage = document.getElementById(obj[key]);
    $.ajax({
        url: "/nodejs/firebase/img?folder=" + key,
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, val) {
                const img = `<div class="col-6 col-md-3 my-2 px-0 box-img" style="cursor: pointer">
                                          <div class="mx-2" style="position: relative">
                                              <div class="img-gallery" style="background-image: url('${val.url}');"> </div>
                                              <div class="d-none button-delete align-items-end justify-content-center" style="position: absolute; bottom: 0; height: 100%; width: 100%;background: #000000a3;">    
                                                <button class="btn btn-danger mb-3 px-5" name="${val.name}" onclick="delete_img(this)">
                                                  <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
                                                </button>
                                              </div>
                                          </div>
                                      </div>`;
                ListImage.insertAdjacentHTML("beforeend", img);
            });
            $(".box-img").hover(
                function () {
                    $(this).find('.button-delete').removeClass("d-none");
                    $(this).find('.button-delete').addClass("d-flex");
                },
                function () {
                    $(this).find('.button-delete').addClass("d-none");
                    $(this).find('.button-delete').removeClass("d-flex");
                }
            );
            getImgage(folderKeys, obj);
        },
        error: function (xhr, status, error) {
            console.error("Request failed:", error);
        }
    });
}
function delete_img(img) {
    var name = img.getAttribute('name')
    $('#box-delete').removeClass('d-none')
    $('#box-delete .delete').on("click", function () {
        $.ajax({
            url: '/nodejs/firebase/delete',
            type: 'DELETE',
            data: {
                name: name
            },
            success: function (response) {
                console.log(response);
                $('#box-delete').addClass('d-none')
                img.closest('.box-img').remove()
            },
            error: function (xhr, status, error) {
                console.error('Error deleting image:', error);
            }
        });
    });
    $('#box-delete .cancel').on("click", function () {
        $('#box-delete').addClass('d-none')
    });
}
function upload(e) {
    e.preventDefault();
    var form = e.target.closest('form')
    var formData = new FormData(form);
    var div_progress = `<div class="loading">
                                  <progress id="progressBar" value="0" max="100" style="width:300px;"></progress>
                                </div>`
    form.insertAdjacentHTML("beforeend", div_progress);
    $.ajax({
        url: '/nodejs/firebase/upload-img',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (e) {
                if (e.lengthComputable) {
                    var progress = (e.loaded / e.total) * 100;
                    document.getElementById('progressBar').value = progress;
                }
            }, false);
            return xhr;
        },
        success: function (response) {
            form.querySelector('input[type="file"]').value = ''
            form.querySelector('span').innerHTML = 'Select Video files to upload'
            console.log(form.querySelector('input[type="file"]').value)
            $('.loading').remove()
            var div_success = `<div class="text-success">File updated successfully</div>`
            form.insertAdjacentHTML("beforeend", div_success);
        },
        error: function (xhr, status, error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
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
 function updateMenu(e) {
     e.preventDefault();
     var form = e.target.closest('form')
     var fileInput = $(form).find('.file')
    var file = fileInput.prop('files')[0];
     if (!file) {
      showMessage('Please select a file.');
      return;
    }
     var menu_name = form.getAttribute("folder")
     var formData = new FormData();
      formData.append('file', file);
     var div_progress = `<div class="loading">loading...</div>`
     form.insertAdjacentHTML("beforeend", div_progress);
     fetch('/nodejs/'+menu_name, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        $('.loading').remove()
         var div_success = `<div class="text-success">File updated successfully</div>`
         form.insertAdjacentHTML("beforeend", div_success);
      } else {
        $('.loading').remove()
         var div_error = `<div class="text-error">File updated error</div>`
         form.insertAdjacentHTML("beforeend", div_error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to upload file');
    });
 }
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
    var cancel = file.closest('form').querySelector('.cancel');
    cancel.addEventListener("click", function () {
        buttons.forEach(function (button) {
            button.disabled = true;
        });
        file.value = '';
        span.innerHTML = 'Select Video files to upload'
    });
}
$(function () {
    var obj = {
        home: 'list-home',
        gallery: 'list-gallery'
    }
    var link = {
        menuCZ: 'linkmenuCZ',
        menuEN: 'linkmenuEN',
        launchmenuCZ: 'linklaunchMenuCZ',
        launchmenuEN: 'linklaunchMenuEN'
    }
    refreshDataList()
    var folderKeys = Object.keys(obj);
    getImgage(folderKeys, obj);
    var folderMenu = Object.keys(link);
    getMenu(folderMenu, link);
})
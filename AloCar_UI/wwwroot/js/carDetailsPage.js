var carAccessoryList = [];
var carImageList = [];
var carAccessoryListId = 0;
var lastIndex = 0;

var lang = getCookie("languageAloCar");

if (lang == null || lang == undefined || lang == "") {
    lang = "ar";
}

$(document).on('ready', function () {
    activeNavbar("#liBranch");
});



$("#carAccessoryId").change(function () {
    
    var carAccessoryId = $(this).val();
    loadingPage();
    $.ajax({
        url: "/CarDetails/GetSubCarAccessory",
        type: "POST",
        data: JSON.stringify(parseInt(carAccessoryId)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = "";
            var name = lang == "ar" ? "من فضلك إختر" : "Please Choose";
            html += "<option value='0' type='0'> " + name + " </option>";

            for (var i = 0; i < result.length; i++) {
                if (result[i].subCarAccessoryTypeId == "2") {
                    $("#divSubCarAccessoryValue").css("display", "block");
                }
                html += "<option value='" + result[i].id + "' type='" + result[i].subCarAccessoryTypeId + "'> " + result[i].subCarAccessoryName + " </option>";
            }

            $("#divSubCarAccessoryValue").val('');
            $("#subCarAccessoryId").selectMania('clear');
            $("#subCarAccessoryId").empty();
            $("#subCarAccessoryId").append(html);
            $("#subCarAccessoryId").selectMania('update');

            if (result != null && result != undefined && result != "") {
                $("#btnAddAccessory").removeAttr("disabled");
            }
            else {
                $("#btnAddAccessory").removeAttr("disabled");
                $("#btnAddAccessory").attr("disabled", "disabled");
            }

            removeLoadingPage();

        },
        error: function (response) {
            console.log(response);
            removeLoadingPage();
        },
        failure: function (response) {
            console.log(response);
            removeLoadingPage();
        }
    })
});


$("#subCarAccessoryId").change(function () {
    if ($("#subCarAccessoryId option:selected").attr("type") == "2") {
        $("#divSubCarAccessoryValue").css("display", "block");
    }
    else {
        $("#divSubCarAccessoryValue").css("display", "none");
    }
});


$("#btnAddAccessory").click(function () {
    var type = $("#subCarAccessoryId option:selected").attr("type");
    if (type != "" && type != "0") {
        var carAccessoryId = $("#carAccessoryId").val();
        var subCarAccessoryId = $("#subCarAccessoryId").val();
        var chk = carAccessoryList.filter(m => m.carAccessoryId == carAccessoryId && m.subCarAccessoryId == subCarAccessoryId)[0];

        if (chk != null && chk != undefined && chk != "") {
            alert("تم إضافة هذا العنصر من قبل");
        }
        else {
            var carAccessory = {
                id: carAccessoryList.length,
                carDetailsId: parseInt($("#hddCarDetailsId").val()),
                carAccessoryId: parseInt($("#carAccessoryId option:selected").val()),
                carAccessoryName: $("#carAccessoryId option:selected").text(),
                subCarAccessoryId: parseInt($("#subCarAccessoryId option:selected").val()),
                subCarAccessoryName: $("#subCarAccessoryId option:selected").text(),
                value: type == "2" ? $("#subCarAccessoryValue").val() : null,
                isCheck: type == "1" ? true : false,
            };

            carAccessoryList.push(carAccessory);
            addRow(carAccessory);
            $("#lblErrorAllCarAccessory").css("display", "none");
        }
    }
});


function addRow(item) {
    var value = item.isCheck == true ? "<i class='fa fa-check-circle success' aria-hidden='true'></i>" : item.value;
    var html = "<tr id='tblCarAccessory" + item.id + "'>" +
        "<td> " + item.carAccessoryName + " </td>" +
        "<td> " + item.subCarAccessoryName + " </td>" +
        "<td> " + value + " </td>" +
        "<td>" +
        "<button type='button' class='btn btn-danger btn-xs btn-fill' onclick='btnSelectAccessory(" + item.id + ")'>" +
        "<i class='fa fa-trash-o' aria-hidden='true'></i>" +
        "</button>" +
        "</td>" +
        "</tr> ";

    $("#divSubCarAccessoryValue").val('');
    if (item.isCheck == true) {
        $("#divSubCarAccessoryValue").css("display", "none");
    }

    $("#tblCarAccessory").append(html);
}


function btnSelectAccessory(id) {
    carAccessoryListId = id;
    $("#deleteModal").modal('toggle');
}

function btnCarAccessoryDelete() {
    var index = carAccessoryList.findIndex(m => m.id == carAccessoryListId);
    carAccessoryList.splice(index, 1);
    $("#tblCarAccessory" + carAccessoryListId).remove();
    $("#deleteModal").modal('hide');
}


async function getBase64(file) {
    return await toBase64(file);
}


$("#carImage").change(function () {
    //debugger;
    //getCarImage();
   
});


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function getCarImage(fileInput) {
    if (fileInput != null && fileInput != undefined && fileInput != "") {
        if (fileInput.length > 0) {
            
            for (var i = 0; i < fileInput.length; i++) {

                if (chkSizeFile(fileInput[i]) == false) {
                    $("#lblErrorImageMaximumSizeFile").css("display", "block");
                }
                else {
                    var imgBase64 = await toBase64(fileInput[i]);
                    var base64 = imgBase64.split('base64,');
                    if (base64.length > 0) {
                        var chk = carImageList.filter(m => m.base64 == base64[1]);
                        if (chk == null || chk == undefined || chk == "") {
                            lastIndex = lastIndex + 1;
                            carImageList.push({ id: lastIndex, base64: base64[1] });
                            addImage(lastIndex, imgBase64);
                        }
                    }
                }
            }   
        }
    }
}


function changeImage(file) {
    $("#lblErrorImageMaximumSize").css("display", "none");
    if (file != null && file != undefined && file != "") {
        if (carImageList.length == 11 || file.files.length > 11) {
            $("#lblErrorImageMaximumSize").css("display", "block");
        }
        else {
            getCarImage(file.files);
        }
    }
}

function btnPreviewImage(img64) {
    $("#imgPreview").attr("src", img64);
    $("#imagePreviewModal").modal("show");
}

function addImage(id, img) {
    $("#lblErrorImageMaximumSize").css("display", "none");
    $("#lblErrorImageMinimumSize").css("display", "none");
    $("#lblErrorImageMaximumSizeFile").css("display", "none");

   var html = '<li id="imgUpload' + id + '"> ' +
                   '<img src = "' + img + '" class="remove-pic">' +
                   '<button type="button" class="btn btn-danger img-upload-btn btn-fill" onclick="btnDeleteImage(' + id + ')">' +
                        '<i class="fa fa-trash-o"></i>' +
                   '</button>' +
              '</li>';

    $("#media-list li:last").before(html);
}



function btnDeleteImage(id) {
    $("#lblErrorImageMinimumSize").css("display", "none");

    if (carImageList.length > 1) {
        $("#imgUpload" + id).remove();
        var indx = carImageList.findIndex(m => m.id == id);
        carImageList.splice(indx, 1);
    }
    else {
        $("#lblErrorImageMinimumSize").css("display", "block");
    }
}


function btnAddEditCar() {
    var isInstallment = $("#isInstallment").is(':checked')? true : false;
    var isTaxIncluded = $("#isTaxIncluded").is(':checked') ? true : false;
    
    var carDetails = {
        id: parseInt($("#hddCarDetailsId").val()),
        carImportId: parseInt(jQuery.trim($("#carImportId").val())),
        carColorId: parseInt(jQuery.trim($("#carColorId").val())),
        carTransmissionId: parseInt(jQuery.trim($("#carTransmissionId").val())),
        carEngineId: parseInt(jQuery.trim($("#carEngineId").val())),
        cityId: parseInt(jQuery.trim($("#cityId").val())),
        currencyId: parseInt(jQuery.trim($("#currencyId").val())),
        engineSize: parseFloat(jQuery.trim($("#engineSize").val())),
        year: parseInt(jQuery.trim($("#year").val())),
        seatsNo: parseInt(jQuery.trim($("#seatsNo").val())),
        doorsNo: parseInt(jQuery.trim($("#doorsNo").val())),
        walkway: parseFloat(jQuery.trim($("#walkway").val())),
        chassisNo: jQuery.trim($("#chassisNo").val()),
        motorNo: jQuery.trim($("#motorNo").val()),
        brandId: parseInt(jQuery.trim($("#brandId").val())),
        carClassId: parseInt(jQuery.trim($("#carClassId").val())),
        isInstallment: Boolean(isInstallment),
        carStatusId: parseInt(jQuery.trim($("#carStatusId").val())),
        isTaxIncluded: Boolean(isTaxIncluded),
        price: parseFloat(jQuery.trim($("#price").val())),
        discount: parseFloat(jQuery.trim($("#discount").val())),
        carDetailsTypeId: 1,//parseInt(jQuery.trim($("#carDetailsTypeId").val())),
    };
    
    var chkValidation = carValidation(carDetails);
    if (chkValidation == true) {
        var imgList = carImageList.map(m => m.base64);
        var car = { carDetails: carDetails, carAccessory: carAccessoryList, carImage: imgList };

        loadingPage();
        $.ajax({
            url: "/CarDetails/AddEditCarDetails",
            type: "POST",
            data: JSON.stringify(car),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.success == true) {
                    window.location.href = "/CarDetails/Index";
                }
                else {
                    removeLoadingPage();
                    alert(result.message);
                }
            },
            error: function (response) {
                console.log(response);
                removeLoadingPage();
            },
            failure: function (response) {
                console.log(response);
                removeLoadingPage();
            }
        })
    }
}


function carValidation(car) {

    $("#lblErrorAllCarAccessory").css("display", "none");
    $("#lblErrorCarImage").css("display", "none");
    $("#lblErrorPrice").css("display", "none");
    $("#lblErrorCarImportId").css("display", "none");
    $("#lblErrorCarColorId").css("display", "none");
    $("#lblErrorCarTransmissionId").css("display", "none");
    $("#lblErrorCarEngineId").css("display", "none");
    $("#lblErrorCityId").css("display", "none");
    $("#lblErrorEngineSize").css("display", "none");
    $("#lblErrorYear").css("display", "none");
    $("#lblErrorSeatsNo").css("display", "none");
    $("#lblErrorDoorsNo").css("display", "none");
    $("#lblErrorWalkway").css("display", "none");
    $("#lblErrorChassisNo").css("display", "none");
    $("#lblErrorMotorNo").css("display", "none");
    $("#lblErrorBrandId").css("display", "none");
    $("#lblErrorCarClassId").css("display", "none");
    $("#lblErrorCarStatusId").css("display", "none");

    if ((String(car.carImportId) != "" && String(car.carImportId) != null && String(car.carImportId) != undefined) &&
        (String(car.carStatusId) != "" && String(car.carStatusId) != null && String(car.carStatusId) != undefined) &&
        (String(car.carColorId) != "" && String(car.carColorId) != null && String(car.carColorId) != undefined) &&
        (String(car.carTransmissionId) != "" && String(car.carTransmissionId) != null && String(car.carTransmissionId) != undefined) &&
        (String(car.carEngineId) != "" && String(car.carEngineId) != null && String(car.carEngineId) != undefined) &&
        (String(car.cityId) != "" && String(car.cityId) != null && String(car.cityId) != undefined) &&
        (String(car.currencyId) != "" && String(car.currencyId) != null && String(car.currencyId) != undefined) &&
        (String(car.engineSize) != "" && String(car.engineSize) != null && String(car.engineSize) != undefined) &&
        (String(car.year) != "" && String(car.year) != null && String(car.year) != undefined) &&
        (String(car.seatsNo) != "" && String(car.seatsNo) != null && String(car.seatsNo) != undefined) &&
        (String(car.doorsNo) != "" && String(car.doorsNo) != null && String(car.doorsNo) != undefined) &&
        (String(car.walkway) != "" && String(car.walkway) != null && String(car.walkway) != undefined) &&
        (String(car.chassisNo) != "" && String(car.chassisNo) != null && String(car.chassisNo) != undefined) &&
        (String(car.motorNo) != "" && String(car.motorNo) != null && String(car.motorNo) != undefined) &&
        (String(car.brandId) != "" && String(car.brandId) != null && String(car.brandId) != undefined) &&
        (String(car.carClassId) != "" && String(car.carClassId) != null && String(car.carClassId) != undefined) &&
        (String(car.price) != "" && String(car.price) != null && String(car.price) != undefined && parseFloat(car.price) > 0) &&
        carImageList.length > 0 && carAccessoryList.length > 0 ) {

        if (parseInt(car.seatsNo) > 0 && parseInt(car.doorsNo) > 0 && parseInt(car.year) > 0 && carImageList.length > 0) {
            return true;
        }

        else {

            if(carImageList.length > 0) {
                $("#lblErrorCarImage").css("display", "none");
            }

            else {
                $("#lblErrorCarImage").css("display", "block");
            }

            if (parseInt(car.seatsNo) > 0) {
                $("#lblErrorSeatsNo").css("display", "none");
            }

            else {
                $("#lblErrorSeatsNo").css("display", "block");
            }
            
            if (parseInt(car.doorsNo) > 0) {
                $("#lblErrorDoorsNo").css("display", "none");
            }
            else {
                $("#lblErrorDoorsNo").css("display", "block");
            }

            if (parseInt(car.year) > 0) {
                $("#lblErrorYear").css("display", "none");
            }
            else {
                $("#lblErrorYear").css("display", "block");
            }

            return false;
        }

    }

    else {

        if (carAccessoryList.length > 0) {
            $("#lblErrorAllCarAccessory").css("display", "none");
        }
        else
        {
            $("#lblErrorAllCarAccessory").css("display", "block");
        }

        if (carImageList.length > 0) {
             $("#lblErrorCarImage").css("display", "none");
         }
        else {
            $("#lblErrorCarImage").css("display", "block");
        }

        if (String(car.price) != "" && String(car.price) != null && String(car.price) != undefined && parseFloat(car.price) > 0) {
            $("#lblErrorPrice").css("display", "none");
        }
        else {
            $("#lblErrorPrice").css("display", "block");
        }

        if (String(car.carImportId) != "" && String(car.carImportId) != null && String(car.carImportId) != undefined) {
            $("#lblErrorCarImportId").css("display", "none");
        }
        else {
            $("#lblErrorCarImportId").css("display", "block");
        }

        if (String(car.carStatusId) != "" && String(car.carStatusId) != null && String(car.carStatusId) != undefined) {
            $("#lblErrorCarStatusId").css("display", "none");
        }
        else {
            $("#lblErrorCarStatusId").css("display", "block");
        }

        if (String(car.carColorId) != "" && String(car.carColorId) != null && String(car.carColorId) != undefined) {
            $("#lblErrorCarColorId").css("display", "none");
        }
        else {
            $("#lblErrorCarColorId").css("display", "block");
        }

        if (String(car.carTransmissionId) != "" && String(car.carTransmissionId) != null && String(car.carTransmissionId) != undefined) {
            $("#lblErrorCarTransmissionId").css("display", "none");
        }
        else {
            $("#lblErrorCarTransmissionId").css("display", "block");
        }

        if (String(car.carEngineId) != "" && String(car.carEngineId) != null && String(car.carEngineId) != undefined) {
            $("#lblErrorCarEngineId").css("display", "none");
        }
        else {
            $("#lblErrorCarEngineId").css("display", "block");
        }

        if (String(car.cityId) != "" && String(car.cityId) != null && String(car.cityId) != undefined) {
            $("#lblErrorCityId").css("display", "none");
        }
        else {
            $("#lblErrorCityId").css("display", "block");
        }

        if (String(car.currencyId) != "" && String(car.currencyId) != null && String(car.currencyId) != undefined) {
            $("#lblErrorCurrencyId").css("display", "none");
        }
        else {
            $("#lblErrorCurrencyId").css("display", "block");
        }

        if (String(car.engineSize) != "" && String(car.engineSize) != null && String(car.engineSize) != undefined) {
            $("#lblErrorEngineSize").css("display", "none");
        }
        else {
            $("#lblErrorEngineSize").css("display", "block");
        }

        if (String(car.year) != "" && String(car.year) != null && String(car.year) != undefined) {
            if (parseInt(car.year) > 0) {
                $("#lblErrorYear").css("display", "none");
            }
            else {
                $("#lblErrorYear").css("display", "block");
            }
        }
        else {
            $("#lblErrorYear").css("display", "block");
        }

        if (String(car.seatsNo) != "" && String(car.seatsNo) != null && String(car.seatsNo) != undefined) {
            if (parseInt(car.seatsNo) > 0) {
                $("#lblErrorSeatsNo").css("display", "none");
            }

            else {
                $("#lblErrorSeatsNo").css("display", "block");
            }
        }
        else {
            $("#lblErrorSeatsNo").css("display", "block");
        }

        if (String(car.doorsNo) != "" && String(car.doorsNo) != null && String(car.doorsNo) != undefined) {
            if (parseInt(car.doorsNo) > 0) {
                $("#lblErrorDoorsNo").css("display", "none");
            }
            else {
                $("#lblErrorDoorsNo").css("display", "block");
            }
        }
        else {
            $("#lblErrorDoorsNo").css("display", "block");
        }

        if (String(car.walkway) != "" && String(car.walkway) != null && String(car.walkway) != undefined) {
            $("#lblErrorWalkway").css("display", "none");
        }
        else {
            $("#lblErrorWalkway").css("display", "block");
        }
        
        if (String(car.chassisNo) != "" && String(car.chassisNo) != null && String(car.chassisNo) != undefined) {
            $("#lblErrorChassisNo").css("display", "none");
        }
        else {
            $("#lblErrorChassisNo").css("display", "block");
        }

        if (String(car.motorNo) != "" && String(car.motorNo) != null && String(car.motorNo) != undefined) {
            $("#lblErrorMotorNo").css("display", "none");
        }
        else {
            $("#lblErrorMotorNo").css("display", "block");
        }

        if (String(car.brandId) != "" && String(car.brandId) != null && String(car.brandId) != undefined) {
            $("#lblErrorBrandId").css("display", "none");
        }
        else {
            $("#lblErrorBrandId").css("display", "block");
        }

        if (String(car.carClassId) != "" && String(car.carClassId) != null && String(car.carClassId) != undefined) {
            $("#lblErrorCarClassId").css("display", "none");
        }
        else {
            $("#lblErrorCarClassId").css("display", "block");
        }

        return false;
    }
}


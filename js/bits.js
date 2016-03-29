 var jq24 = jQuery.noConflict(true);
 (function ($) {

 $(document).ready(function () {
    // MetsiMenu
    $('#side-menu').metisMenu();

    // minimalize menu
    $('.navbar-minimalize:not(.binded)').addClass("binded").click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    })

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    //$('.modal').appendTo("body")

    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    }
    fix_height();

    $(window).bind("load resize click scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    })

    $("[data-toggle=popover]").popover();
});

// For demo purpose - animation css script
window.animationHover = function(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);
        });
};

// Minimalize menu when screen is less than 768px
$(function() {
    $(window).bind("load resize", function() {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    })
})

window.SmoothlyMenu = function() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')){
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
};
    $(function (){
        // Initialixe Tooltip
        $("[rel='tooltip']").tooltip();

        // Initialize Datetimepicker without time
        $('#tgl').datetimepicker({
          pickTime: false
        });


        var dateNow = new Date();
        $('#datetimepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss',
            defaultDate:dateNow
        });
    });

    // Add Active Menu
    $('.nav').find('a[href="' + location.pathname + '"]').parents('li').addClass('active');

    var codeeditor = document.getElementById("code-editor");
    if (codeeditor) {
        var editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
            mode: 'text/html',
            tabSize:4,
            indentUnit:4,
            matchBrackets: true,
            lineWrapping: true,
            lineNumbers:true,
            theme:'seti',
        });
    };

    $('#content').summernote({
        height: 300,
        tabsize: 4,
        styleWithSpan: true,
        prettifyHtml: true,
        codemirror: {
            mode: 'text/html',
            htmlMode: true,
            lineNumbers: true,
            theme: 'seti'
        },
        onImageUpload: function(files, editor, $editable) {
            sendFile(files[0], editor, $editable);
        }
    });

    $('#content2').summernote({
        height: 300,
        tabsize: 4,
        styleWithSpan: true,
        prettifyHtml: false,
        codemirror: {
            mode: 'text/html',
            htmlMode: true,
            lineNumbers: true,
            theme: 'seti'
        },
        onImageUpload: function(files, editor, $editable) {
            sendFile(files[0], editor, $editable);
        }
    });

    function sendFile(file, editor, welEditable) {
        data = new FormData();
        data.append("file", file);
        $.ajax({
            data: data,
            type: "POST",
            url: "/system/article/upload/",
            cache: false,
            contentType: false,
            processData: false,
            success: function(url) {
                $('.create').find('#content').summernote("insertImage", url, 'filename');
                $('.update').find('#content2').summernote("insertImage", url, 'filename');

                $('.create').find('#fimage').attr("value",url);
                $('.update').find('#fimage2').attr("value",url);
            }
        });
    }

    // View Profile Modal
    $('.view').on('show.bs.modal', function (event) {
        var div    = $(event.relatedTarget)
        var id       = div.data('id');
        var photo    = div.data('photo');
        var username = div.data('username');
        var nama     = div.data('nama');
        var email    = div.data('email');
        var telp     = div.data('telp');
        var alamat  = div.data('alamat');
        var modal    = $(this);

        modal.find('#vphoto').attr("src",photo);
        modal.find('#vusername').html(username);
        modal.find('#vnama').html(nama);
        modal.find('#vemail').html(email);
        modal.find('#vtelp').html(telp);
        modal.find('#valamat').html(alamat);
    });

    // Edit Link Modal
    $('.update').on('show.bs.modal', function (event) {
        var div      = $(event.relatedTarget)
        var id       = div.data('id');
        var nama     = div.data('nama');

        // Users
        var username = div.data('username');
        var email    = div.data('email');
        var telp     = div.data('telp');
        var alamat   = div.data('alamat');

        // Proyek
        var hps      = div.data('hps');
        var status   = div.data('status');

        // Kriteria
        var bobot    = div.data('bobot');
        var type     = div.data('type');

        // Penilaian
        var peserta  = div.data('peserta');
        var k1       = div.data('k1');
        var k2       = div.data('k2');
        var k3       = div.data('k3');
        var k4       = div.data('k4');
        var k5       = div.data('k5');
        var k6       = div.data('k6');
        var k7       = div.data('k7');
        var k8       = div.data('k8');
        var k9       = div.data('k9');
        var k10      = div.data('k10');
        var modal    = $(this);

        modal.find('#id').attr("value", id);
        modal.find('#nama').attr("value", nama);

        // Users
        modal.find('#username').attr("value", username);
        modal.find('#email2').attr("value", email);
        modal.find('#telp').attr("value", telp);
        modal.find('#alamat').attr("value", alamat);

        // Proyek
        modal.find('#hps').attr("value", hps);
        if (status) {
            modal.find('#status').select2("val", status);
        };

        // Kriteria
        modal.find('#bobot').attr("value", bobot);
        if (type) {
            modal.find('#type').select2("val", type);
        };

        // Penilaian
        if (peserta) {
            modal.find('#peserta').select2("val", peserta);
        };
        if (k1) {
            modal.find('#k1').select2("val", k1);
        };
        if (k2) {
            modal.find('#k2').select2("val", k2);
        };
        if (k3) {
            modal.find('#k3').select2("val", k3);
        };
        if (k4) {
            modal.find('#k4').select2("val", k4);
        };
        if (k5) {
            modal.find('#k5').select2("val", k5);
        };
        if (k6) {
            modal.find('#k6').select2("val", k6);
        };
        if (k7) {
            modal.find('#k7').select2("val", k7);
        };
        if (k8) {
            modal.find('#k8').select2("val", k8);
        };
        if (k9) {
            modal.find('#k9').select2("val", k9);
        };
        if (k10) {
            modal.find('#k10').select2("val", k10);
        };
    });

    // Delete Link Modal Confirmation
    $('.delete').on('show.bs.modal', function (event) {
        var div   = $(event.relatedTarget)
        var url   = div.data('url')
        var id    = div.data('id')
        var modal = $(this)
        modal.find('#deleted').attr("href","/"+ url + "/delete/" + id);
    });

    $('.update').on('hidden.bs.modal', function () {
        // If use JSON
        //$table.bootstrapTable('refresh');
        // If use PHP Array
        location.reload();
    });

    var $table = $('#table');

    // Image Upload
    $("#photo").fileinput({
        previewFileType: "image",
        browseClass: "btn btn-info",
        browseLabel: "",
        browseIcon: '<i class="fa fa-image"></i> ',
        removeClass: "btn btn-danger",
        removeLabel: "",
        removeIcon: '<i class="fa fa-trash"></i> ',
        showUpload: false,
    });
    // Image Upload
    $("#photo2").fileinput({
        previewFileType: "image",
        browseClass: "btn btn-info",
        browseLabel: "",
        browseIcon: '<i class="fa fa-image"></i> ',
        removeClass: "btn btn-danger",
        removeLabel: "",
        removeIcon: '<i class="fa fa-trash"></i> ',
        showUpload: false,
    });
    // File Upload
    $("#file").fileinput({
        previewFileType: "image",
        browseClass: "btn btn-info",
        browseLabel: "",
        browseIcon: '<i class="fa fa-cloud"></i> ',
        removeClass: "btn btn-danger",
        removeLabel: "",
        removeIcon: '<i class="fa fa-trash"></i> ',
        showUpload: false,
        maxFileCount: 10,
    });

    // Initialize select2
    $(function () {
        $(".select2").select2({
            theme: "bootstrap",
            placeholder: "Silahkan Pilih...",
            allowClear: true
        });
        $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    });

}(jq24));

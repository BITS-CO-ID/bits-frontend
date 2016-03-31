 var jq24 = jQuery.noConflict(true);
 (function ($) {

    $.backstretch([
      //"/assets/bits-frontend/img/backgrounds/3.jpg",
      "/assets/bits-frontend/img/backgrounds/4.jpg",
      "/assets/bits-frontend/img/backgrounds/5.jpg",
      "/assets/bits-frontend/img/backgrounds/6.png",
      "/assets/bits-frontend/img/backgrounds/7.jpg",
      //"/assets/bits-frontend/img/backgrounds/8.jpg",
      "/assets/bits-frontend/img/backgrounds/13.jpg",
      //"/assets/bits-frontend/img/backgrounds/9.gif",
      "/assets/bits-frontend/img/backgrounds/10.jpg",
      //"/assets/bits-frontend/img/backgrounds/11.jpg",
      "/assets/bits-frontend/img/backgrounds/12.gif"
    ], {duration: 3000, fade: 750});

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
        var name     = div.data('name');
        var email    = div.data('email');
        var telp     = div.data('telp');
        var address  = div.data('address');
        var modal    = $(this);

        modal.find('#vphoto').attr("src",photo);
        modal.find('#vusername').html(username);
        modal.find('#vname').html(name);
        modal.find('#vemail').html(email);
        modal.find('#vtelp').html(telp);
        modal.find('#vaddress').html(address);
    });

    // Edit Link Modal
    $('.update').on('show.bs.modal', function (event) {
        var div      = $(event.relatedTarget)
        var id       = div.data('id');
        var name     = div.data('name');

        // Users
        var username = div.data('username');
        var email    = div.data('email');
        var telp     = div.data('telp');
        var address   = div.data('address');
        var modal    = $(this);

        modal.find('#id').attr("value", id);
        modal.find('#name').attr("value", name);

        // Users
        modal.find('#username').attr("value", username);
        modal.find('#email2').attr("value", email);
        modal.find('#telp').attr("value", telp);
        modal.find('#address').attr("value", address);
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
            placeholder: "Please Select One...",
            allowClear: true
        });
        $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    });

}(jq24));

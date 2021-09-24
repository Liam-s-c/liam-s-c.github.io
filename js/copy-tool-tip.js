$("a.my-tool-tip").tooltip();
$("a.my-tool-tip").click(function(){
    $("a.my-tool-tip").attr('data-original-title', 'Copied');
    $("a.my-tool-tip").tooltip('hide');
    $("a.my-tool-tip").tooltip('show');
});
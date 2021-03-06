var hyperion = function() {

    var handleTostarMessage = function(message) {
		
		toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
		toastr['info'](message);
	};

    var handleLeftNavActive = function($dom) {
		$('ul#left-nav').children().removeClass('active open');	

		var parent = $dom.parent();
		parent.addClass('active open');		

		var li = $dom.closest('li.left-nav-top');
		li.addClass('active open');
		li.find('a').append('<span class="selected"></span>');
		li.find('.arrow').addClass('open');
	};

    var handleInitDatatable = function ($dom, filter) {
       
        var oTable = $dom.dataTable({
            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "表格为空",
                "info": "显示 _START_ 至 _END_ 共有 _TOTAL_ 条记录",
                "infoEmpty": "结果为空",
                "infoFiltered": "( 从 _MAX_ 条记录中筛选)",
                "lengthMenu": " _MENU_ 记录",
                "search": "搜索:",
                "zeroRecords": "结果为空"
            }, 

            // setup responsive extension: http://datatables.net/extensions/responsive/
            responsive: {
                details: {
                   
                }
            },

            "order": [],
            
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,
            "pagingType": "bootstrap_full_number"

            //"dom": "<'row' <'col-md-12'>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
        });

        if (filter) {
			$dom.find("tfoot th").each(function (i) {
			if ($(this).attr('data-filter') == 'true') {
				var select = $('<select class="form-control"><option value=""></option></select>')
					.appendTo($(this).empty())
					.on('change', function () {
						var val = $(this).val();
						oTable.api().column(i)
							.search(val ? '^' + $(this).val() + '$' : val, true, false)
							.draw();
					});
					
					oTable.api().column(i).data().unique().sort().each(function (d, j) {
						if ($(d).html()) {
							select.append('<option value="' + $(d).html() + '">' + $(d).html() + '</option>')
						} else {
							select.append('<option value="' + d + '">' + d + '</option>')
						}
					});
				}
			});
		}

        return oTable;
    };

    var handleInitAjaxDatatable = function($dom, url, columns, columnDefs) {

        var oTable = $dom.dataTable({

            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "表格为空",
                "info": "显示 _START_ 至 _END_ 共有 _TOTAL_ 条记录",
                "infoEmpty": "结果为空",
                "infoFiltered": "( 从 _MAX_ 条记录中筛选)",
                "lengthMenu": " _MENU_ 记录",
                "search": "搜索:",
                "zeroRecords": "结果为空"
            }, 

            // setup responsive extension: http://datatables.net/extensions/responsive/
            responsive: {
                details: {
                   
                }
            },

            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": url,
                "type": "POST"
            },
            "columns": columns,
            "columnDefs": columnDefs,
            "ordering": false,

            "order": [],
            
            "lengthMenu": [
                [5, 10, 15, 20],
                [5, 10, 15, 20] // change per page values here
            ],
            // set the initial value
            "pageLength": 15,
            "pagingType": "bootstrap_full_number",

            "dom": "<'row' <'col-md-12'>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
        });

        return oTable;
    };

    var handleMomentDateTime = function(dt) {
        return moment(dt).format('YYYY-MM-DD HH:mm:ss');
	}

    return {
        showMessage: function(message) {
			handleTostarMessage(message);
		},

        leftNavActive: function($dom) {
			handleLeftNavActive($dom);
		},

        initDatatable: function($dom, filter) {
			return handleInitDatatable($dom, filter);
		},

        initAjaxDatatable: function($dom, url, columns, columnDefs) {
            return handleInitAjaxDatatable($dom, url, columns, columnDefs);
        },

        /* moment parse asp.net datetime */
		parseDateTime: function(dt) {
			if (dt != null && dt != '')
				return handleMomentDateTime(dt);
			else
				return null;
		}
    }
}();
//=====================================================
// Purpose: Popup infinite-scrolling-dialog
// Params:  opts = {
//				backgroundColor: "#ffffff",
//            	headerView: "<span>xxx</span>",
//				useSearchBarHeader: false, // Invalid if headerView is defined
//				placeholder: "placeholder for search input",
//            	onOpen: function($contentView){}, 
//            	onLoad: function($contentView){},
//            	onScrollToBottom: function(){},
//            	onClose: function(){},
//				spinnerColor: "#374962",
//				showCancelButton: false,
//				cancelButtonIconUrl: "img/isd_cancel_D94025.png",
//				searchButtonIconUrl: "img/isd_search.png",
//				popupPosition: [0, 0],
//				maxWidth: 420,
//				cancelButton: { name: "Cancel" },
//				okButton: { name: "OK" },
//		    }
//			Life Cycle: 
//				onOpen -> onLoad -> onScrollToBottom -> onLoad
// Return:  jquery object
// Remark:  (1)Dependency: jQuery, bPopup.min.js
//          (2)infiniteScrollingDialog = isd
// Author:  welson
//=====================================================
$.fn.infiniteScrollingDialog = function(opts) {
	opts = opts || {};

	var useFunctionBar = (opts.useFunctionBar != undefined) ? opts.useFunctionBar : true;

	function isDownScrollToElementBottom($elem) {
		var dom = $elem[0];
		var scrollPos = $elem.scrollTop();
		
		var isDownScroll = (scrollPos >= dom.lastScrollTop);
		dom.lastScrollTop = scrollPos;

		if(isDownScroll) {
			return (scrollPos + $elem.innerHeight() >= $elem[0].scrollHeight - 2);
		} else {
			return false;
		}
	}
	function getHtml(cancelButton, okButton) {
		var spinnerColor = opts ? opts.spinnerColor || "#374962" : "#374962";
		var cancelName = cancelButton ? cancelButton.name || "Cancel" : "Cancel";
		var okName = okButton ? okButton.name || "OK" : "OK";
		var elem = "";
		// elem += '<div id="infiniteScrollingDialog" p="0" data-p="0" style="display:none;">' +
	    elem += '<div class="b-close isdBClose isdBCloseCustom"><img src="'+icon_cancel+'"></div>';

	    elem += '<div class="isdOverflow isdHeader isdHeaderCustom" role="headerWrapper">';
	    if(opts && opts.useSearchBarHeader) {
	    	elem += '<div class="isdSearchWrapper">';
            elem += 	'<input type="text" role="searchInput" class="form-control isdSearchInput isdSearchInputCustom" placeholder="'+(opts.placeholder || opts.headerText || "")+'" />';
            elem += 	'<a href="javascript:void(0)" role="searchButton" class="isdSearchButton isdSearchButtonCustom">';
            elem += 		'<img src="'+icon_search+'">';
            elem +=		'</a>';
            elem +=		'<div style="float:right; line-height:40px; display:none;">Total: <span role="totalCount">0</span></div>';
        	elem += '</div>';
	    } 
	    elem += '</div>';
	    
	    elem += '<div role="contentView" class="isdContentView isdContentViewCustom">';
	    elem += '</div>';
	    if(useFunctionBar) {
		elem += '<div id="infiniteScrollingDialogFunctionBar" class="isdFunctionBar isdFunctionBarCustom">';
			if(opts && opts.showCancelButton) {
		    	elem += '<input id="infiniteScrollingDialogCloseButton" type="button" class="btn isdFunctionBarCloseButton isdFunctionBarCloseButtonCustom" value="'+ cancelName +'">';
			}
	    elem += 		'<input id="infiniteScrollingDialogOkButton" type="button" class="btn isdFunctionBarOkButton isdFunctionBarOkButtonCustom" value="' + okName + '">';
	    elem += '</div>';
		}

	    elem += '<div class="isdSpinner" style="margin-top:8px; display:none;">';
		elem += 	'<div class="rect1" style="margin:1.5px; background-color:' + spinnerColor + ';"></div>';
		elem += 	'<div class="rect2" style="margin:1.5px; background-color:' + spinnerColor + ';"></div>';
		elem += 	'<div class="rect3" style="margin:1.5px; background-color:' + spinnerColor + ';"></div>';
		elem += 	'<div class="rect4" style="margin:1.5px; background-color:' + spinnerColor + ';"></div>';
		elem += 	'<div class="rect5" style="margin:1.5px; background-color:' + spinnerColor + ';"></div>';
		elem += '</div>';
		// elem += '</div>'
		return elem;
	}

	var icon_cancel = opts.cancelButtonIconUrl || "img/isd_cancel_D94025.png";
	var icon_search = opts.searchButtonIconUrl || "img/isd_search.png";

	var win_w = $(window).width();
	if(win_w < 2640) {
		var xy = opts.popupPosition || [0, 0];
	} else {
		var xy = opts.popupPosition || [10, 15];
	}
	var w = $(window).width() - xy[0]*2; // for bPopup
	var h = $(window).height() - xy[1]*2; // for bPopup

	var maxWidth = opts.maxWidth || w;
	var $this = this;

	
	$this.empty().append(getHtml(opts.cancelButton, opts.okButton)).attr({
		"p":"0", "data-p":"0", "style":"display:none;"
	});

	var $dialog = this;
	//var $headerView = $(".headerView", this);
	var $headerWrapper = $("[role=headerWrapper]", this);
	var $contentView = $("[role=contentView]", this);

	var $functionBar = $("#infiniteScrollingDialogFunctionBar", this);
	var $loadingAtBottom = $(".isdSpinner", this);

	
	$this.getHeader = function() {
		return $headerWrapper;
	};
	$this.getContentView = function() {
		return $contentView;
	};
	$this.getFunctionBar = function() {
		return $functionBar;
	};

	$this.enableFunctionButtons = function(isEnable) {
		if(isEnable) {
			$("input[type=button]", $functionBar).removeAttr('disabled');
		} else {
			$("input[type=button]", $functionBar).attr('disabled', 'disabled');
		}
	}
	$this.getSearchInput = function() {
		return $("[role=searchInput]", this);
	};
	$this.getSearchButton = function() {
		return $("[role=searchButton]", this);
	};
	$this.setTotalCount = function(val) {
		$("[role=totalCount]", this).text(parseInt(val)).show();
	}

	$this.clearContent = function() {
		if($contentView) {
			$contentView.empty();
		}
	};
	$this.closeDialog = function() { // cannot use name: 'close'
		if($dialog) {
			$dialog.bPopup().close();
		}
	};
	$this.showLoading = function(isLoading) {
		if(useFunctionBar) {
			if(isLoading) {
				$functionBar.hide();
				$loadingAtBottom.show();
			} else {
				$loadingAtBottom.hide();
				$functionBar.show();
			}
		} else {
			$functionBar.hide();
			if(isLoading) {
				$loadingAtBottom.show();
			} else {
				$loadingAtBottom.hide();
			}
		}
	};
	$this.load = function($contentView) {
		if(opts.onLoad) {
			opts.onLoad($contentView);
		} else {
			console.log("[infinite-scrolling-dialog] onLoad() is not defined!");
		}
	};

	$this.popup = function() {
		$dialog.css({
			//"border": "2px solid #5E92BF",
	    	//"border-radius": "10px",
	    	"box-shadow": "0 8px 16px 0 rgba(0,0,0,0.9),0 6px 20px 0 rgba(0,0,0,0.19)",

			"background-color": opts.backgroundColor || "#ffffff",
			"max-width": maxWidth+"px",
			"width": w+"px",
			"height": h+"px"
		});
		$dialog.bPopup({
			// closeClass: "b-close",
			// modalClose: false,
			//opacity: 0.2,
			position: xy,
			onOpen: function() {
				$("body").addClass("isd-stop-scrolling");

				if(opts && opts.headerView) {
					//console.log("[infinite-scrolling-dialog] Use custom header view.");
					$headerWrapper.empty().append(opts.headerView);
				} else if(opts && opts.useSearchBarHeader) {
					//console.log("[infinite-scrolling-dialog] Use search bar header.");
				} else if(opts && opts.headerText) {
					//console.log("[infinite-scrolling-dialog] Use header text.");
					$headerWrapper.text(opts.headerText);
				}

				$contentView.css({
					"height": (h-(useFunctionBar?84:0))+"px"
				});

				if(opts.onOpen) {
					opts.onOpen($contentView);
				}
				if(opts.onLoad) {
					opts.onLoad($contentView);
				}

				$("#infiniteScrollingDialogCloseButton").off('click').click(function() {
					if(opts.onClose) {
						opts.onClose();
					}
					$dialog.closeDialog();
				});
				$("#infiniteScrollingDialogOkButton").off('click').click(function() {
					console.log("[infinite-scrolling-dialog] press [ok] ...");
					if(opts.onOK) {
						opts.onOK();
					} else {
						$dialog.closeDialog();
					}
				});
				$contentView.off('scroll').scroll(function(evt) {
        			evt.stopPropagation(); // avoid pass to window
					evt.preventDefault();

					var $view = $(this);
					if(isDownScrollToElementBottom($view)) {
						if(opts.onScrollToBottom) {
							opts.onScrollToBottom($view, evt);
						}
						if(opts.onLoad) {
							opts.onLoad($contentView);
						}
					}
				});
				$this.getSearchButton().off('click').click(function() {
					if(opts.onSearch) {
						var keyword = $this.getSearchInput().val();
						opts.onSearch(keyword);
					}
				});
			},
			onClose: function() { 
				// re-close bPopup results in blink
				if(opts.onClose) {
					opts.onClose();
				}

				$("body").removeClass("isd-stop-scrolling");
			}
		});
	};

	return $this;
}
## infinite_scrolling_dialog

Description:
Popup a infinite-scrolling-dialog.

Dependency:
* jQuery 1.10+
* bPopup: <a href="http://dinbror.dk/bpopup/">http://dinbror.dk/bpopup/</a>

Demo:
<a href="https://cdn.rawgit.com/welson327/infinite_scrolling_dialog/678dedba/demo.html">https://cdn.rawgit.com/welson327/infinite_scrolling_dialog/678dedba/demo.html</a>

## Dialog Life Cycle
    onOpen() -> onLoad() -> onScrollToBottom() if scrollbar at bottom -> onLoad()

## Sample Code:
### Usage:
    CSS:
    <link rel="stylesheet" href="css/infinite_scrolling_dialog.css">
    
    HTML:
    <div id="dialog"></div>
    
    JS:
    <script type="text/javascript" src="js/plugins/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="js/plugins/jquery.bpopup.min.js"></script>
    <script type="text/javascript" src="js/infinite_scrolling_dialog.0.0.1.js"></script>

### Javascript:

    var $dialog = $("#dialog").infiniteScrollingDialog({
      // required
      onOpen: function($contentView) {
        // Reset your data range
        from = 0;
        returnSize = 0;
      },
      onLoad: function($contentView) {
        $contentView.append(...);
      },
      
      // optional
      onScrollToBottom: function($contentView) {
        // do something before onLoad()
      },
      maxWidth: 420,            // In pixels. Default: full screen width.
      popupPosition: [0, 0],    // From point of left-top. Default: [0, 0].
      useFunctionBar: true,     // Default: true.
      showCancelButton: false,  // Default: false.
      headerText: "Infinite Scrolling Dialog Popup",    // Default: "".
      useSearchBarHeader: false,                        // prior than [headerText] // Default: false.
      headerView: "<span>Custom Header View </span>",   // prior than [useSearchBarHeader]
      placeholder: "placeholder text for search input",
      okButton: { name: "OK" },
      cancelButton: { name: "Cancel" },
      spinnerColor: "#374962",
      cancelButtonIconUrl: "img/isd_cancel_D94025.png",
      searchButtonIconUrl: "img/isd_search.png",
      transition: 'none', 'slideIn', 'slideBack', 'slideDown', 'slideUp'
      speed: 500,
      opacity: 0.7
    });
    
    $dialog.popup();

## Methods
#### $dialog.popup()
    Show dialog.

#### $dialog.getHeader():
    Return the dialog header div.
    
#### $dialog.getContentView():
    Return the dialog content(body) div.
    
#### $dialog.getFunctionBar():
    Return the bottom function bar div.
    
#### $dialog.enableFunctionButtons(boolean isEnable)
    Enable/disable buttons in funtion bar.

#### $dialog.getSearchInput()
    To get keyword for searching, you can
    var text = $dialog.getSearchInput().val();

#### $dialog.getSearchButton()
    $dialog.getSearchButton().click(function() {
        // do search 
    });

#### $dialog.setTotalCount(int value)
    Set the total numbers after searching
    
#### $dialog.clearContent()
    Clear the content view

#### $dialog.closeDialog()
    Close dialog.

#### $dialog.showLoading(boolean isShow)
    Show the loading spinner in the function button bar
    
#### $dialog.load()
    Call onLoad() programmatically

## Custom Style
You can impl. following css to define your style: ('isd' = infinite scrolling dialog) 
* .isdBCloseCustom for close button
* .isdSearchInputCustom for search input to get text
* .isdSearchButtonCustom for search bottom to click
* .isdContentViewCustom for content view of dialog
* .isdFunctionBarCustom, .isdFunctionBarCloseButtonCustom, .isdFunctionBarOkButtonCustom for function bar/buttons
It will override default css style.

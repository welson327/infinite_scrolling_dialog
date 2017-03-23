## infinite_scrolling_dialog

Description:
Popup a infinite-scrolling-dialog.

Dependency:
* jQuery 1.10+
* bPopup: <a href="http://dinbror.dk/bpopup/">http://dinbror.dk/bpopup/</a>

Demo:
TBD

## Dialog Life Cycle
    onOpen() -> onLoad() -> onScrollToBottom() if scrollbar at bottom -> onLoad()

## Sample Code:
### HTML:
    <link rel="stylesheet" href="css/infinite_scrolling_dialog.css">
    <div id="dialog"></div>

### Javascript:

    var $dialog = $("#dialog").infiniteScrollingDialog({
      // required
      cancelButtonIconUrl: "img/isd_cancel_D94025.png",
      searchButtonIconUrl: "img/isd_search.png",
      
      // should be impl.
      onOpen: function($contentView) {
        // reset your data, such as range
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
      maxWidth: 420, // in pixels
      startPosition: [0, 0], // from point of left-top
      showCancelButton: false,
      headerText: "Infinite Scrolling Dialog Popup",
      useSearchBarHeader: false, // // prior than [headerText]
      headerView: "<span>Custom Header View </span>", // prior than [useSearchBarHeader]
      okButton: { name: "OK" },
      cancelButton: { name: "Cancel" },
    });
    
    $dialog.popup();

## Methods
#### $dialog.popup()
    Show dialog.
    
#### $dialog.getContentView():
    Return the div inside <div id="dialog"></div>.
    
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
    
#### $dialog.load($contentView)
    Call onLoad() programmatically




$(function () {
  'use strict';

  function myCustomFilterFunction(filterVal, columnVal) {
    var found;
    if (columnVal === '') {
      return true;
    }
    switch (filterVal) {
      case 'happy':
        found = columnVal.search(/:-\]|:\)|Happy|JOY|:D/g);
        break;
      case 'sad':
        found = columnVal.search(/:\(|Sad|:'\(/g);
        break;
      case 'angry':
        found = columnVal.search(/!!!|Arr\.\.\./g);
        break;
      case 'lucky':
        found = columnVal.search(/777|Bingo/g);
        break;
      case 'january':
        found = columnVal.search(/01|Jan/g);
        break;
      default:
        found = 1;
        break;
    }

    if (found !== -1) {
      return true;
    }
    return false;
  }

  let oTableDOM = $('#example').DataTable({
    stateSave: true
  });

  yadcf.init(oTableDOM, [{
    column_number: 0,
    filter_type: 'custom_func',
    custom_func: myCustomFilterFunction,
    data: [{
      value: 'happy',
      label: 'Happy'
    }, {
      value: 'sad',
      label: 'Sad'
    }, {
      value: 'angry',
      label: 'Angry'
    }, {
      value: 'lucky',
      label: 'Lucky'
    }, {
      value: 'january',
      label: 'January'
    }],
    filter_default_label: "Custom func filter"
  }, {
    column_number: 1,
    filter_type: "range_number_slider"
  }, {
    column_number: 2,
    filter_container_id: "external_filter_container"
  }, {
    column_number: 3,
    filter_type: "auto_complete",
    text_data_delimiter: ","
  }, {
    column_number: 4,
    column_data_type: "html",
    html_data_type: "text",
    filter_default_label: "Select tag"
  }]);

  //------------------------------------------------------
  //------------------------------------------------------

  let ajax_sourceTable = new DataTable('#ajax_table', {
    ajax: "public/ajax_table_source.txt"
  });

  yadcf.init(ajax_sourceTable, [{
    column_number: 0
  }, {
    column_number: 1,
  }, {
    column_number: 2,
  }, {
    column_number: 3,
    filter_type: "range_number"
  }, {
    column_number: 4,
  }, {
    column_number: 5,
    filter_type: "range_number_slider",
    ignore_char: "\\,|\\$"
  }], 'footer');

  //------------------------------------------------------
  //------------------------------------------------------

  let ajax_sourceObjectsTable = $('#ajax_deep_table').DataTable({
    stateSave: true,
    responsive: true,
    ajax: "public/ajax_table_objects_source.txt",
    columns: [{
      "data": "engine"
    }, {
      "data": "browser"
    }, {
      "data": "platform.inner"
    }, {
      "data": "platform.details.0"
    }, {
      "data": "platform.details.1"
    }]
  });

  yadcf.init(ajax_sourceObjectsTable, [{
    column_number: 0
  }, {
    column_number: 1,
    filter_type: "text",
    exclude: true,
    exclude_label: '!(not)'
  }, {
    column_number: 2,
    filter_type: "auto_complete"
  }, {
    column_number: 3,
    filter_type: "range_number",
    ignore_char: "-"
  }, {
    column_number: 4
  }]);

});


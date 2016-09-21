function formatter(){

  // TODO: make formats configurable

  function isNumber(field){
    // http://stackoverflow.com/a/1830844/854308
    return !isNaN(parseFloat(field)) && isFinite(field);
  }

  function formatNumber(value, number_format){
    if(!isNumber(value)) return null;

    var NUMBER_FORMAT = number_format || '0[,]000[.]00';
    // load a language
    numeral.language('pt-mz', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: 'k',
        million:  'm',
        billion:  'b',
        trillion: 't'
      },
      ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
      },
      currency: {
        symbol: 'MZN'
      }
    });
    numeral.language('pt-mz');
    return numeral(value).format(NUMBER_FORMAT);
  }

  function unformatNumber(value){
    // TODO: review
    if (value && value.indexOf('.') !== -1) return null;
    var val = $.trim(value.replace('\,', '\.'));
    if (isNumber(val)){
      return +val;
    }
    return null;
  }

  function formatDate(value){
    var FORMAT_DATE = 'DD/MM/YYYY';
    // moment(undefined) returns current day, ouch!
    if(moment(value).isValid() && value != undefined){
      return moment(value).format(FORMAT_DATE);
    }
    return null;
  }

  function unformatDate(value){
    var FORMAT_ISO = 'YYYY-MM-DD';
    var FORMAT_DATE = 'DD/MM/YYYY';
    // TODO: use FORMAT_DATE to validate this
    if((value != undefined) && (value.split('/').length === 3) && value.split('/')[2].length === 4){
      return new Date(moment(value, FORMAT_DATE).format(FORMAT_ISO));
    }
    return null;
  }

  function formatBoolean(value){
    // TODO let user inject their own formatter
    // to cover use cases like this
    if(value) return "Existe";
    else if (value === false) return "Não existe";
    return "";
  }

  var formatterObj = new Object();
  formatterObj.formatNumber   = formatNumber;
  formatterObj.unformatNumber = unformatNumber;
  formatterObj.formatDate     = formatDate;
  formatterObj.unformatDate   = unformatDate;
  formatterObj.formatBoolean  = formatBoolean;
  return formatterObj;

}

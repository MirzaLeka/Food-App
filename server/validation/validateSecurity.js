
module.exports.stripHtmlTags = props => {

  Object.keys(props)
    .forEach( key => { 
      props[key] = props[key].replace(/(<([^>]+)>)/ig,'');
    });

  return props;
};

// export talks
module.exports = function ( fs ) {
  
  var talklist = [];
  var pathTalks = "server/talksResult/";
  function removeFile( file ){
    try {
      fs.unlinkSync( file );
    } catch ( e ) {}
  }
  this.update = function( item ) {
    talklist = item || JSON.parse(fs.readFileSync('server/talks.txt', 'utf8'));
  };
  
  this.addTalk = function( item ) {
    talklist.push( item );
  };
  
  this.addVote = function( username, talk_id, vote ) {
    var usernameNormalized = escape( username ).replace(/%|-/g, "_");
    var filenamePrefix = pathTalks + [ talk_id, usernameNormalized ].join("-");
    var options = [0,1];
     
    options.forEach(function( e ){
      removeFile( filenamePrefix + '-' + e + '.txt');
    });

    fs.writeFile( filenamePrefix + '-' + vote + '.txt', '');
  };
  
  this.get = function( talk_id ) {
    var talk_return = false;
    if( talk_id ) {
      talklist.forEach(function( i ) {
        if( i.id === talk_id ) {
          talk_return = i;
        }
      });
    } else {
      talk_return = talklist;
    }
    return talk_return;
  };
  this.findAll = function(req, res) {
    res.json( this.get() );
  };   
  this.findById = function(req, res) {
     res.json( this.get( req.params.id ) );
  };

  this.update();

  return this;
};
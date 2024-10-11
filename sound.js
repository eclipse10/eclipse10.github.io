function Sound() {
  var sebankArr=[void 0,"meme","drocelot"];
  
  var itworks=false;
  var lowMode=false;
  var sebankwavelist={
    meme:"bravo,endingstart,erase1,erase2,erase3,erase4,gameover,garbage,lock,tspin0,tspin1,tspin2,tspin3".split(","),
    drocelot:"bravo,endingstart,erase1,erase2,erase3,erase4,gameover,garbage,lock,move,rotate,hold,ready,go,harddrop,tspin0,tspin1,tspin2,tspin3".split(","),
  }
  var repcount = {
    "move": 3,
    "erase1": 4,
    "erase2": 3,
    "erase3": 3,
    "erase4": 3,
    "harddrop": 3,
    "lock": 3,
    "hold": 3,
  }
  var waves={};
  var sebank={};
  var loadwavebank= function(dest,bankname,wavenames){
    console.assert(wavenames !== void 0);
    for(var i=0;i<wavenames.length;i++){
      var iname = wavenames[i];
      var count = lowMode ? 1 :(repcount[iname] || 2);
      dest[iname] = {
        insts: [],
        curidx: 0,
      };
      for(var j=0;j<count;j++){
        var wave = document.createElement("AUDIO");
        wave.src="se/"+bankname+"/"+iname+".mp3";
        wave.load();
        dest[iname].insts.push(wave);
      }
    }
  }
  this.init=function(){
    if(itworks===false){
      try{
        var wave = document.createElement("AUDIO");
        wave.src="se/meme/gameover.mp3";
        wave.load();
        itworks=true;
        if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
          lowMode = true;
        }
      }catch(e){
        alert("sound doesn't work.")
      };
    }
  };
  this.playse=function(name,arg){
    if(itworks && settings.Sound !== 0){
      try{
        if(typeof arg !== "undefined"){
          name+=arg;
        }
        var wavegrp=sebank[name];
        if(typeof wavegrp !== "undefined"){
          var wave=wavegrp.insts[wavegrp.curidx++];
          wavegrp.curidx%=wavegrp.insts.length;
          if(wave.tetrjsok || wave.readyState >= 4){
            if(wave.fastSeek && !lowMode){
              wave.fastSeek(0);
            }else{
              wave.currentTime=0;
            }
            wave.volume=settings.Volume/100;
            wave.play();
            wave.tetrjsok=true; // firefox.... ended.. readystate...
          }
        }
      }
      catch(e){
        console.error("sound error: "+e.toString());
      }
    }
  }
  this.setsebank=function(bankid){
    if(itworks){
      try{
        var bankname=sebankArr[bankid];
        if(bankname !== void 0){
          if(waves[bankname] === void 0){
            sebank={};
            waves[bankname]=sebank;
            loadwavebank(sebank,bankname,sebankwavelist[bankname]);
            if(bankname==="meme"){
              sebank["harddrop"]=sebank["lock"];
            }
          }
          sebank=waves[bankname];
        }else{
          sebank={};
        }
      }catch(e){
        alert("sound error: "+e.toString());
      };
    }
  }
}

var sound = new Sound();